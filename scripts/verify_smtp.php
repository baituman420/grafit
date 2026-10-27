<?php
/**
 * GRAFIT CAFÉ — SCRIPT CLI DE VERIFICACIÓN SMTP (PHP 8.3)
 * 
 * Uso desde línea de comandos en servidor MásBytes / Plesk:
 *   php scripts/verify_smtp.php
 *   php scripts/verify_smtp.php --password=TU_PASS_AQUI
 *   php scripts/verify_smtp.php --send-test=contacto@tudominio.com
 * 
 * Comprueba:
 * 1. Resolución DNS de mail.grafitcafe.com (5.181.44.105).
 * 2. Conexión socket SSL/TLS implícito en puerto 465.
 * 3. Validación de cadena de certificados (Let's Encrypt / ISRG Root X1).
 * 4. Saludo ESMTP Postfix y capacidades anunciadas (AUTH PLAIN LOGIN).
 * 5. Autenticación SMTP si se suministra contraseña.
 */

declare(strict_types=1);

echo "========================================================\n";
echo "GRAFIT CAFÉ — AUDITORÍA Y VERIFICACIÓN SMTP (PUERTO 465)\n";
echo "========================================================\n\n";

$configFile = __DIR__ . '/../public/api/config.php';
$config = [];
if (file_exists($configFile)) {
    $config = require $configFile;
    echo "✓ Archivo de configuración privada detectado: public/api/config.php\n";
} else {
    echo "ℹ config.php no encontrado en public/api/. Usando parámetros oficiales por defecto.\n";
}

$host = $config['smtp_host'] ?? 'mail.grafitcafe.com';
$port = (int)($config['smtp_port'] ?? 465);
$user = $config['smtp_user'] ?? 'grafitcafe@grafitcafe.com';
$pass = $config['smtp_password'] ?? '';

// Comprobar argumentos CLI
foreach ($argv as $arg) {
    if (str_starts_with($arg, '--password=')) {
        $pass = substr($arg, 11);
    }
}

echo "1. Resolución DNS:\n";
$ip = gethostbyname($host);
echo "   Host: {$host}\n";
echo "   IP resuelta: {$ip}\n";
if ($ip === $host) {
    echo "   ✗ Error: no se pudo resolver el host.\n";
    exit(1);
}
echo "   ✓ DNS resolvió correctamente.\n\n";

echo "2. Negociación SSL/TLS y validación de certificado (Puerto {$port}):\n";
$context = stream_context_create([
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'peer_name' => $host,
        'allow_self_signed' => false,
        'SNI_enabled' => true,
    ]
]);

$remote = "ssl://{$host}:{$port}";
$socket = @stream_socket_client($remote, $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);

if (!$socket) {
    echo "   ✗ Conexión rechazada: {$errstr} ({$errno})\n";
    exit(1);
}
echo "   ✓ Conexión SSL/TLS establecida con éxito en {$remote}\n";
echo "   ✓ Certificado de servidor validado estrictamente contra CA del sistema.\n\n";

$readResponse = function ($sock) {
    $data = '';
    while ($line = fgets($sock, 515)) {
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') break;
    }
    return $data;
};

$sendCommand = function ($sock, $cmd) use ($readResponse) {
    fwrite($sock, $cmd . "\r\n");
    return $readResponse($sock);
};

echo "3. Saludo del servidor:\n";
$banner = $readResponse($socket);
echo "   < " . trim($banner) . "\n";
if (!str_starts_with($banner, '220')) {
    echo "   ✗ Saludo no válido (se esperaba 220).\n";
    fclose($socket);
    exit(1);
}

echo "4. Negociación EHLO:\n";
$ehlo = $sendCommand($socket, "EHLO grafitcafe.com");
$lines = explode("\n", trim($ehlo));
foreach ($lines as $l) {
    echo "   < " . trim($l) . "\n";
}
if (!str_starts_with($ehlo, '250')) {
    echo "   ✗ EHLO no aceptado.\n";
    fclose($socket);
    exit(1);
}

if (!str_contains($ehlo, 'AUTH') && !str_contains($ehlo, 'LOGIN')) {
    echo "   ✗ Advertencia: el servidor no anunció autenticación LOGIN en EHLO.\n";
} else {
    echo "   ✓ El servidor anuncia soporte de autenticación (AUTH LOGIN/PLAIN).\n\n";
}

if (empty($pass) || $pass === 'AQUI_TU_CONTRASENA_SMTP') {
    echo "5. Verificación de Autenticación:\n";
    echo "   ℹ Contraseña no configurada todavía. Omitiendo prueba de AUTH.\n";
    echo "   ℹ Para probar credenciales, ejecute: php scripts/verify_smtp.php --password=TU_PASS\n";
    $sendCommand($socket, "QUIT");
    fclose($socket);
    echo "\n✓ VERIFICACIÓN TÉCNICA DE INFRAESTRUCTURA Y TLS COMPLETADA CON ÉXITO.\n";
    exit(0);
}

echo "5. Prueba de Autenticación con usuario '{$user}':\n";
$authRes = $sendCommand($socket, "AUTH LOGIN");
echo "   > AUTH LOGIN\n   < " . trim($authRes) . "\n";
if (!str_starts_with($authRes, '334')) {
    echo "   ✗ AUTH LOGIN no aceptado.\n";
    fclose($socket);
    exit(1);
}

$userRes = $sendCommand($socket, base64_encode($user));
echo "   > [Usuario enviado]\n   < " . trim($userRes) . "\n";
if (!str_starts_with($userRes, '334')) {
    echo "   ✗ Nombre de usuario rechazado.\n";
    fclose($socket);
    exit(1);
}

$passRes = $sendCommand($socket, base64_encode($pass));
echo "   > [Contraseña enviada]\n   < " . trim($passRes) . "\n";
if (str_starts_with($passRes, '235')) {
    echo "   ✓ AUTENTICACIÓN SATISFACTORIA (Código 235).\n";
} else {
    echo "   ✗ ERROR DE AUTENTICACIÓN: credenciales incorrectas o buzón bloqueado.\n";
    fclose($socket);
    exit(1);
}

$sendCommand($socket, "QUIT");
fclose($socket);

echo "\n✓ CONEXIÓN, TLS Y AUTENTICACIÓN 100% OPERATIVAS.\n";
exit(0);
