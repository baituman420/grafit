# GUÍA OPERATIVA DE DESPLIEGUE EN MÁSBYTES / PLESK (SIN SSH)
## Web Oficial de Grafit Café (JARNAIBEN S.L.)

> [!IMPORTANT]
> **ESTADO DE AUTORIZACIÓN ACTUAL**:
> - Entorno de trabajo local y repositorio GitHub: **AUTORIZADO Y COMPILADO**.
> - Despliegue en subdominio beta: **PREPARADO TÉCNICAMENTE** (pendiente de propagación de su DNS público).
> - Despliegue en producción (`grafitcafe.com`) y sustitución de WordPress: **NO AUTORIZADO HASTA APROBACIÓN EXPRESA**. La web actual de WordPress permanece 100% activa e intacta.

---

## 1. Características del Alojamiento y Herramientas Disponibles

- **Proveedor**: MásBytes (servidores en España / UE).
- **Panel de control**: Plesk Obsidian (Linux / PleskLin).
- **IP del servidor**: `5.56.166.21`
- **Versión de PHP**: 8.3 (soporte nativo de `openssl`, `sockets`, `curl`, `json`, `mbstring`).
- **Servidor web**: Nginx (reverse proxy) + Apache (soporte de `.htaccess`).
- **Herramienta de gestión autorizada**: **Administrador de archivos de Plesk** (interfaz web gráfica, sin comandos SSH).
- **Dominio principal**: `grafitcafe.com` / `www.grafitcafe.com` (WordPress activo en `httpdocs`).
- **Subdominio de pruebas**: `beta.grafitcafe.com` (alojamiento independiente creado en Plesk).

---

## 2. Ubicación Privada de Credenciales (`grafit_config.php`)

Para que las credenciales de correo nunca dependan únicamente de `.htaccess` y queden **físicamente fuera del alcance de cualquier navegador web o bot**, el archivo de configuración debe situarse en el espacio privado de Plesk.

### Pasos en el Administrador de Archivos de Plesk:
1. Accede al panel de control de Plesk y haz clic en **Administrador de archivos**.
2. En el árbol de carpetas de la izquierda, haz clic en la **raíz del espacio de alojamiento** (el nivel superior donde ves las carpetas `httpdocs`, `logs`, `error_docs` y la carpeta de tu subdominio `beta.grafitcafe.com`).
3. Comprueba si existe la carpeta **`private`**:
   - Si no existe: haz clic en el botón superior **Nuevo** > **Crear directorio**, y nómbralo `private`.
4. Entra en la carpeta `private/` (o quédate en la raíz si prefieres no crear subcarpetas).
5. Haz clic en **Nuevo** > **Crear archivo** y nómbralo **`grafit_config.php`** (o sube la plantilla `grafit_config.sample.php` y renómbrala a `grafit_config.php`).
6. Edita el archivo con el editor de Plesk y pega los parámetros del buzón oficial:

```php
<?php
declare(strict_types=1);

return [
    // -------------------------------------------------------------------------
    // CORREO SALIENTE (SMTP PUERTO 465 SSL/TLS IMPLÍCITO)
    // -------------------------------------------------------------------------
    'smtp_enabled'   => true,
    'smtp_host'      => 'mail.grafitcafe.com', // Resuelve a 5.181.44.105 (Postfix ESMTP)
    'smtp_port'      => 465,                   // SSL implícito directo
    'smtp_secure'    => 'ssl',                 // Validación criptográfica estricta Let's Encrypt / ISRG Root X1
    'smtp_auth'      => true,
    'smtp_user'      => 'grafitcafe@grafitcafe.com', // Buzón autorizado
    'smtp_password'  => 'AQUI_LA_CONTRASENA_REAL_DEL_BUZON',
    'mail_from'      => 'grafitcafe@grafitcafe.com',
    'mail_from_name' => 'Web Grafit Café (Solicitudes de Eventos)',
    'mail_to'        => 'grafitcafe@grafitcafe.com',
    'mail_to_name'   => 'Gerencia Grafit Café',

    // -------------------------------------------------------------------------
    // META GRAPH API (INSTAGRAM v21.0)
    // -------------------------------------------------------------------------
    'instagram_handle'       => 'grafitcafe',
    'instagram_access_token' => '', // Opcional (dejar vacío para mantener modo fanzine seguro)
];
```
7. Guarda los cambios.

> [!TIP]
> **¿Cómo encuentra el backend este archivo?**
> El endpoint `api/contact.php` ejecuta `grafit_load_config()`, que busca de forma ascendente en:
> 1. `../private/grafit_config.php`
> 2. `../grafit_config.php`
> 3. `../../private/grafit_config.php`
> 4. `../../grafit_config.php`
>
> Al estar fuera del Document Root web, es física e informáticamente inaccesible desde internet por HTTP.

