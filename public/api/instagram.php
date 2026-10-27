<?php
/**
 * GRAFIT CAFÉ — ENDPOINT DE SINCRONIZACIÓN DE INSTAGRAM
 * 
 * Consulta de forma segura la API oficial de Meta (Instagram Graph API / Instagram API v21.0)
 * sin exponer jamás tokens ni credenciales en el frontend.
 * 
 * Implementa caché local en disco (2 horas) para minimizar peticiones a Meta,
 * evitar rate limits y garantizar tiempos de respuesta inferiores a 10ms.
 * 
 * Si las credenciales no están configuradas o la API no responde,
 * devuelve { ok: false, fallback: true } para que el frontend active su estado de respaldo visual.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=300'); // Caché HTTP de 5 min para navegadores

// Cargar configuración privada situada físicamente fuera del directorio público
require_once __DIR__ . '/load_config.php';
$config = grafit_load_config();

$accessToken = $config['instagram_access_token'] ?? null;
$accountHandle = $config['instagram_handle'] ?? 'grafitcafe';
$cacheDuration = 7200; // 2 horas de caché local

// Directorio de caché
$cacheDir = __DIR__ . '/cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}
$cacheFile = $cacheDir . '/instagram_latest.json';

// Si existe caché válida, servir inmediatamente
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheDuration)) {
    $cachedData = file_get_contents($cacheFile);
    if ($cachedData !== false) {
        echo $cachedData;
        exit;
    }
}

// Si no hay token configurado, responder fallback controlado
if (empty($accessToken) || $accessToken === 'TU_TOKEN_DE_LARGA_DURACION_DE_INSTAGRAM') {
    echo json_encode([
        'ok' => false,
        'fallback' => true,
        'status' => 'PENDING_CREDENTIALS',
        'account' => $accountHandle,
        'message' => 'Integración preparada. Credenciales oficiales de Meta pendientes de configuración por la administración.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Consulta a la API oficial de Meta v21.0
$apiUrl = sprintf(
    'https://graph.instagram.com/v21.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=%s&limit=1',
    urlencode($accessToken)
);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT => 'GrafitCafeWeb/1.0',
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $httpCode !== 200) {
    // Si falla la llamada y tenemos caché previa (aunque sea antigua), usarla como salvaguarda
    if (file_exists($cacheFile)) {
        $staleCache = file_get_contents($cacheFile);
        if ($staleCache !== false) {
            echo $staleCache;
            exit;
        }
    }

    echo json_encode([
        'ok' => false,
        'fallback' => true,
        'status' => 'API_UNAVAILABLE',
        'account' => $accountHandle,
        'message' => 'No se pudo contactar con la API de Instagram. Se muestra el estado de archivo oficial.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$decoded = json_decode($response, true);
if (empty($decoded['data'][0])) {
    echo json_encode([
        'ok' => false,
        'fallback' => true,
        'status' => 'NO_POSTS_FOUND',
        'account' => $accountHandle,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$raw = $decoded['data'][0];
$post = [
    'id' => (string)($raw['id'] ?? ''),
    'caption' => (string)($raw['caption'] ?? ''),
    'mediaUrl' => (string)($raw['media_type'] === 'VIDEO' ? ($raw['thumbnail_url'] ?? $raw['media_url'] ?? '') : ($raw['media_url'] ?? '')),
    'permalink' => (string)($raw['permalink'] ?? 'https://instagram.com/' . $accountHandle),
    'timestamp' => (string)($raw['timestamp'] ?? date('c')),
    'mediaType' => (string)($raw['media_type'] ?? 'IMAGE'),
];

$outputPayload = json_encode([
    'ok' => true,
    'fallback' => false,
    'account' => $accountHandle,
    'post' => $post,
    'cachedAt' => date('c'),
], JSON_UNESCAPED_UNICODE);

// Guardar en caché local
@file_put_contents($cacheFile, $outputPayload);

echo $outputPayload;
