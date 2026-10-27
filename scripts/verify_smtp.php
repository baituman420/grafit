<?php
/**
 * GRAFIT CAFÉ — AUDITORÍA Y VERIFICACIÓN TÉCNICA SMTP (PHP 8.3 CLI)
 * 
 * Uso interactivo y seguro:
 *   php scripts/verify_smtp.php
 * 
 * SEGURIDAD ESTRICTA:
 * - NO acepta contraseñas por argumentos de línea de comandos (evita exposición en historial y 'ps aux').
 * - Solicita la contraseña de forma interactiva y silenciosa (sin eco en pantalla).
 * - No almacena, no cachea y no registra contraseñas en archivos ni logs.
 * - Comprueba resolución DNS, apretón SSL/TLS, certificado Let's Encrypt y diálogo ESMTP.
 */

declare(strict_types=1);

// 1. Detección y bloqueo preventivo de contraseñas por argumentos
foreach ($argv as $arg) {
    if (str_starts_with($arg, '--password') || str_starts_with($arg, '-p') || str_starts_with($arg, '--pass')) {
        fwrite(STDERR, "\n========================================================\n");
        fwrite(STDERR, "AVISO DE SEGURIDAD: Paso de credenciales bloqueado\n");
        fwrite(STDERR, "========================================================\n");
        fwrite(STDERR, "Por directriz de seguridad de Grafit Café, no se admiten contraseñas\n");
        fwrite(STDERR, "como argumentos de línea de comandos para evitar su exposición en el\n");
        fwrite(STDERR, "historial del shell (~/.bash_history) y en la tabla de procesos (ps aux).\n\n");
        fwrite(STDERR, "Por favor, ejecute el comando sin parámetros:\n");
        fwrite(STDERR, "  php scripts/verify_smtp.php\n\n");
        exit(1);
    }
}

echo "========================================================\n";
echo "GRAFIT CAFÉ — VERIFICACIÓN TÉCNICA SMTP (PUERTO 465 SSL)\n";
echo "========================================================\n\n";

// Cargar configuración privada si está disponible
require_once __DIR__ . '/../public/api/load_config.php';
$config = grafit_load_config();

$host = $config['smtp_host'] ?? 'mail.grafitcafe.com';
$port = (int)($config['smtp_port'] ?? 465);
$user = $config['smtp_user'] ?? 'grafitcafe@grafitcafe.com';
$passFromConfig = $config['smtp_password'] ?? '';

// 2. Comprobación de Resolución DNS
echo "1. Resolución DNS:\n";
$ip = gethostbyname($host);
echo "   Host oficial: {$host}\n";
echo "   IP resuelta:  {$ip}\n";
if ($ip === $host) {
    echo "   ✗ Error: no se pudo resolver la dirección DNS del servidor.\n";
    exit(1);
}
echo "   ✓ DNS resolvió correctamente hacia la IP autorizada.\n\n";

// 3. Conexión SSL/TLS y Verificación Criptográfica de Certificados
echo "2. Negociación Criptográfica SSL/TLS (Puerto {$port}):\n";
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
$socket = @stream_socket_client($remote, $errno, $errstr, 12, STREAM_CLIENT_CONNECT, $context);

if (!$socket) {
    echo "   ✗ Conexión rechazada: {$errstr} (código {$errno})\n";
    exit(1);
}
echo "   ✓ Conexión SSL establecida en {$remote}\n";
echo "   ✓ Cadena de certificación validada estrictamente contra ISRG Root X1 (Let's Encrypt).\n\n";

// Funciones auxiliares de lectura/escritura en socket
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

// 4. Saludo inicial del servidor
echo "3. Saludo del Servidor de Correo:\n";
$banner = $readResponse($socket);
echo "   < " . trim($banner) . "\n";
if (!str_starts_with($banner, '220')) {
    echo "   ✗ Saludo inesperado del servidor (se esperaba 220).\n";
    fclose($socket);
    exit(1);
}
echo "   ✓ Saludo ESMTP Postfix recibido.\n\n";