---

## 3. Procedimiento de Despliegue en Beta (`beta.grafitcafe.com`)

Una vez confirmada la resolución pública del DNS de `beta.grafitcafe.com`:

### Paso 1: Localizar el paquete preparado
El archivo comprimido definitivo se encuentra en la raíz del proyecto con el nombre:
**`grafit_beta_deploy.zip`**
- **Tamaño**: 137 MB
- **Huella SHA-256**: `4c9a0b68d7432126def8dffb1e94e89e21eaa22400bec130993ea5de71e4f721`
- **Contenido**: 0 credenciales, 0 archivos de configuración pública; cargador privado `api/load_config.php` enlazado exclusivamente a rutas privadas fuera del Document Root.

### Paso 2: Subida y extracción en Plesk
1. En Plesk, accede a la sección de **`beta.grafitcafe.com`** > **Administrador de archivos**.
2. Asegúrate de estar dentro del directorio raíz del subdominio (suele llamarse `beta.grafitcafe.com/` o `httpdocs/` del subdominio).
3. Si hay archivos previos temporales de Plesk (ej. `index.html` de bienvenida o `favicon.ico` por defecto), elimínalos o muévelos a una carpeta temporal.
4. Haz clic en el botón superior **Cargar**. Selecciona el archivo **`grafit_beta_deploy.zip`**.
5. Una vez cargado, marca la casilla del archivo `grafit_beta_deploy.zip`, haz clic en **Extraer archivos** y pulsa **Aceptar**.
6. (Opcional): Elimina el archivo `grafit_beta_deploy.zip` de la carpeta para no ocupar espacio innecesario.

### Paso 3: Comprobación de Seguridad de Indexación (noindex en Beta)
El archivo `.htaccess` incluido detecta automáticamente el subdominio y aplica:
`X-Robots-Tag: noindex, nofollow, noarchive`
Ningún motor de búsqueda indexará la versión beta.

### Paso 4: Pruebas Funcionales en Beta
1. Navega por `https://beta.grafitcafe.com/` en móvil y en escritorio.
2. Comprueba las páginas de la Carta, Espacio, Eventos, Historia y Textos Legales.
3. Comprueba el formulario de contacto:
   - Mientras la contraseña real no esté guardada en `grafit_config.php`, el formulario responderá con un error controlado informando de la vía telefónica alternativa (`944 102 772`), **sin confirmar jamás una recepción falsa ni usar mail() nativo**.
   - Tras introducir la contraseña en `grafit_config.php`, realiza un envío de prueba para validar la entrega en `grafitcafe@grafitcafe.com`.

---

## 4. Procedimiento Futuro de Sustitución de WordPress en Producción (`grafitcafe.com`)

> [!CAUTION]
> **ESTE PASO NO SE DEBE EJECUTAR AHORA.**
> Solo se llevará a cabo cuando el equipo de Grafit apruebe la versión beta y autorice el cambio definitivo.

### Paso 1: Copia de Seguridad Inmediata de WordPress desde Plesk
1. En Plesk, ve a `grafitcafe.com` > **Administrador de archivos**.
2. Selecciona la carpeta **`httpdocs`** y haz clic en **Añadir a un archivo comprimido**. Nómbralo `backup_wordpress_completo.zip`.
3. Haz clic en el archivo ZIP creado y pulsa **Descargar** para guardarlo localmente en vuestro ordenador.
4. En Plesk > **Bases de datos**, haz clic en **Exportar volcado** de la base de datos de WordPress y descárgalo.

### Paso 2: Aislamiento del WordPress Original
1. En el Administrador de archivos, selecciona la carpeta `httpdocs` y haz clic en **Renombrar**.
2. Cambia su nombre a: **`httpdocs_wordpress_backup`**.
3. Haz clic en **Nuevo** > **Crear directorio** y nómbralo: **`httpdocs`**.

### Paso 3: Despliegue en Producción
1. Entra en el nuevo directorio `httpdocs` vacío.
2. Sube y extrae el archivo **`grafit_beta_deploy.zip`**.
3. El archivo `grafit_config.php` situado en la carpeta privada servirá inmediatamente tanto a beta como a producción sin tener que volver a escribir credenciales.

### Paso 4: Plan de Reversión Instantánea (< 1 minuto)
Si por cualquier motivo se deseara volver al WordPress original:
1. En el Administrador de archivos de Plesk, renombra el directorio `httpdocs` a `httpdocs_v4_pausado`.
2. Renombra **`httpdocs_wordpress_backup`** nuevamente a **`httpdocs`**.
3. **Resultado**: WordPress y toda su información vuelven a estar activos al instante.
