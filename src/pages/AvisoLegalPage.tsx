import React from 'react';
import { ArrowLeft, Shield, AlertCircle, FileText, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface AvisoLegalPageProps {
  onNavigate: (path: string) => void;
}

export const AvisoLegalPage: React.FC<AvisoLegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 font-sans">
      {/* HEADER DE PÁGINA CON ESTÉTICA EDITORIAL FANZINE */}
      <div className="p-6 sm:p-8 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative tape-top space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1">
            // INFORMACIÓN LEGAL Y REGULATORIA (LSSI-CE)
          </div>
          <span className="font-mono-code text-[11px] bg-amber-200 text-amber-950 px-2 py-0.5 border border-black font-bold">
            BORRADOR PENDIENTE DE VALIDACIÓN FINAL
          </span>
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          AVISO LEGAL
        </h1>
        <p className="font-mono-code text-neutral-800 text-xs sm:text-sm">
          Cumplimiento de las obligaciones de información establecidas en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
        </p>
      </div>

      {/* AVISO DE TRANSPARENCIA SOBRE ESTADO DEL BORRADOR */}
      <div className="p-4 bg-amber-50 border-3 border-amber-800 text-amber-950 font-mono-code text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold uppercase text-amber-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Nota Informativa para el Usuario y Revisión</span>
        </div>
        <p className="leading-relaxed">
          Este documento ha sido preparado para la web de Grafit Café y se encuentra actualmente en fase de revisión y validación previa a su publicación definitiva. Los datos registrales complementarios se incorporarán tras la oportuna ratificación de la titularidad.
        </p>
      </div>

      {/* CONTENIDO DEL AVISO LEGAL */}
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-8 text-neutral-900 text-sm leading-relaxed">
        
        {/* 1. DATOS IDENTIFICATIVOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">1.</span> Datos Identificativos del Prestador
          </h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se ponen a disposición de los usuarios los datos identificativos del titular del sitio web:
          </p>
          <div className="p-4 bg-white border-2 border-black space-y-2 font-mono-code text-xs">
            <p><strong className="text-black">Razón social:</strong> JARNAIBEN S.L.</p>
            <p><strong className="text-black">Número de Identificación Fiscal (NIF/CIF):</strong> B95435269</p>
            <p><strong className="text-black">Nombre comercial:</strong> Grafit Café / Grafit Rock Café</p>
            <p><strong className="text-black">Domicilio social y establecimiento:</strong> Calle Urrutia 1, bajo, 48010 Bilbao (Bizkaia), España</p>
            <p><strong className="text-black">Correo electrónico de contacto:</strong> <a href="mailto:grafitcafe@grafitcafe.com" className="text-[#b91c1c] underline">grafitcafe@grafitcafe.com</a></p>
            <p><strong className="text-black">Teléfono de atención:</strong> 944 102 772</p>
            <p className="text-neutral-600 pt-1 border-t border-neutral-200">
              <strong className="text-neutral-700">Datos registrales:</strong> [Datos de inscripción en el Registro Mercantil de Bizkaia: Pendiente de confirmación por la titularidad].
            </p>
          </div>
        </section>

        {/* 2. OBJETO Y ÁMBITO */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">2.</span> Objeto y Ámbito de Aplicación
          </h2>
          <p>
            El presente Aviso Legal regula el acceso, navegación y uso del sitio web oficial de <strong>Grafit Café</strong>.
            La utilización del sitio web atribuye la condición de usuario a toda persona que acceda al mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este documento en la versión publicada en el momento del acceso.
          </p>
          <p>
            El titular se reserva el derecho de modificar unilateralmente, en cualquier momento y sin previo aviso, la presentación, configuración y contenidos del sitio web, así como las condiciones requeridas para su utilización.
          </p>
        </section>

        {/* 3. CONDICIONES DE UTILIZACIÓN */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">3.</span> Condiciones de Utilización
          </h2>
          <p>
            El usuario se compromete a hacer un uso lícito, diligente, correcto y de buena fe del sitio web y de sus contenidos, de conformidad con la legislación aplicable, la moral, las buenas costumbres y el orden público.
          </p>
          <p>Queda expresamente prohibido:</p>
          <ul className="list-disc pl-5 space-y-1 font-mono-code text-xs">
            <li>Utilizar el sitio web con fines ilícitos, lesivos de derechos o intereses de terceros, o que puedan dañar, inutilizar, sobrecargar o deteriorar el portal o impedir su normal utilización.</li>
            <li>Introducir programas, virus, macros, applets o cualquier dispositivo lógico que cause o sea susceptible de causar cualquier alteración en los sistemas informáticos del titular o de terceros.</li>
            <li>Remitir solicitudes automatizadas o spam a través del formulario de contacto o buzones del establecimiento.</li>
          </ul>
        </section>

        {/* 4. PROPIEDAD INTELECTUAL E INDUSTRIAL */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">4.</span> Propiedad Intelectual e Industrial
          </h2>
          <p>
            Todos los contenidos del sitio web (a título enunciativo pero no limitativo: textos, fotografías, gráficos, imágenes, iconos, logotipos, marcas comerciales, nombres comerciales, diseño gráfico, código fuente y software) son propiedad de <strong>JARNAIBEN S.L.</strong> o de sus legítimos autores y licenciantes, y están protegidos por las leyes españolas e internacionales de propiedad intelectual e industrial.
          </p>
          <p>
            Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de todo o parte de los contenidos sin la previa autorización expresa y por escrito de su titular.
          </p>
        </section>

        {/* 5. RESPONSABILIDADES */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">5.</span> Régimen de Responsabilidades
          </h2>
          <p>
            JARNAIBEN S.L. no garantiza la inexistencia de interrupciones o errores en el acceso a la web o a su contenido, ni que este se encuentre permanentemente actualizado, si bien desplegará sus mejores esfuerzos para subsanar cualquier incidencia a la mayor brevedad.
          </p>
          <p>
            JARNAIBEN S.L. no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionarse por el uso indebido del sitio web o por la presencia de elementos lesivos ajenos a su control razonable.
          </p>
        </section>

        {/* 6. ENLACES EXTERNOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">6.</span> Enlaces Externos
          </h2>
          <p>
            El sitio web puede poner a disposición de los usuarios enlaces que permiten el acceso a sitios y páginas web pertenecientes a terceros (por ejemplo, perfiles en redes sociales como Instagram, Facebook o servicios de mapas).
          </p>
          <p>
            La inclusión de dichos enlaces tiene una finalidad estrictamente informativa y de facilitar la comunicación con nuestra comunidad. JARNAIBEN S.L. no ejerce control sobre dichos sitios ni asume responsabilidad alguna sobre los contenidos, políticas de privacidad o prácticas de tales terceros.
          </p>
        </section>

        {/* 7. LEGISLACIÓN Y JURISDICCIÓN */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">7.</span> Legislación Aplicable y Jurisdicción
          </h2>
          <p>
            Las relaciones entre el usuario y el prestador se regirán por la normativa española vigente. Para la resolución de cualquier controversia que pudiera derivarse del acceso o utilización del sitio web, ambas partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales de la ciudad de <strong>Bilbao</strong> (Bizkaia).
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
          onClick={() => onNavigate('/politica-privacidad')}
          className="text-[#b91c1c] hover:underline font-bold cursor-pointer"
        >
          Consultar Política de Privacidad &rarr;
        </button>
      </div>
    </div>
  );
};