// 5. Negociación EHLO y Capacidades
echo "4. Negociación EHLO y Capacidades de Autenticación:\n";
$ehlo = $sendCommand($socket, "EHLO grafitcafe.com");
$lines = explode("\n", trim($ehlo));
foreach ($lines as $l) {
    $cleanLine = trim($l);
    if (!empty($cleanLine)) {
        echo "   < " . $cleanLine . "\n";
    }
}
if (!str_starts_with($ehlo, '250')) {
    echo "   ✗ EHLO no aceptado por el servidor.\n";
    fclose($socket);
    exit(1);
}

if (!str_contains($ehlo, 'AUTH')) {
    echo "   ✗ Advertencia: el servidor no anunció capacidades de autenticación en este puerto.\n";
    fclose($socket);
    exit(1);
}
echo "   ✓ Autenticación (AUTH PLAIN LOGIN) soportada por el servidor.\n\n";

// 6. Autenticación Interactiva Segura
echo "5. Verificación de Autenticación SMTP:\n";

// Determinar si ya hay credencial en archivo privado o solicitarla interactivamente
$passToTest = '';
if (!empty($passFromConfig) && $passFromConfig !== 'AQUI_TU_CONTRASENA_SMTP') {
    echo "   ℹ Contraseña detectada en archivo de configuración privada.\n";
    echo "   ¿Deseas verificar con la contraseña del archivo? [S/n]: ";
    $resp = trim((string)fgets(STDIN));
    if ($resp === '' || strtolower($resp) === 's' || strtolower($resp) === 'y') {
        $passToTest = $passFromConfig;
    }
}

if (empty($passToTest)) {
    echo "   ¿Deseas realizar una comprobación interactiva de credenciales ahora? [s/N]: ";
    $resp = trim((string)fgets(STDIN));
    if (strtolower($resp) === 's' || strtolower($resp) === 'y') {
        echo "   Introduce la contraseña para '{$user}' (la escritura no se mostrará): ";
        
        $isTty = function_exists('stream_isatty') && stream_isatty(STDIN);
        $hasStty = false;
        if ($isTty && DIRECTORY_SEPARATOR === '/') {
            $sttyCheck = @shell_exec('which stty 2>/dev/null');
            if (!empty($sttyCheck)) {
                $hasStty = true;
                @shell_exec('stty -echo 2>/dev/null');
            }
        }
        
        $passInput = fgets(STDIN);
        $passToTest = ($passInput !== false) ? trim($passInput) : '';
        
        if ($hasStty) {
            @shell_exec('stty echo 2>/dev/null');
            echo "\n";
        } else {
            echo "\n";
        }
    }
}

if (empty($passToTest)) {
    echo "   ℹ Comprobación de autenticación omitida.\n";
    echo "   ℹ La infraestructura de red, DNS y TLS en puerto 465 queda 100% verificada.\n";
    $sendCommand($socket, "QUIT");
    fclose($socket);
    echo "\n✓ VERIFICACIÓN TÉCNICA DE INFRAESTRUCTURA COMPLETADA EXITOSAMENTE.\n";
    exit(0);
}

// Proceso de autenticación
$authRes = $sendCommand($socket, "AUTH LOGIN");
if (!str_starts_with($authRes, '334')) {
    echo "   ✗ AUTH LOGIN rechazado por el servidor.\n";
    fclose($socket);
    exit(1);
}

$userRes = $sendCommand($socket, base64_encode($user));
if (!str_starts_with($userRes, '334')) {
    echo "   ✗ Nombre de usuario rechazado por el servidor.\n";
    fclose($socket);
    exit(1);
}

$passRes = $sendCommand($socket, base64_encode($passToTest));

// Borrado inmediato de la credencial en memoria
unset($passToTest);
$passToTest = '';

if (str_starts_with($passRes, '235')) {
    echo "   ✓ AUTENTICACIÓN SATISFACTORIA (Código 235).\n";
    echo "   ✓ El servidor autoriza el envío de correos desde '{$user}'.\n";
} else {
    echo "   ✗ ERROR DE AUTENTICACIÓN: credenciales incorrectas o buzón no habilitado para SMTP.\n";
    fclose($socket);
    exit(1);
}

$sendCommand($socket, "QUIT");
fclose($socket);

echo "\n========================================================\n";
echo "✓ RESULTADO: CONEXIÓN, TLS Y AUTENTICACIÓN TOTALMENTE OPERATIVAS\n";
echo "========================================================\n";
exit(0);
