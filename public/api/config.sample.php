<?php
/**
 * GRAFIT CAFÉ — PLANTILLA DE CONFIGURACIÓN PRIVADA (PHP 8.3)
 * 
 * INSTRUCCIONES DE INSTALACIÓN EN PLESK:
 * 1. Copia este archivo como `config.php` en el mismo directorio (o fuera de httpdocs).
 * 2. Rellena los datos de conexión SMTP proporcionados por MásBytes / Plesk.
 * 3. IMPORTANTE: Este archivo NUNCA debe subirse a Git ni hacerse público.
 *    El archivo .htaccess protege el acceso directo a cualquier archivo .php en /api/
 *    salvo los endpoints públicos autorizados.
 */

declare(strict_types=1);

return [
    // --------------------------------------------------------------------------
    // CONFIGURACIÓN DE CORREO SALIENTE (SMTP AUTENTICADO)
    // --------------------------------------------------------------------------
    'smtp_enabled' => true,
    
    // Servidor SMTP (ej. 'localhost', 'mail.grafitcafe.com', o '5.56.166.21')
    'smtp_host' => 'mail.grafitcafe.com',
    
    // Puerto SMTP (comúnmente 587 para STARTTLS, 465 para SSL/TLS, o 25 en local)
    'smtp_port' => 587,
    
    // Cifrado ('tls', 'ssl', o '' para conexión sin cifrado)
    'smtp_secure' => 'tls',
    
    // Autenticación SMTP requerida
    'smtp_auth' => true,
    
    // Usuario de correo (buzón completo oficial)
    'smtp_user' => 'grafitcafe@grafitcafe.com',
    
    // Contraseña del buzón de correo
    'smtp_password' => 'AQUI_TU_CONTRASENA_SMTP',
    
    // Remitente del mensaje
    'mail_from' => 'grafitcafe@grafitcafe.com',
    'mail_from_name' => 'Web Grafit Café (Solicitudes de Eventos)',
    
    // Destinatario que recibirá las notificaciones de los clientes
    'mail_to' => 'grafitcafe@grafitcafe.com',
    'mail_to_name' => 'Gerencia Grafit Café',

    // --------------------------------------------------------------------------
    // INTEGRACIÓN OFICIAL DE INSTAGRAM (META GRAPH API v21.0)
    // --------------------------------------------------------------------------
    // Cuenta oficial de Instagram
    'instagram_handle' => 'grafitcafe',
    
    // Token de acceso de larga duración (User Token / Page Token de Meta)
    // Dejar vacío mientras no esté generada la app en Meta for Developers
    'instagram_access_token' => '',
];
