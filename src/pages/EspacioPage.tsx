import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Sparkles, MapPin, CheckCircle, ArrowRight, Info, Coffee, Users } from 'lucide-react';

interface EspacioPageProps {
  onNavigate: (path: string) => void;
}

export const EspacioPage: React.FC<EspacioPageProps> = ({ onNavigate }) => {
  const { espacio, historiaProgression } = GRAFIT_DATA;
  const historySnippet = historiaProgression[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-16">
      {/* HEADER PAGE */}
      <div className="text-center md:text-left space-y-4">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1 border border-black">
          // ARQUITECTURA, AMBIENTES Y PERSONALIDAD
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          {espacio.headline}
        </h1>
        <p className="font-sans text-neutral-800 text-base sm:text-lg max-w-3xl leading-relaxed">
          {espacio.subtext}
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-6 py-3 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>RESERVAR ZONA PARA MI GRUPO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/eventos')}
            className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>VER FORMATOS DE EVENTOS</span>
          </button>
        </div>
      </div>

      {/* ELEMENTO ICÓNICO: LA FURGONETA VOLKSWAGEN */}
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-black text-white px-3 py-0.5 font-mono-code text-xs uppercase tracking-wider">
              // ICONO DEL SALÓN
            </div>
            <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
              {espacio.furgoneta.title}
            </h2>
            <p className="font-sans text-neutral-800 text-base sm:text-lg leading-relaxed">
              {espacio.furgoneta.description}
            </p>
            <div className="p-4 bg-[#f4eedd] border-2 border-black font-mono-code text-xs text-neutral-800 space-y-1">
              <span className="font-bold text-black uppercase block">// FOTOCALL NATURAL & ESPÍRITU VIAJERO</span>
              Integrada en la arquitectura del salón, la furgoneta se convierte en el telón de fondo imprescindible para las fotografías de grupo de cualquier celebración o encuentro de empresa.
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-4 border-black shadow-[6px_6px_0px_#b91c1c] bg-black overflow-hidden relative group">
              <img
                src={espacio.furgoneta.image}
                alt={espacio.furgoneta.title}
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-2 text-center font-mono-code text-xs">
                Furgoneta Volkswagen T2 en el salón multiusos de Grafit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOS AMBIENTES INTEGRADOS */}
      <div className="space-y-6">
        <div className="border-b-4 border-black pb-3">
          <div className="font-mono-code text-xs font-bold text-neutral-600 uppercase tracking-widest">
            // DOS AMBIENTES DIFERENCIADOS
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
            LA BARRA Y EL GRAN SALÓN
          </h2>
          <p className="font-sans text-neutral-700 text-sm sm:text-base mt-1">
            Dos zonas conectadas con ritmos propios para acoger tanto la visita espontánea como el evento planificado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {espacio.ambientes.map((amb) => (
            <div
              key={amb.id}
              className="bg-[#f4eedd] border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {amb.id === 'ambiente-barra' ? (
                    <Coffee className="w-5 h-5 text-[#b91c1c]" />
                  ) : (
                    <Users className="w-5 h-5 text-[#b91c1c]" />
                  )}
                  <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                    {amb.title}
                  </h3>
                </div>

                <div className="inline-block bg-black text-white font-mono-code text-xs px-2.5 py-0.5 border border-black uppercase">
                  {amb.vibe}
                </div>

                <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                  {amb.description}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black/20 font-mono-code text-xs text-neutral-600">
                {amb.id === 'ambiente-barra'
                  ? 'Abierto ininterrumpidamente desde primera hora con servicio de barra y mesas altas.'
                  : 'Modular y adaptable. Posibilidad de reserva en exclusividad o por zonas.'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GALERÍA REAL DE FOTOGRAFÍAS */}
      <div className="space-y-6">
        <div className="border-b-4 border-black pb-3">
          <div className="font-mono-code text-xs font-bold text-neutral-600 uppercase tracking-widest">
            // FOTOGRAFÍAS REALES DEL ESPACIO
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
            EL ESPACIO EN DETALLE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {espacio.gallery.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-3 border-black p-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] flex flex-col space-y-2"
            >
              <div className="relative h-48 bg-neutral-900 border-2 border-black overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <p className="font-mono-code text-xs text-neutral-800 leading-tight">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TRANSPARENCIA & DATOS POR CONFIRMAR */}
      <div className="p-6 bg-neutral-100 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-[#b91c1c]" />
          <h3 className="font-anton text-xl uppercase tracking-wider text-black">
            ADAPTABILIDAD Y DISTRIBUCIONES SEGÚN GRUPO
          </h3>
        </div>
        <p className="font-sans text-sm text-neutral-800 leading-relaxed">
          Cada evento tiene requerimientos propios. En lugar de ofrecer capacidades fijas impersonales, analizamos tu necesidad concreta (formato cóctel con mesas de apoyo, banquete sentado, presentaciones o picoteo dinámico) para recomendarte la configuración más cómoda y fluida.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono-code text-xs">
          <div className="p-3 bg-white border-2 border-black">
            <span className="font-bold text-black block mb-1">Distribución Flexible</span>
            Mesas reagrupables para cuadrillas de cualquier dimensión habitual.
          </div>
          <div className="p-3 bg-white border-2 border-black">
            <span className="font-bold text-black block mb-1">Apoyo Audiovisual</span>
            Consultar con antelación si requieres proyección o ambientación musical específica.
          </div>
          <div className="p-3 bg-white border-2 border-black">
            <span className="font-bold text-black block mb-1">Reserva y Condiciones</span>
            Atención directa para asegurar tu fecha sin intermediarios.
          </div>
        </div>
      </div>

      {/* SNIPPET DE IDENTIDAD */}
      {historySnippet && (
        <div className="p-6 bg-[#f4eedd] border-3 border-black tape-top space-y-2">
          <div className="font-mono-code text-xs font-bold text-neutral-600 uppercase">
            // {historySnippet.context}
          </div>
          <h4 className="font-anton text-xl uppercase tracking-wider text-black">
            {historySnippet.title}
          </h4>
          <blockquote className="font-serif italic text-sm text-neutral-800">
            «{historySnippet.quote}»
          </blockquote>
        </div>
      )}

      {/* CIERRE COMERCIAL */}
      <div className="p-8 bg-black text-white border-4 border-black shadow-[8px_8px_0px_#b91c1c] text-center space-y-4">
        <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-white">
          ¿QUIERES VISITAR EL SALÓN O CONSULTAR UNA FECHA?
        </h2>
        <p className="font-sans text-neutral-300 text-base max-w-2xl mx-auto">
          Pásate por Urrutia Kalea 1 o escríbenos a través del formulario de contacto para reservar el espacio.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-8 py-3.5 bg-[#b91c1c] text-white hover:bg-white hover:text-black border-2 border-white font-anton text-xl uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <span>SOLICITAR RESERVA DEL ESPACIO</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
