import React from 'react';
import { ArrowLeft, Cookie, CheckCircle2, AlertCircle, Info, ExternalLink, Settings } from 'lucide-react';

interface PoliticaCookiesPageProps {
  onNavigate: (path: string) => void;
}

export const PoliticaCookiesPage: React.FC<PoliticaCookiesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 font-sans">
      {/* HEADER DE PÁGINA */}
      <div className="p-6 sm:p-8 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative tape-top space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1">
            // POLÍTICA DE COOKIES & AUDITORÍA TÉCNICA
          </div>
          <span className="font-mono-code text-[11px] bg-amber-200 text-amber-950 px-2 py-0.5 border border-black font-bold">
            BORRADOR PENDIENTE DE VALIDACIÓN FINAL
          </span>
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          POLÍTICA DE COOKIES
        </h1>
        <p className="font-mono-code text-neutral-800 text-xs sm:text-sm">
          Información clara y transparente sobre el uso de tecnologías de almacenamiento local y cookies en el sitio web de Grafit Café.
        </p>
      </div>

      {/* AVISO DE AUDITORÍA REAL */}
      <div className="p-4 bg-emerald-50 border-3 border-emerald-800 text-emerald-950 font-mono-code text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold uppercase text-emerald-900">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Auditoría de Tecnologías de Seguimiento de Grafit Café</span>
        </div>
        <p className="leading-relaxed">
          En cumplimiento del artículo 22.2 de la LSSI-CE y las directrices de la Agencia Española de Protección de Datos (AEPD), le informamos de que <strong>esta web NO utiliza cookies analíticas de terceros, NO utiliza píxeles de publicidad comportamental (como Meta Pixel) ni herramientas de rastreo invasivo de usuarios</strong>.
        </p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-8 text-neutral-900 text-sm leading-relaxed">
        
        {/* 1. QUÉ SON LAS COOKIES */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">1.</span> ¿Qué son las Cookies?
          </h2>
          <p>
            Una cookie es un pequeño archivo de texto que los sitios web almacenan en el navegador o dispositivo del usuario durante la navegación. Las cookies desempeñan funciones muy diversas, como recordar preferencias de navegación, permitir el funcionamiento seguro de una sesión técnica o recopilar información estadística.
          </p>
        </section>

        {/* 2. AUDITORÍA DEL SITIO WEB DE GRAFIT CAFÉ */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">2.</span> Auditoría Técnica y Régimen de Exención
          </h2>
          <p>
            El sitio web de <strong>Grafit Café</strong> ha sido diseñado bajo principios de privacidad desde el diseño y minimización de datos. En la actualidad:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-code text-xs">
            <div className="p-4 bg-white border-2 border-black space-y-1">
              <strong className="text-black uppercase">Cookies de Publicidad y Perfilado</strong>
              <p className="text-[#b91c1c] font-bold">NO UTILIZADAS (0 detectadas)</p>
              <p className="text-neutral-600">No se instalan cookies para mostrar publicidad dirigida ni para rastrear hábitos de navegación entre sitios web.</p>
            </div>
            <div className="p-4 bg-white border-2 border-black space-y-1">
              <strong className="text-black uppercase">Cookies Analíticas de Terceros</strong>
              <p className="text-[#b91c1c] font-bold">NO UTILIZADAS (0 detectadas)</p>
              <p className="text-neutral-600">No se cargan scripts de Google Analytics, Hotjar, Clarity ni herramientas de telemetría de terceros.</p>
            </div>
            <div className="p-4 bg-white border-2 border-black space-y-1">
              <strong className="text-black uppercase">Cookies Técnicas / Funcionales</strong>
              <p className="text-emerald-700 font-bold">EXENTAS DE CONSENTIMIENTO</p>
              <p className="text-neutral-600">Únicamente se emplean variables de estado en memoria para el enrutado de la web y el despliegue del menú interactivo.</p>
            </div>
            <div className="p-4 bg-white border-2 border-black space-y-1">
              <strong className="text-black uppercase">Integraciones Externas</strong>
              <p className="text-neutral-700 font-bold">PROTECCIÓN POR ENLACE DIRECTO</p>
              <p className="text-neutral-600">Los enlaces a Instagram o Google Maps dirigen al entorno del proveedor, sin incrustar scripts de rastreo en el navegador del usuario.</p>
            </div>
          </div>
          <p className="text-xs text-neutral-700">
            De conformidad con las directrices de la AEPD y el artículo 22.2 de la LSSI-CE, al no instalarse cookies que requieran consentimiento previo, la web no muestra banners redundantes que entorpezcan la navegación, garantizando un acceso limpio, directo y respetuoso con la privacidad del usuario.
          </p>
        </section>

        {/* 3. SERVICIOS DE TERCEROS ENLAZADOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">3.</span> Enlaces a Servicios de Terceros
          </h2>
          <p>
            En distintas secciones del sitio web se proporcionan enlaces directos a perfiles sociales y servicios externos de Grafit Café:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono-code text-xs">
            <li><strong>Instagram:</strong> Enlace al perfil oficial <code className="bg-neutral-200 px-1">@grafitcafe</code> (Meta Platforms Ireland Ltd.).</li>
            <li><strong>Google Maps:</strong> Enlace directo a la ubicación física de Urrutia Kalea 1 en Bilbao (Google Ireland Ltd.).</li>
          </ul>
          <p className="text-xs text-neutral-600">
            Al hacer clic en dichos enlaces, el usuario accede voluntariamente a los dominios de estos terceros, los cuales gestionan sus propias cookies y políticas de privacidad ajenas al control de JARNAIBEN S.L.
          </p>
        </section>

        {/* 4. GESTIÓN Y DESACTIVACIÓN EN NAVEGADORES */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">4.</span> Cómo Administrar o Bloquear Cookies en su Navegador
          </h2>
          <p>
            En cualquier momento, el usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador de Internet:
          </p>
          <div className="space-y-2 font-mono-code text-xs">
            <p>
              • <strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.
            </p>
            <p>
              • <strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad &amp; Seguridad &gt; Cookies y datos del sitio.
            </p>
            <p>
              • <strong>Apple Safari:</strong> Ajustes / Preferencias &gt; Privacidad &gt; Bloquear todas las cookies.
            </p>
            <p>
              • <strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio &gt; Cookies y datos del sitio.
            </p>
          </div>
        </section>

        {/* 5. ACTUALIZACIONES DE LA POLÍTICA */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">5.</span> Modificaciones y Actualizaciones
          </h2>
          <p>
            Si en el futuro el titular decidiera incorporar herramientas analíticas o servicios que instalen cookies no exentas, se implementará con carácter previo un sistema de gestión del consentimiento (CMP) que permita aceptar, rechazar o configurar preferencias de forma granular, actualizándose simultáneamente este documento.
          </p>
        </section>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between items-center font-mono-code text-xs pt-4">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-[#b91c1c] transition-colors border-2 border-black font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </button>
        <button
          onClick={() => onNavigate('/aviso-legal')}
          className="text-[#b91c1c] hover:underline font-bold cursor-pointer"
        >
          Consultar Aviso Legal &rarr;
        </button>
      </div>
    </div>
  );
};
