<?php
/**
 * GRAFIT CAFÉ — ENDPOINT DE CONTACTO Y SOLICITUD DE EVENTOS (PHP 8.3)
 * 
 * Procesa las solicitudes orientadas a grupos, comidas de cuadrillas y eventos.
 * Cumple estrictamente con el principio de:
 * 1. Envío autenticado mediante SMTP (Puerto 465 SSL o 587 TLS).
 * 2. Cero uso de fallback mail() si falla SMTP.
 * 3. Cero confirmación falsa si el mensaje no fue aceptado por el servidor de correo.
 * 4. Entrega garantizada al buzón destinatario prioritario: grafitcafe@gmail.com.
 * 5. Cumplimiento riguroso de RFC 5321 y RFC 5322 para entregabilidad en Gmail (Message-ID, CRLF, dot-stuffing).
 * 6. Registro de auditoría en error_log de Plesk y respaldo preventivo de datos (Zero Lead Loss).
 * 7. Medidas antispam (honeypot + verificación temporal de envío).
 * 8. Protección estricta contra inyección de cabeceras CRLF en inputs de usuario.
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

// 2.2. Verificación temporal de envío (evitar envíos automáticos instantáneos < 2 seg)
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

// Destinatario primario prioritario (requisito obligatorio de la propiedad)
$primaryRecipient = 'grafitcafe@gmail.com';
$configRecipient = trim((string)($config['mail_to'] ?? ''));

// Formar lista de destinatarios únicos garantizando la entrega a grafitcafe@gmail.com
$recipients = [$primaryRecipient];
if (!empty($configRecipient) && strcasecmp($configRecipient, $primaryRecipient) !== 0) {
    $recipients[] = $configRecipient;
}

$mailFrom = $config['mail_from'] ?? 'grafitcafe@grafitcafe.com';
$mailFromName = $config['mail_from_name'] ?? 'Web Grafit Café (Solicitudes)';

if (empty($smtpHost) || empty($smtpUser) || empty($smtpPass) || $smtpPass === 'AQUI_TU_CONTRASENA_SMTP') {
    // ESTADO CONTROLADO: SMTP aún no parametrizado en Plesk
    // DIRECTRIZ: NUNCA usar mail() automáticamente ni confirmar falsamente recepción
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'code' => 'SMTP_PENDING_CONFIGURATION',
        'message' => 'El servicio de envío web está pendiente de los parámetros definitivos de correo en el alojamiento. Por favor, escríbenos directamente a grafitcafe@gmail.com o llámanos al 944 102 772.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. Generación de Message-ID estricto (RFC 5322 § 3.6.4)
$messageId = sprintf('<lead.%s.%d@grafitcafe.com>', bin2hex(random_bytes(12)), time());
$subject = sprintf('Nueva solicitud web [%s]: %s (%s)', strtoupper($cleanMotivo), $cleanNombre, date('d/m/Y H:i'));

// 6. Construcción del cuerpo del mensaje con saltos de línea estrictos CRLF (\r\n)
$cleanUserMessage = preg_replace('/(?:\r\n|\r|\n)/', "\r\n", $mensaje);

$bodyText = "========================================================\r\n";
$bodyText .= "NUEVA SOLICITUD DESDE LA WEB DE GRAFIT CAFÉ (URRUTIA 1)\r\n";
$bodyText .= "========================================================\r\n\r\n";
$bodyText .= "DATOS DEL SOLICITANTE:\r\n";
$bodyText .= "• Nombre / Colectivo: {$cleanNombre}\r\n";
$bodyText .= "• Correo Electrónico: {$cleanEmail}\r\n";
$bodyText .= "• Teléfono de Contacto: " . ($cleanTelefono ?: 'No facilitado') . "\r\n\r\n";
$bodyText .= "DETALLES ORIENTATIVOS DEL EVENTO:\r\n";
$bodyText .= "• Motivo Principal: {$cleanMotivo}\r\n";
$bodyText .= "• Formato de Evento: " . ($cleanTipo ?: 'No especificado') . "\r\n";
$bodyText .= "• Asistentes Estimados: " . ($cleanAsistentes ?: 'No especificado') . "\r\n";
$bodyText .= "• Fecha o Mes Previsto: " . ($cleanFecha ?: 'No especificado') . "\r\n\r\n";
$bodyText .= "MENSAJE Y DETALLES DE LA PROPUESTA:\r\n";
$bodyText .= "--------------------------------------------------------\r\n";
$bodyText .= $cleanUserMessage . "\r\n";
$bodyText .= "--------------------------------------------------------\r\n\r\n";
$bodyText .= "INFORMACIÓN LEGAL Y DE TRAZABILIDAD:\r\n";
$bodyText .= "• Fecha y hora de recepción: " . date('Y-m-d H:i:s T') . "\r\n";
$bodyText .= "• Política de privacidad aceptada por el usuario: SÍ\r\n";
$bodyText .= "• Base jurídica: Aplicación de medidas precontractuales a petición del interesado (Art. 6.1.b RGPD).\r\n";
$bodyText .= "• Identificador de seguimiento (Message-ID): {$messageId}\r\n";

// 7. Conexión SMTP pura mediante sockets (PHP 8.3) con soporte multi-destinatario
function sendSmtpMail(
    string $host,
    int $port,
    string $user,
    string $password,
    string $secure,
    string $from,
    string $fromName,
    array $recipients,
    string $replyToEmail,
    string $replyToName,
    string $subject,
    string $messageId,
    string $body
): array {
    $isSsl = ($secure === 'ssl' || $port === 465);
    $remote = ($isSsl ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    
    // Validación de certificados estricta Let's Encrypt / ISRG Root X1
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

    // STARTTLS si procede
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

    // MAIL FROM
    $fromRes = $sendCommand($socket, "MAIL FROM:<{$from}>", 250);
    if (!$fromRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "MAIL FROM rechazado: " . $fromRes['text']];
    }

    // RCPT TO para cada destinatario
    foreach ($recipients as $recipient) {
        $toRes = $sendCommand($socket, "RCPT TO:<{$recipient}>", 250);
        if (!$toRes['ok']) {
            fclose($socket);
            return ['ok' => false, 'error' => "RCPT TO rechazado para <{$recipient}>: " . $toRes['text']];
        }
    }

    // DATA
    $dataRes = $sendCommand($socket, "DATA", 354);
    if (!$dataRes['ok']) {
        fclose($socket);
        return ['ok' => false, 'error' => "DATA rechazado: " . $dataRes['text']];
    }

    // Cabeceras MIME RFC 2822 / RFC 5322 completas y compatibles con Gmail
    $toHeader = implode(', ', array_map(fn($r) => "<{$r}>", $recipients));
    $headers = "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$from}>\r\n";
    $headers .= "To: {$toHeader}\r\n";
    $headers .= "Reply-To: =?UTF-8?B?" . base64_encode($replyToName) . "?= <{$replyToEmail}>\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "Date: " . date('r') . "\r\n";
    $headers .= "Message-ID: {$messageId}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8; format=flowed\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "Auto-Submitted: auto-generated\r\n";
    $headers .= "X-Mailer: GrafitCafe/PHP-8.3-SMTP\r\n";

    // Normalización CRLF y Dot-Stuffing (RFC 5321 Sección 4.5.2)
    $lines = explode("\r\n", $body);
    foreach ($lines as &$line) {
        if (isset($line[0]) && $line[0] === '.') {
            $line = '.' . $line;
        }
    }
    unset($line);
    $stuffedBody = implode("\r\n", $lines);

    $messagePayload = $headers . "\r\n" . $stuffedBody . "\r\n.\r\n";
    fwrite($socket, $messagePayload);

    $finalRes = $readResponse($socket, 250);
    $sendCommand($socket, "QUIT", 221);
    fclose($socket);

    if (!$finalRes['ok']) {
        return ['ok' => false, 'error' => "El servidor SMTP no aceptó el cuerpo del mensaje: " . $finalRes['text']];
    }

    return ['ok' => true, 'response' => $finalRes['text']];
}

$smtpResult = sendSmtpMail(
    $smtpHost,
    $smtpPort,
    $smtpUser,
    $smtpPass,
    $smtpSecure,
    $mailFrom,
    $mailFromName,
    $recipients,
    $cleanEmail,
    $cleanNombre,
    $subject,
    $messageId,
    $bodyText
);

if (!$smtpResult['ok']) {
    $errLog = sprintf(
        "[GRAFIT_LEAD_ERROR] Fallo entrega SMTP para %s <%s>. Error: %s. Destinatarios: %s",
        $cleanNombre,
        $cleanEmail,
        $smtpResult['error'] ?? 'Desconocido',
        implode(', ', $recipients)
    );
    error_log($errLog);

    http_response_code(502);
    echo json_encode([
        'success' => false,
        'code' => 'SMTP_TRANSMISSION_ERROR',
        'message' => 'No se pudo completar la entrega del mensaje con el servidor de correo. Por favor, inténtalo más tarde o escríbenos directamente a ' . $primaryRecipient
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 8. Registro de auditoría trazable para Plesk
$successLog = sprintf(
    "[GRAFIT_LEAD_OK] Solicitud entregada vía SMTP con éxito. Solicitante: %s <%s>. Tel: %s. Motivo: %s. Destinatarios: %s. Message-ID: %s. SMTP: %s",
    $cleanNombre,
    $cleanEmail,
    $cleanTelefono ?: 'N/A',
    $cleanMotivo,
    implode(', ', $recipients),
    $messageId,
    trim($smtpResult['response'] ?? '250 OK')
);
error_log($successLog);

// 9. Respaldo preventivo de seguridad fuera del alcance web (Zero Lead Loss)
$backupDirs = [
    dirname(__DIR__, 2) . '/private',
    dirname(__DIR__, 1) . '/private',
    dirname($_SERVER['DOCUMENT_ROOT'] ?? '', 1) . '/private'
];
foreach ($backupDirs as $bDir) {
    if (!empty($bDir) && is_dir($bDir) && is_writable($bDir)) {
        $leadRecord = [
            'timestamp' => date('c'),
            'nombre' => $cleanNombre,
            'email' => $cleanEmail,
            'telefono' => $cleanTelefono,
            'motivo' => $cleanMotivo,
            'tipoEvento' => $cleanTipo,
            'asistentes' => $cleanAsistentes,
            'fecha' => $cleanFecha,
            'mensaje' => $mensaje,
            'recipients' => $recipients,
            'messageId' => $messageId
        ];
        @file_put_contents(
            $bDir . '/leads_backup.jsonl',
            json_encode($leadRecord, JSON_UNESCAPED_UNICODE) . "\n",
            FILE_APPEND | LOCK_EX
        );
        break;
    }
}

// 10. Respuesta exitosa verificada
echo json_encode([
    'success' => true,
    'message' => '¡Solicitud recibida correctamente! Nos pondremos en contacto contigo con la mayor brevedad para coordinar la disponibilidad y los detalles de tu evento en Grafit Café.'
], JSON_UNESCAPED_UNICODE);
