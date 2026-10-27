import React from 'react';
import { ArrowLeft, ShieldCheck, AlertCircle, Lock, Mail, Server, Users, CheckCircle2 } from 'lucide-react';

interface PoliticaPrivacidadPageProps {
  onNavigate: (path: string) => void;
}

export const PoliticaPrivacidadPage: React.FC<PoliticaPrivacidadPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 font-sans">
      {/* HEADER DE PÁGINA */}
      <div className="p-6 sm:p-8 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative tape-top space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1">
            // PROTECCIÓN DE DATOS (RGPD & LOPDGDD)
          </div>
          <span className="font-mono-code text-[11px] bg-amber-200 text-amber-950 px-2 py-0.5 border border-black font-bold">
            BORRADOR PENDIENTE DE VALIDACIÓN FINAL
          </span>
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          POLÍTICA DE PRIVACIDAD
        </h1>
        <p className="font-mono-code text-neutral-800 text-xs sm:text-sm">
          Información transparente sobre los tratamientos reales de datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
        </p>
      </div>

      {/* AVISO DE TRANSPARENCIA */}
      <div className="p-4 bg-amber-50 border-3 border-amber-800 text-amber-950 font-mono-code text-xs space-y-1">
        <div className="flex items-center gap-2 font-bold uppercase text-amber-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Borrador en Proceso de Ratificación</span>
        </div>
        <p className="leading-relaxed">
          Esta política describe con rigor los tratamientos efectivos de datos asociados al sitio web de Grafit Café. Su redactado se encuentra en fase de validación técnica y jurídica previa a su publicación definitiva.
        </p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-8 text-neutral-900 text-sm leading-relaxed">
        
        {/* 1. RESPONSABLE */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">1.</span> Responsable del Tratamiento
          </h2>
          <div className="p-4 bg-white border-2 border-black space-y-1.5 font-mono-code text-xs">
            <p><strong className="text-black">Identidad del responsable:</strong> JARNAIBEN S.L.</p>
            <p><strong className="text-black">NIF/CIF:</strong> B95435269</p>
            <p><strong className="text-black">Establecimiento comercial:</strong> Grafit Café</p>
            <p><strong className="text-black">Dirección postal:</strong> Calle Urrutia 1, bajo, 48010 Bilbao (Bizkaia)</p>
            <p><strong className="text-black">Correo electrónico de contacto:</strong> <a href="mailto:grafitcafe@grafitcafe.com" className="text-[#b91c1c] underline">grafitcafe@grafitcafe.com</a></p>
            <p><strong className="text-black">Teléfono:</strong> 944 102 772</p>
          </div>
        </section>

        {/* 2. DATOS RECOGIDOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">2.</span> Datos Personales Objeto de Tratamiento
          </h2>
          <p>
            A través del sitio web únicamente se recopilan los datos personales que el propio usuario facilita de forma voluntaria mediante el formulario oficial de contacto y solicitud de eventos:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono-code text-xs">
            <li><strong>Datos identificativos:</strong> Nombre o colectivo de contacto.</li>
            <li><strong>Datos de contacto:</strong> Dirección de correo electrónico y teléfono de contacto (este último con carácter voluntario, para agilizar la confirmación de fechas).</li>
            <li><strong>Datos relativos a la solicitud o evento:</strong> Motivo de contacto, tipología de evento (particular, comida de cuadrilla, reunión de empresa), número aproximado de asistentes, fecha orientativa prevista y mensaje explicativo.</li>
          </ul>
          <p className="text-xs text-neutral-600">
            No se recaban categorías especiales de datos personales (datos sensibles) ni se elaboran perfiles automatizados.
          </p>
        </section>

        {/* 3. FINALIDADES Y BASES JURÍDICAS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">3.</span> Finalidades y Bases Jurídicas del Tratamiento
          </h2>
          <p>
            Los datos personales serán tratados exclusivamente para las siguientes finalidades legítimas y conforme a las bases normativas correspondientes:
          </p>
          <div className="space-y-3 font-mono-code text-xs">
            <div className="p-3 bg-white border border-black space-y-1">
              <strong className="text-black uppercase">A. Gestión de Solicitudes de Eventos y Reservas de Grupo</strong>
              <p className="text-neutral-700">
                <strong>Base jurídica:</strong> Aplicación de medidas precontractuales a petición del interesado (Artículo 6.1.b del RGPD). El tratamiento es estrictamente necesario para verificar la disponibilidad del salón, confeccionar presupuestos orientativos y coordinar el formato del evento solicitado.
              </p>
            </div>
            <div className="p-3 bg-white border border-black space-y-1">
              <strong className="text-black uppercase">B. Atención de Consultas Generales e Información</strong>
              <p className="text-neutral-700">
                <strong>Base jurídica:</strong> Interés legítimo del responsable (Artículo 6.1.f del RGPD) en atender adecuadamente las comunicaciones recibidas de clientes y usuarios, así como el consentimiento otorgado por el usuario al remitir su mensaje (Artículo 6.1.a del RGPD).
              </p>
            </div>
            <div className="p-3 bg-white border border-black space-y-1">
              <strong className="text-black uppercase">C. Cumplimiento de Obligaciones Legales</strong>
              <p className="text-neutral-700">
                <strong>Base jurídica:</strong> Cumplimiento de obligaciones legales aplicables a JARNAIBEN S.L. (Artículo 6.1.c del RGPD), tales como normativas fiscales o mercantiles en caso de formalización de servicios.
              </p>
            </div>
          </div>
          <p className="text-xs font-bold text-[#b91c1c]">
            No se enviarán comunicaciones comerciales ni publicidad no solicitada salvo que medie autorización expresa y previa del interesado.
          </p>
        </section>

        {/* 4. DESTINATARIOS Y ENCARGADOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">4.</span> Destinatarios y Encargados del Tratamiento
          </h2>
          <p>
            JARNAIBEN S.L. no cederá ni comunicará sus datos personales a ningún tercero, salvo obligación legal expresa o requerimiento de autoridades judiciales o administrativas competentes.
          </p>
          <p>
            Para la operativa técnica del sitio web y del servicio de correo electrónico, intervienen prestadores de servicios en calidad de encargados del tratamiento:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono-code text-xs">
            <li><strong>Alojamiento web y servidor de correo:</strong> MásBytes (servidores de hosting e infraestructura ubicados en centros de datos dentro de España y el Espacio Económico Europeo).</li>
            <li><strong>Soporte informático y mantenimiento web:</strong> Personal técnico debidamente autorizado bajo estricto deber de secreto y confidencialidad.</li>
          </ul>
        </section>

        {/* 5. TRANSFERENCIAS INTERNACIONALES */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">5.</span> Transferencias Internacionales de Datos
          </h2>
          <p>
            JARNAIBEN S.L. <strong>no realiza transferencias internacionales de datos</strong> en el tratamiento directo de los formularios de contacto ni en el almacenamiento de la información de la web, que se custodia íntegramente en servidores ubicados en el Espacio Económico Europeo (EEE).
          </p>
          <p className="text-xs text-neutral-700">
            No obstante, el sitio web contiene enlaces que dirigen al usuario a plataformas y redes sociales externas (como Instagram / Meta Platforms, Facebook, X o Google Maps). Cuando el usuario decide voluntariamente hacer clic en dichos enlaces y abandonar el sitio de Grafit Café, el tratamiento de sus datos pasa a regirse por las políticas de privacidad y los mecanismos de transferencia internacional propios de dichas corporaciones externas.
          </p>
        </section>

        {/* 6. CONSERVACIÓN DE DATOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">6.</span> Plazo de Conservación
          </h2>
          <p>
            Los datos personales proporcionados se conservarán durante el tiempo imprescindible para gestionar la consulta planteada, tramitar la propuesta de evento solicitada y, en su caso, durante los plazos legales previstos para la prescripción de posibles responsabilidades derivadas del servicio o la atención prestada.
          </p>
        </section>

        {/* 7. DERECHOS DE LOS INTERESADOS */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">7.</span> Derechos de las Personas Interesadas
          </h2>
          <p>
            La normativa de protección de datos reconoce a los usuarios los siguientes derechos sobre su información personal:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs">
            <div className="p-2.5 bg-white border border-black">
              <strong>• Acceso:</strong> Conocer si sus datos están siendo tratados y con qué fines.
            </div>
            <div className="p-2.5 bg-white border border-black">
              <strong>• Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.
            </div>
            <div className="p-2.5 bg-white border border-black">
              <strong>• Supresión («olvido»):</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios.
            </div>
            <div className="p-2.5 bg-white border border-black">
              <strong>• Limitación:</strong> Solicitar la paralización temporal del tratamiento en los casos legalmente previstos.
            </div>
            <div className="p-2.5 bg-white border border-black">
              <strong>• Oposición:</strong> Oponerse a que sus datos sean objeto de tratamiento para determinadas finalidades.
            </div>
            <div className="p-2.5 bg-white border border-black">
              <strong>• Portabilidad:</strong> Recibir los datos facilitados en un formato estructurado y de lectura mecánica.
            </div>
          </div>
          <div className="p-4 bg-neutral-100 border-2 border-black space-y-2 font-mono-code text-xs mt-3">
            <p>
              <strong>Forma de ejercicio:</strong> Para ejercitar estos derechos, puede remitir una solicitud por escrito a <strong>JARNAIBEN S.L.</strong> a través de:
            </p>
            <p>
              • Correo electrónico: <a href="mailto:grafitcafe@grafitcafe.com" className="text-[#b91c1c] underline font-bold">grafitcafe@grafitcafe.com</a> (asunto: «Protección de Datos — Ejercicio de Derechos»).
            </p>
            <p>
              • Correo postal: Calle Urrutia 1, bajo, 48010 Bilbao (Bizkaia).
            </p>
            <p className="text-neutral-600 pt-1 border-t border-neutral-300">
              La solicitud debe incluir nombre, apellidos, fotocopia o documento acreditativo de su identidad y detalle de la petición formulada.
            </p>
          </div>
          <p className="text-xs">
            Asimismo, tiene derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> a través de su sede electrónica (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#b91c1c] underline">www.aepd.es</a>) si considera vulnerados sus derechos.
          </p>
        </section>

        {/* 8. MEDIDAS DE SEGURIDAD */}
        <section className="space-y-3">
          <h2 className="font-anton text-2xl uppercase tracking-wider text-black border-b-2 border-black pb-1 flex items-center gap-2">
            <span className="text-[#b91c1c]">8.</span> Medidas de Seguridad
          </h2>
          <p>
            JARNAIBEN S.L. aplica medidas técnicas y organizativas proporcionadas al riesgo del tratamiento para garantizar la confidencialidad, integridad y disponibilidad de la información personal:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono-code text-xs">
            <li>Cifrado de las comunicaciones mediante protocolo seguro HTTPS / TLS en todo el sitio web.</li>
            <li>Protección antispam y sanitización estricta de las solicitudes enviadas a través de formularios.</li>
            <li>Restricción de acceso a los buzones y bases de datos exclusivamente a personal autorizado.</li>
            <li>Alojamiento en infraestructuras con cortafuegos, copias de seguridad periódicas y monitorización del servidor.</li>
          </ul>
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
          onClick={() => onNavigate('/politica-cookies')}
          className="text-[#b91c1c] hover:underline font-bold cursor-pointer"
        >
          Consultar Política de Cookies &rarr;
        </button>
      </div>
    </div>
  );
};
