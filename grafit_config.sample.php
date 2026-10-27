<?php
/**
 * GRAFIT CAFÉ — PLANTILLA DE CONFIGURACIÓN PRIVADA (PHP 8.3)
 * 
 * INSTRUCCIONES DE INSTALACIÓN EN PLESK (SIN ACCESO SSH):
 * 1. Desde el Administrador de Archivos de Plesk, sitúate en la raíz del alojamiento
 *    (por encima de la carpeta web pública 'beta.grafitcafe.com' o 'httpdocs').
 * 2. Si no existe, crea una carpeta llamada 'private' (o sube este archivo directamente).
 * 3. Sube este archivo con el nombre exacto: `grafit_config.php`.
 * 4. Rellena los datos de conexión SMTP del buzón oficial.
 * 
 * SEGURIDAD GARANTIZADA:
 * Al estar ubicado fuera del Document Root público, ningún visitante de la web
 * ni bot puede descargarlo vía HTTP bajo ninguna circunstancia.
 */

declare(strict_types=1);

return [
    // --------------------------------------------------------------------------
    // CONFIGURACIÓN DE CORREO SALIENTE (SMTP AUTENTICADO - PUERTO 465 SSL)
    // --------------------------------------------------------------------------
    'smtp_enabled' => true,
    
    // Servidor SMTP oficial de Grafit Café (resuelve a 5.181.44.105, Postfix ESMTP)
    'smtp_host' => 'mail.grafitcafe.com',
    
    // Puerto SMTP: 465 para SSL/TLS implícito directo (SMTPS)
    'smtp_port' => 465,
    
    // Modo de seguridad: 'ssl' (validación de certificados estricta Let's Encrypt / ISRG Root X1)
    'smtp_secure' => 'ssl',
    
    // Autenticación requerida
    'smtp_auth' => true,
    
    // Usuario de correo (dirección completa de la cuenta autorizada)
    'smtp_user' => 'grafitcafe@grafitcafe.com',
    
    // Contraseña del buzón de correo (mantener estrictamente en esta ubicación privada)
    'smtp_password' => 'AQUI_TU_CONTRASENA_SMTP',
    
    // Remitente del mensaje (debe coincidir con la cuenta autenticada para SPF/DKIM)
    'mail_from' => 'grafitcafe@grafitcafe.com',
    'mail_from_name' => 'Web Grafit Café (Solicitudes de Eventos)',
    
    // Buzón destinatario que recibirá las notificaciones de los clientes
    'mail_to' => 'grafitcafe@grafitcafe.com',
    'mail_to_name' => 'Gerencia Grafit Café',

    // --------------------------------------------------------------------------
    // INTEGRACIÓN OFICIAL DE INSTAGRAM (META GRAPH API v21.0)
    // --------------------------------------------------------------------------
    'instagram_handle' => 'grafitcafe',
    
    // Token de acceso de larga duración (opcional; mientras esté vacío opera en modo respaldo fanzine)
    'instagram_access_token' => '',
];
