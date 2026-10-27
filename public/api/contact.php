<?php
/**
 * GRAFIT CAFÉ — ENDPOINT DE CONTACTO Y SOLICITUD DE EVENTOS (PHP 8.3)
 * 
 * Procesa las solicitudes orientadas a grupos, comidas de cuadrillas y eventos.
 * Cumple estrictamente con el principio de:
 * 1. Envío autenticado mediante SMTP.
 * 2. Cero uso de fallback mail() si falla SMTP.
 * 3. Cero confirmación falsa si el mensaje no fue aceptado por el servidor de correo.
 * 4. Medidas antispam (honeypot + verificación temporal).
 * 5. Protección estricta contra inyección de cabeceras CRLF.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Solo admitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Utilice POST.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Cargar configuración privada situada físicamente fuera del directorio público
require_once __DIR__ . '/load_config.php';
$config = grafit_load_config();

// 1. Obtener y parsear el payload de la solicitud (JSON o form-data)
$rawBody = file_get_contents('php://input');
$data = [];
if (!empty($rawBody)) {
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data)) {
    $data = $_POST;
}

// 2. Medidas Antispam
// 2.1. Honeypot invisible para humanos
if (!empty($data['website_check_trap'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Solicitud rechazada por filtro de seguridad.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2.2. Verificación temporal de envío (evitar envíos instantáneos automáticos < 2 seg)
if (isset($data['form_rendered_at']) && is_numeric($data['form_rendered_at'])) {
    $renderedAt = (int)$data['form_rendered_at'];
    $elapsed = time() - $renderedAt;
    if ($elapsed < 2) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Envío demasiado rápido. Por favor, inténtelo de nuevo.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// 3. Sanitización y validación estricta de campos
$nombre = trim((string)($data['nombre'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$telefono = trim((string)($data['telefono'] ?? ''));
$motivo = trim((string)($data['motivo'] ?? 'evento'));
$tipoEvento = trim((string)($data['tipoEvento'] ?? ''));
$asistentesAproximados = trim((string)($data['asistentesAproximados'] ?? ''));
$fechaAproximada = trim((string)($data['fechaAproximada'] ?? ''));
$mensaje = trim((string)($data['mensaje'] ?? ''));
$consentimiento = !empty($data['consentimiento']);

$errors = [];

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 100) {
    $errors['nombre'] = 'El nombre es obligatorio y debe tener entre 2 y 100 caracteres.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'El correo electrónico no es válido.';
}

if (mb_strlen($mensaje) < 5 || mb_strlen($mensaje) > 3000) {
    $errors['mensaje'] = 'El mensaje es obligatorio y debe tener entre 5 y 3000 caracteres.';
}

if (!$consentimiento) {
    $errors['consentimiento'] = 'Es obligatorio confirmar la lectura de la política de privacidad.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Existen errores en los datos facilitados.',
        'errors' => $errors
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Prevenir inyección de cabeceras CRLF en asunto y nombres
$cleanNombre = str_replace(["\r", "\n"], '', strip_tags($nombre));
$cleanEmail = str_replace(["\r", "\n"], '', $email);
$cleanTelefono = str_replace(["\r", "\n"], '', strip_tags($telefono));
$cleanMotivo = str_replace(["\r", "\n"], '', strip_tags($motivo));
$cleanTipo = str_replace(["\r", "\n"], '', strip_tags($tipoEvento));
$cleanAsistentes = str_replace(["\r", "\n"], '', strip_tags($asistentesAproximados));
$cleanFecha = str_replace(["\r", "\n"], '', strip_tags($fechaAproximada));

// 4. Verificación de configuración SMTP
$smtpHost = $config['smtp_host'] ?? 'mail.grafitcafe.com';
$smtpPort = (int)($config['smtp_port'] ?? 465);
$smtpUser = $config['smtp_user'] ?? 'grafitcafe@grafitcafe.com';
$smtpPass = $config['smtp_password'] ?? '';
$smtpSecure = strtolower((string)($config['smtp_secure'] ?? ($smtpPort === 465 ? 'ssl' : 'tls')));
$mailTo = $config['mail_to'] ?? 'grafitcafe@grafitcafe.com';
$mailFrom = $config['mail_from'] ?? 'grafitcafe@grafitcafe.com';
$mailFromName = $config['mail_from_name'] ?? 'Web Grafit Café';

if (empty($smtpHost) || empty($smtpUser) || empty($smtpPass) || $smtpPass === 'AQUI_TU_CONTRASENA_SMTP') {
    // ESTADO CONTROLADO: SMTP aún no parametrizado en Plesk
    // DIRECTRIZ: NUNCA usar mail() automáticamente ni confirmar falsamente recepción
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'code' => 'SMTP_PENDING_CONFIGURATION',
        'message' => 'El servicio de envío web está pendiente de los parámetros definitivos de correo en el alojamiento. Por favor, escríbenos directamente a grafitcafe@grafitcafe.com o llámanos al 944 102 772.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. Construcción del cuerpo del mensaje
$subject = sprintf('Nueva solicitud web [%s]: %s (%s)', strtoupper($cleanMotivo), $cleanNombre, date('d/m/Y H:i'));

$bodyText = "========================================================\n";
$bodyText .= "NUEVA SOLICITUD DESDE LA WEB DE GRAFIT CAFÉ (URRUTIA 1)\n";
$bodyText .= "========================================================\n\n";
$bodyText .= "DATOS DEL SOLICITANTE:\n";
$bodyText .= "• Nombre / Colectivo: {$cleanNombre}\n";
$bodyText .= "• Correo Electrónico: {$cleanEmail}\n";
$bodyText .= "• Teléfono de Contacto: " . ($cleanTelefono ?: 'No facilitado') . "\n\n";
$bodyText .= "DETALLES ORIENTATIVOS DEL EVENTO:\n";
$bodyText .= "• Motivo Principal: {$cleanMotivo}\n";
$bodyText .= "• Formato de Evento: " . ($cleanTipo ?: 'No especificado') . "\n";
$bodyText .= "• Asistentes Estimados: " . ($cleanAsistentes ?: 'No especificado') . "\n";
$bodyText .= "• Fecha o Mes Previsto: " . ($cleanFecha ?: 'No especificado') . "\n\n";
$bodyText .= "MENSAJE Y DETALLES DE LA PROPUESTA:\n";
$bodyText .= "--------------------------------------------------------\n";
$bodyText .= $mensaje . "\n";
$bodyText .= "--------------------------------------------------------\n\n";
$bodyText .= "INFORMACIÓN LEGAL Y DE TRAZABILIDAD:\n";
$bodyText .= "• Fecha y hora de recepción: " . date('Y-m-d H:i:s T') . "\n";
$bodyText .= "• Política de privacidad aceptada por el usuario: SÍ\n";
$bodyText .= "• Base jurídica: Aplicación de medidas precontractuales a petición del interesado (Art. 6.1.b RGPD).\n";

// 6. Conexión SMTP pura mediante sockets (PHP 8.3)
function sendSmtpMail(
    string $host,
    int $port,
    string $user,
    string $password,
    string $secure,
    string $from,
    string $fromName,
    string $to,
    string $replyTo,
    string $subject,
    string $body
): array {
    $isSsl = ($secure === 'ssl' || $port === 465);
    $remote = ($isSsl ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    
    // Validación de certificados estricta y obligatoria (verificación de peer y de hostname)
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $host,
            'allow_self_signed' => false,
            'SNI_enabled' => true,
        ]
    ]);
    
    $socket = @stream_socket_client($remote, $errno, $errstr, 12, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        return ['ok' => false, 'error' => "Conexión rechazada al servidor SMTP ({$errstr})"];
    }

    $readResponse = function ($sock, $expectedCode) {
        $data = '';
        while ($line = fgets($sock, 515)) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        $code = (int)substr($data, 0, 3);
        return ['code' => $code, 'text' => $data, 'ok' => ($code === $expectedCode)];
    };

    $sendCommand = function ($sock, $command, $expectedCode) use ($readResponse) {
        fwrite($sock, $command . "\r\n");
        return $readResponse($sock, $expectedCode);
    };

    $initial = $readResponse($socket, 220);
    if (!$initial['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "Respuesta inicial no válida: " . $initial['text']];
    }

    $clientDomain = 'grafitcafe.com';
    $ehlo = $sendCommand($socket, "EHLO " . $clientDomain, 250);
    if (!$ehlo['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "EHLO falló: " . $ehlo['text']];
    }

    // STARTTLS solo si procede (cuando la conexión socket no es SSL implícito nativo)
    if (!$isSsl && $secure === 'tls') {
        $tls = $sendCommand($socket, "STARTTLS", 220);
        if (!$tls['ok']) {
            fclose($socket);
            return ['ok' => false, 'error' => "STARTTLS no soportado o rechazado."];
        }
        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            return ['ok' => false, 'error' => "Negociación TLS criptográfica fallida."];
        }
        // Repetir EHLO tras TLS
        $ehloAfterTls = $sendCommand($socket, "EHLO " . $clientDomain, 250);
        if (!$ehloAfterTls['ok']) {
            fclose($socket);
            return ['ok' => false, 'error' => "EHLO post-TLS falló."];
        }
    }

    // Autenticación LOGIN
    $auth = $sendCommand($socket, "AUTH LOGIN", 334);
    if (!$auth['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "AUTH LOGIN no admitido: " . $auth['text']];
    }

    $userRes = $sendCommand($socket, base64_encode($user), 334);
    if (!$userRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "Usuario SMTP rechazado."];
    }

    $passRes = $sendCommand($socket, base64_encode($password), 235);
    if (!$passRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "Contraseña SMTP incorrecta o autenticación rechazada."];
    }

    // Comandos de entrega
    $fromRes = $sendCommand($socket, "MAIL FROM:<{$from}>", 250);
    if (!$fromRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "MAIL FROM rechazado: " . $fromRes['text']];
    }

    $toRes = $sendCommand($socket, "RCPT TO:<{$to}>", 250);
    if (!$toRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "RCPT TO rechazado: " . $toRes['text']];
    }

    $dataRes = $sendCommand($socket, "DATA", 354);
    if (!$dataRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "DATA rechazado: " . $dataRes['text']];
    }

    // Cabeceras MIME RFC 2822
    $headers = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$from}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    $headers .= "Reply-To: <{$replyTo}>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "X-Mailer: GrafitCafe/PHP-8.3-SMTP\r\n";

    $messagePayload = $headers . "\r\n" . $body . "\r\n.\r\n";
    fwrite($socket, $messagePayload);

    $finalRes = $readResponse($socket, 250);
    $sendCommand($socket, "QUIT", 221);
    fclose($socket);

    if (!$finalRes['ok']) {
        return ['ok' => false, 'error' => "El servidor SMTP no aceptó el cuerpo del mensaje: " . $finalRes['text']];
    }

    return ['ok' => true];
}

$smtpResult = sendSmtpMail(
    $smtpHost,
    $smtpPort,
    $smtpUser,
    $smtpPass,
    $smtpSecure,
    $mailFrom,
    $mailFromName,
    $mailTo,
    $cleanEmail,
    $subject,
    $bodyText
);

if (!$smtpResult['ok']) {
    http_response_code(502);
    echo json_encode([
        'success' => false,
        'code' => 'SMTP_TRANSMISSION_ERROR',
        'message' => 'No se pudo completar la entrega del mensaje con el servidor de correo. Por favor, inténtalo más tarde o escríbenos directamente a ' . $mailTo
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 7. Respuesta exitosa verificada
echo json_encode([
    'success' => true,
    'message' => '¡Solicitud recibida correctamente! Nos pondremos en contacto contigo con la mayor brevedad para coordinar la disponibilidad y los detalles de tu evento en Grafit Café.'
], JSON_UNESCAPED_UNICODE);
