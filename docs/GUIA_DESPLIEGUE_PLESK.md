# GUÍA TÉCNICA DE DESPLIEGUE EN MÁSBYTES / PLESK Y OPERACIONES
## Web Oficial de Grafit Café (JARNAIBEN S.L.)

> **ESTADO DE AUTORIZACIÓN**: 
> - Entorno de trabajo local y repositorio GitHub: **AUTORIZADO**.
> - Despliegue en subdominio beta: **PREPARADO** (pendiente de propagación DNS pública).
> - Despliegue en producción (`grafitcafe.com`) y sustitución de WordPress: **NO AUTORIZADO HASTA APROBACIÓN EXPRESA**.

---

## 1. Características del Entorno de Alojamiento (MásBytes)

- **Panel de control**: Plesk Obsidian (Linux / PleskLin).
- **Dirección IP**: `5.56.166.21`
- **Versión de PHP**: 8.3.36 (con módulos `curl`, `json`, `mbstring`, `openssl`, `sockets`).
- **Servidor web**: Nginx (reverse proxy) + Apache (soporte completo de `.htaccess`).
- **Acceso a terminal (SSH)**: No disponible / prohibido por política del proveedor.
- **Acceso a archivos**: Administrador de archivos de Plesk y FTP/SFTP.
- **Servidores DNS públicos**: `ns1.masbytes.es` y `ns2.masbytes.es`.
- **Dominio principal**: `grafitcafe.com` / `www.grafitcafe.com` (WordPress activo en `httpdocs`).
- **Subdominio de pruebas**: `beta.grafitcafe.com` (alojamiento independiente creado en Plesk).

---

## 2. Estructura del Paquete de Producción (`dist/`)

La compilación estática (`npm run build`) genera un directorio autónomo `dist/` con la siguiente estructura lista para transferir al servidor:

```text
httpdocs/ (o directorio raíz del vhost)
├── .htaccess                     # Enrutado SPA, 301 redirects de WordPress, noindex en beta y seguridad
├── index.html                    # HTML principal con metadatos Open Graph, Twitter y Schema.org JSON-LD
├── robots.txt                    # Permite rastreo en producción (beta protegido por .htaccess)
├── sitemap.xml                   # Mapa del sitio XML canónico oficial
├── assets/                       # Paquete estático compilado (JS, CSS, imágenes WebP, fuentes)
└── api/                          # Endpoints seguros PHP 8.3 (backend desacoplado)
    ├── contact.php               # Procesamiento de formulario de eventos y envío SMTP autenticado
    ├── instagram.php             # Consulta a Instagram Graph API con caché local en disco (2h)
    └── config.sample.php         # Plantilla de configuración privada
```

---

## 3. Configuración de Credenciales Privadas (`api/config.php`)

Para que el formulario de eventos y la sincronización de Instagram funcionen en el servidor, debe crearse un archivo **`api/config.php`** en el servidor (fuera de Git).

### Pasos en Plesk:
1. Accede al Administrador de Archivos de Plesk.
2. Navega a la carpeta `api/`.
3. Haz una copia de `config.sample.php` y nómbrala **`config.php`**.
4. Edita los valores correspondientes:

```php
<?php
declare(strict_types=1);

return [
    // -------------------------------------------------------------------------
    // PARÁMETROS SMTP AUTENTICADOS (Buzón Oficial Grafit Café)
    // -------------------------------------------------------------------------
    'smtp_enabled'   => true,
    'smtp_host'      => 'mail.grafitcafe.com', // Resuelve a 5.181.44.105 (Postfix ESMTP)
    'smtp_port'      => 465,                   // 465: SSL/TLS implícito directo
    'smtp_secure'    => 'ssl',                 // 'ssl' con validación estricta Let's Encrypt / ISRG Root X1
    'smtp_auth'      => true,
    'smtp_user'      => 'grafitcafe@grafitcafe.com', // Dirección completa autorizada
    'smtp_password'  => 'CONTRASENA_REAL_DEL_BUZON',
    'mail_from'      => 'grafitcafe@grafitcafe.com',
    'mail_from_name' => 'Web Grafit Café (Solicitudes de Eventos)',
    'mail_to'        => 'grafitcafe@grafitcafe.com',
    'mail_to_name'   => 'Gerencia Grafit Café',

    // -------------------------------------------------------------------------
    // META GRAPH API (INSTAGRAM v21.0)
    // -------------------------------------------------------------------------
    'instagram_handle'       => 'grafitcafe',
    'instagram_access_token' => 'TOKEN_DE_LARGA_DURACION_DE_META', // Opcional
];
```

### Verificación previa de conexión SMTP antes de activar:
En el servidor Plesk (mediante SSH o terminal de Plesk), se puede ejecutar la herramienta de diagnóstico CLI para comprobar la conectividad y autenticación antes de habilitar el formulario de producción:

```bash
# Comprobación de DNS, socket SSL puerto 465 y saludo ESMTP:
php scripts/verify_smtp.php

# Comprobación completa incluyendo autenticación de buzón:
php scripts/verify_smtp.php --password="CONTRASENA_REAL_DEL_BUZON"
```

