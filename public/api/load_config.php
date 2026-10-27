<?php
/**
 * GRAFIT CAFÉ — CARGADOR DE CONFIGURACIÓN PRIVADA FUERA DEL DIRECTORIO PÚBLICO
 * 
 * Localiza la configuración privada en ubicaciones físicas exteriores
 * al Document Root público de Plesk (o carpeta hermana/padre), garantizando que
 * ninguna credencial pueda ser accesible vía HTTP bajo ninguna circunstancia,
 * sin depender exclusivamente de directivas .htaccess.
 * 
 * Compatible al 100% con el Administrador de Archivos de Plesk (sin necesidad de SSH).
 */

declare(strict_types=1);

// Protección contra acceso directo por URL
if (isset($_SERVER['SCRIPT_FILENAME']) && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=UTF-8');
    exit('Acceso directo prohibido.');
}

if (!function_exists('grafit_load_config')) {
    function grafit_load_config(): array {
        $searchPaths = [];

        // 1. Variable de entorno explícita (si el servidor web la define)
        $envPath = getenv('GRAFIT_CONFIG_PATH');
        if (!empty($envPath)) {
            $searchPaths[] = (string)$envPath;
        }

        // 2. Ubicación privada fuera del Document Root público (Plesk)
        // En Plesk, $_SERVER['DOCUMENT_ROOT'] apunta a la raíz web del subdominio (ej: /vhosts/dominio/beta.grafitcafe.com)
        // o a httpdocs. Subir un nivel sitúa el archivo en el espacio privado no servible por la web.
        $docRoot = $_SERVER['DOCUMENT_ROOT'] ?? '';
        if (!empty($docRoot)) {
            $cleanDocRoot = rtrim($docRoot, '/\\');
            $parent = dirname($cleanDocRoot);
            $searchPaths[] = $parent . '/private/grafit_config.php';
            $searchPaths[] = $parent . '/grafit_config.php';

            $grandParent = dirname($parent);
            if ($grandParent !== $parent) {
                $searchPaths[] = $grandParent . '/private/grafit_config.php';
                $searchPaths[] = $grandParent . '/grafit_config.php';
            }
        }

        // 3. Rutas relativas a la estructura del proyecto en disco
        // Desde /api/, dirname(__DIR__, 2) asciende por encima de la raíz del subdominio
        $dir = __DIR__;
        $searchPaths[] = dirname($dir, 2) . '/private/grafit_config.php';
        $searchPaths[] = dirname($dir, 2) . '/grafit_config.php';
        $searchPaths[] = dirname($dir, 3) . '/private/grafit_config.php';
        $searchPaths[] = dirname($dir, 3) . '/grafit_config.php';

        // 4. Ubicación de desarrollo / fallback local
        $searchPaths[] = $dir . '/config.php';

        foreach ($searchPaths as $path) {
            if (!empty($path) && file_exists($path) && is_readable($path)) {
                $loaded = require $path;
                if (is_array($loaded)) {
                    return $loaded;
                }
            }
        }

        return [];
    }
}
