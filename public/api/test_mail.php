<?php
/**
 * GRAFIT CAFÉ — SCRIPT DE DIAGNÓSTICO SEGURO DE CONECTIVIDAD SMTP
 * 
 * Permite validar paso a paso la cadena de transporte hacia grafitcafe@gmail.com:
 * 1. Detección y lectura de grafit_config.php fuera del Document Root.
 * 2. Conexión SSL/TLS al puerto 465 de mail.grafitcafe.com.
 * 3. Negociación EHLO y autenticación AUTH LOGIN.
 * 4. Prueba real de entrega SMTP RFC 5322 con Message-ID hacia grafitcafe@gmail.com.
 * 
 * Acceso protegido mediante clave secreta: ?key=grafit_test_2026
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

$authKey = $_GET['key'] ?? '';
if ($authKey !== 'grafit_test_2026') {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'message' => 'Acceso denegado. Se requiere clave de autorización (?key=...).'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

require_once __DIR__ . '/load_config.php';
$config = grafit_load_config();

$diagnostics = [];
$diagnostics['timestamp'] = date('c');
$diagnostics['php_version'] = PHP_VERSION;
$diagnostics['config_loaded'] = !empty($config);

if (empty($config)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo cargar grafit_config.php desde ninguna ubicación privada.',
        'diagnostics' => $diagnostics
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$smtpHost = $config['smtp_host'] ?? 'mail.grafitcafe.com';
$smtpPort = (int)($config['smtp_port'] ?? 465);
$smtpUser = $config['smtp_user'] ?? 'grafitcafe@grafitcafe.com';
$smtpPass = $config['smtp_password'] ?? '';
$smtpSecure = strtolower((string)($config['smtp_secure'] ?? ($smtpPort === 465 ? 'ssl' : 'tls')));
$targetEmail = 'grafitcafe@gmail.com';
$mailFrom = $config['mail_from'] ?? 'grafitcafe@grafitcafe.com';

$diagnostics['smtp_host'] = $smtpHost;
$diagnostics['smtp_port'] = $smtpPort;
$diagnostics['smtp_user'] = $smtpUser;
$diagnostics['smtp_secure'] = $smtpSecure;
$diagnostics['has_password'] = !empty($smtpPass) && $smtpPass !== 'AQUI_TU_CONTRASENA_SMTP';
$diagnostics['mail_to_configured_in_file'] = $config['mail_to'] ?? '(no definido en grafit_config.php)';
$diagnostics['target_recipient'] = $targetEmail;

if (!$diagnostics['has_password']) {
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'message' => 'Contraseña SMTP no configurada en grafit_config.php.',
        'diagnostics' => $diagnostics
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$isSsl = ($smtpSecure === 'ssl' || $smtpPort === 465);
$remote = ($isSsl ? 'ssl://' : 'tcp://') . $smtpHost . ':' . $smtpPort;

$context = stream_context_create([
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'peer_name' => $smtpHost,
        'allow_self_signed' => false,
        'SNI_enabled' => true,
    ]
]);

$start = microtime(true);
$socket = @stream_socket_client($remote, $errno, $errstr, 12, STREAM_CLIENT_CONNECT, $context);

if (!$socket) {
    http_response_code(502);
    $diagnostics['connection_error'] = "Error ({$errno}): {$errstr}";
    echo json_encode([
        'success' => false,
        'message' => 'Fallo al conectar con el servidor SMTP.',
        'diagnostics' => $diagnostics
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$steps = [];
$readResponse = function ($sock, $expectedCode) use (&$steps) {
    $data = '';
    while ($line = fgets($sock, 515)) {
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') break;
    }
    $code = (int)substr($data, 0, 3);
    $steps[] = ['received' => trim($data), 'code' => $code, 'expected' => $expectedCode];
    return ['code' => $code, 'text' => $data, 'ok' => ($code === $expectedCode)];
};

$sendCommand = function ($sock, $command, $expectedCode, $isSensitive = false) use ($readResponse, &$steps) {
    $steps[] = ['sent' => $isSensitive ? '***[OCULTO POR SEGURIDAD]***' : $command];
    fwrite($sock, $command . "\r\n");
    return $readResponse($sock, $expectedCode);
};

// 1. Saludo inicial
$banner = $readResponse($socket, 220);
if (!$banner['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'Banner inicial no válido', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. EHLO
$ehlo = $sendCommand($socket, "EHLO grafitcafe.com", 250);
if (!$ehlo['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'EHLO falló', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// 3. AUTH LOGIN
$auth = $sendCommand($socket, "AUTH LOGIN", 334);
if (!$auth['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'AUTH LOGIN rechazado', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

$userRes = $sendCommand($socket, base64_encode($smtpUser), 334);
if (!$userRes['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'Usuario SMTP rechazado', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

$passRes = $sendCommand($socket, base64_encode($smtpPass), 235, true);
if (!$passRes['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'Contraseña SMTP incorrecta', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. MAIL FROM
$fromRes = $sendCommand($socket, "MAIL FROM:<{$mailFrom}>", 250);
if (!$fromRes['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'MAIL FROM rechazado', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. RCPT TO
$toRes = $sendCommand($socket, "RCPT TO:<{$targetEmail}>", 250);
if (!$toRes['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => "RCPT TO <{$targetEmail}> rechazado", 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// 6. DATA
$dataRes = $sendCommand($socket, "DATA", 354);
if (!$dataRes['ok']) {
    fclose($socket);
    echo json_encode(['success' => false, 'error' => 'DATA rechazado', 'steps' => $steps], JSON_UNESCAPED_UNICODE);
    exit;
}

// Generar Message-ID estricto RFC 5322
$messageId = sprintf('<diag.%s.%d@grafitcafe.com>', bin2hex(random_bytes(8)), time());
$subject = "Prueba de Diagnóstico SMTP Grafit Café (" . date('d/m/Y H:i:s') . ")";

$body = "========================================================\r\n";
$body .= "PRUEBA DE DIAGNÓSTICO TÉCNICO DE CORREO WEB GRAFIT CAFÉ\r\n";
$body .= "========================================================\r\n\r\n";
$body .= "Este es un mensaje de prueba generado directamente por el script de diagnóstico.\r\n";
$body .= "Confirma que el servidor de correo Postfix en MásBytes ha aceptado el mensaje\r\n";
$body .= "y lo ha transmitido satisfactoriamente a Google Workspace / Gmail.\r\n\r\n";
$body .= "DETALLES DE LA TRANSMISIÓN:\r\n";
$body .= "• Servidor SMTP: {$smtpHost}:{$smtpPort} ({$smtpSecure})\r\n";
$body .= "• Remitente (FROM): {$mailFrom}\r\n";
$body .= "• Destinatario (TO): {$targetEmail}\r\n";
$body .= "• Message-ID: {$messageId}\r\n";
$body .= "• Fecha RFC 2822: " . date('r') . "\r\n\r\n";
$body .= "Si este correo ha llegado a la bandeja de Spam, por favor márcalo como 'No es spam'.\r\n";

$headers = "From: =?UTF-8?B?" . base64_encode("Diagnóstico Web Grafit") . "?= <{$mailFrom}>\r\n";
$headers .= "To: <{$targetEmail}>\r\n";
$headers .= "Reply-To: <{$mailFrom}>\r\n";
$headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
$headers .= "Date: " . date('r') . "\r\n";
$headers .= "Message-ID: {$messageId}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8; format=flowed\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "Auto-Submitted: auto-generated\r\n";
$headers .= "X-Mailer: GrafitCafe/Diagnostic-PHP-8.3\r\n";

$payload = $headers . "\r\n" . $body . "\r\n.\r\n";
fwrite($socket, $payload);

$final = $readResponse($socket, 250);
$sendCommand($socket, "QUIT", 221);
fclose($socket);

$elapsed = round(microtime(true) - $start, 3);
$diagnostics['elapsed_seconds'] = $elapsed;
$diagnostics['message_id'] = $messageId;
$diagnostics['smtp_queue_response'] = trim($final['text'] ?? '');

echo json_encode([
    'success' => $final['ok'],
    'message' => $final['ok']
        ? '¡Mensaje de prueba aceptado correctamente por el servidor SMTP y encolado para entrega a ' . $targetEmail . '!'
        : 'El servidor SMTP no aceptó el cuerpo del mensaje.',
    'diagnostics' => $diagnostics,
    'protocol_steps' => $steps
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