> [!IMPORTANT]
> **Seguridad garantizada**: El archivo `.htaccess` incluye la regla `Require all denied` para `config.php`, impidiendo cualquier descarga directa desde navegadores web. Además, está incluido en `.gitignore`. NUNCA se utiliza `mail()` nativo como fallback ante fallos de conexión.

---

## 4. Procedimiento de Despliegue en el Entorno Beta (`beta.grafitcafe.com`)

Una vez confirmada la propagación del registro DNS público de `beta.grafitcafe.com`:

1. **Subir archivos**:
   - Comprimir localmente la carpeta `dist/` en `grafit_dist.zip`.
   - En Plesk, seleccionar el dominio `beta.grafitcafe.com` > **Administrador de archivos**.
   - Subir `grafit_dist.zip` y descomprimir directamente en el directorio raíz del subdominio.
2. **Configurar archivo privado**:
   - Crear `api/config.php` con los datos SMTP verificados.
3. **Comprobar protección de noindex**:
   - Enviar petición de prueba: `curl -sI https://beta.grafitcafe.com/`
   - Verificar la presencia de: `X-Robots-Tag: noindex, nofollow, noarchive`.
4. **Validación funcional**:
   - Probar navegación en móvil y escritorio.
   - Enviar una solicitud real de prueba en el formulario de eventos y comprobar la entrega en el buzón `grafitcafe@grafitcafe.com`.

---

## 5. Procedimiento de Transición desde WordPress a Producción (`grafitcafe.com`)

> [!CAUTION]
> **ESTE PROCEDIMIENTO SOLO SE EJECUTARÁ TRAS LA APROBACIÓN EXPRESA DEL EQUIPO DE GRAFIT.**

### Paso 1: Copia de Seguridad Integral de WordPress
1. En Plesk, ir a `grafitcafe.com` > **Administrador de archivos**.
2. Seleccionar la carpeta `httpdocs/` y comprimirla como `backup_wordpress_completo.zip`.
3. Descargar una copia de seguridad local del archivo ZIP.
4. En Plesk > **Bases de datos**, exportar un volcado SQL de la base de datos de WordPress.

### Paso 2: Aislamiento del WordPress Original
1. Renombrar la carpeta actual `httpdocs` a **`httpdocs_wordpress_backup`**.
2. Crear un nuevo directorio vacío llamado **`httpdocs`**.

### Paso 3: Despliegue de la Nueva Web
1. Descomprimir el contenido de `dist/` en el nuevo `httpdocs/`.
2. Copiar `api/config.php` configurado en `httpdocs/api/config.php`.
3. Verificar permisos de lectura (`0755` para directorios, `0644` para archivos).

### Paso 4: Pruebas de Humo en Producción
- [ ] Comprobar que `https://www.grafitcafe.com/` carga con certificado SSL válido.
- [ ] Comprobar que `https://www.grafitcafe.com/contenidos/` redirige (301) a `https://www.grafitcafe.com/carta`.
- [ ] Comprobar que `https://www.grafitcafe.com/info/` redirige (301) a `https://www.grafitcafe.com/espacio`.
- [ ] Comprobar que `https://www.grafitcafe.com/agenda/` redirige (301) a `https://www.grafitcafe.com/eventos`.
- [ ] Realizar un envío de prueba en el formulario de contacto y verificar acuse y recepción.
- [ ] Comprobar en Google Search Console que el `sitemap.xml` responde 200 OK.

---

## 6. Plan de Reversión Inmediata (Rollback < 1 minuto)

Si durante las comprobaciones en producción se detectase cualquier incidencia crítica imprevista:

1. En el Administrador de Archivos de Plesk, renombrar `httpdocs` a `httpdocs_v4_failed`.
2. Renombrar **`httpdocs_wordpress_backup`** nuevamente a **`httpdocs`**.
3. **Resultado**: WordPress y su contenido original vuelven a estar 100% operativos de forma inmediata.

---

## 7. Guía de Conexión de Instagram (Meta Graph API)

La integración está preparada y operando en modo **respaldo honesto** (mostrando la fotografía real de cultura de Grafit y enlace directo al perfil `@grafitcafe`).

Para activar la sincronización automática de la última publicación real:
1. Acceder a [Meta for Developers](https://developers.facebook.com/).
2. Crear o seleccionar una App de tipo **Negocio / Creator**.
3. Añadir el producto **Instagram Graph API**.
4. En el Explorador de la Graph API, seleccionar la cuenta de Instagram `@grafitcafe` vinculada a la página de Facebook del establecimiento.
5. Solicitar los permisos:
   - `instagram_business_basic` (lectura de publicaciones y perfil).
6. Generar un **Token de Acceso de Usuario de Larga Duración** (validez de 60 días).
7. Pegar el token en `api/config.php`:
   ```php
   'instagram_access_token' => 'EAABw...',
   ```
8. La web comenzará a sincronizar automáticamente y cacheará las publicaciones durante 2 horas.
