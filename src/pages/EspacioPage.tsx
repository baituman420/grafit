import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { InteractiveDraggableGallery } from '../components/InteractiveDraggableGallery';
import { ArrowRight, MapPin, Sparkles, CheckCircle2, Music2, Users, Coffee } from 'lucide-react';

interface EspacioPageProps {
  onNavigate: (path: string) => void;
}

export const EspacioPage: React.FC<EspacioPageProps> = ({ onNavigate }) => {
  const { espacio } = GRAFIT_DATA;

  return (
    <div className="w-full bg-[#0c0b0a] text-[#f5efe1] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 space-y-16 max-w-6xl mx-auto">
      {/* 1. HEADER PAGE */}
      <div className="space-y-4">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0_#000]">
          // ARQUITECTURA, SALÓN & MEMORIA ROCK
        </div>
        <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-wider text-[#f5efe1] leading-tight">
          Descubre el Espacio de Grafit
        </h1>
        <p className="font-['Space_Grotesk'] text-base sm:text-lg text-[#ded8cb] max-w-3xl leading-relaxed">
          Un establecimiento singular en Indautxu donde conviven el dinamismo de la barra tradicional con la versatilidad de un amplio salón multiusos decorado con historia musical y la icónica media furgoneta Volkswagen.
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-6 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>RESERVAR ZONA PARA MI GRUPO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/eventos')}
            className="px-6 py-3.5 bg-[#181615] hover:bg-[#222] text-[#e2c044] font-mono text-xs font-bold uppercase border border-[#e2c044] shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>VER FORMATOS DE CELEBRACIONES</span>
          </button>
        </div>
      </div>

      {/* 2. THE VOLKSWAGEN DECORATIVE HIGHLIGHT */}
      <div className="bg-[#181615] border-3 border-[#e2c044] p-6 sm:p-10 shadow-[10px_10px_0_#000]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-black text-[#e2c044] px-3 py-1 font-mono text-xs uppercase tracking-wider border border-[#e2c044]">
              // EL ICONO DEL SALÓN
            </div>
            <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
              La Furgoneta Volkswagen Roja y Blanca
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
              Instalada como elemento arquitectónico y decorativo en el salón, la media Volkswagen clásica es el símbolo indiscutible de Grafit. Un homenaje al espíritu libre de la carretera y el telón de fondo de miles de fotografías de grupos y celebraciones en Bilbao.
            </p>
            <div className="p-4 bg-[#121110] border border-[#33302c] font-mono text-xs text-[#b8b0a2] space-y-1">
              <span className="text-[#e2c044] font-bold uppercase block">// PHOTOCALL NATURAL & ENCUENTRO</span>
              No es una maqueta ligera: es una estructura real integrada que aporta calidez, nostalgia y personalidad inconfundible al salón de celebraciones.
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border-3 border-[#33302c] bg-black shadow-[6px_6px_0_#000] overflow-hidden aspect-[4/3] group">
              <img
                src="./assets/grafit/instagram/volkswagen.jpg"
                alt="Volkswagen decorativa del salón Grafit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/85 text-[#f5efe1] p-2 text-center font-mono text-[11px] border-t border-[#33302c]">
                Volkswagen T1 clásica en el salón multiusos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PALMER-INSPIRED DRAGGABLE GALLERY */}
      <div className="space-y-4">
        <div className="border-b-2 border-[#33302c] pb-3">
          <div className="font-mono text-xs font-bold text-[#e2c044] uppercase tracking-widest">
            // GALERÍA INTERACTIVA
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
            Explora Cada Rincón de Grafit
          </h2>
          <p className="font-['Space_Grotesk'] text-sm text-[#b8b0a2] mt-1">
            Desliza libremente por la colección fotográfica del local: arquitectura, detalles de barra, colección de vinilos y archivo histórico.
          </p>
        </div>

        <InteractiveDraggableGallery />
      </div>

      {/* 4. HISTORIA INTEGRADA (EVOLUCIÓN ROCK INTERGENERACIONAL) */}
      <div className="p-8 sm:p-10 bg-[#141312] border-3 border-[#33302c] shadow-[8px_8px_0_#000] space-y-6">
        <div className="flex items-center gap-2 text-[#b91c1c] font-mono text-xs uppercase tracking-widest">
          <Music2 className="w-4 h-4" />
          <span>// EVOLUCIÓN HISTÓRICA & CULTURA ROCK</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
              Una Identidad que se Adapta sin Perder su Raíz
            0</h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
              Al igual que las bandas icónicas del rock británico y clásico han evolucionado a lo largo de décadas sin perder su pulso, Grafit ha transitado desde sus orígenes vinculados a la cultura musical analógica y los directos de barrio hasta convertirse en el referente actual de encuentros y gastronomía de grupo en Indautxu.
            </p>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] leading-relaxed">
              Consolidado hoy como un espacio gastronómico continuo y sala de celebraciones privadas, el espíritu rockero sigue vivo en cada vinilo de sus paredes, en su barra vibrante los días de partido del Athletic y en la atmósfera desenfadada de su salón.
            </p>
          </div>

          <div className="md:col-span-4 p-4 bg-[#1e1c1a] border-2 border-[#b91c1c] shadow-[4px_4px_0_#000] space-y-3 font-mono text-xs">
            <span className="text-[#e2c044] font-bold uppercase block">// COMPROMISO CON LA TRANSPARENCIA</span>
            <p className="text-[#b8b0a2] leading-relaxed">
              Las fotografías de actuaciones en directo recogidas en nuestro archivo pertenecen a épocas musicales anteriores. <strong>Actualmente, Grafit no dispone de programación de conciertos en directo</strong>, centrando su actividad en comidas de grupo, celebraciones y servicio ininterrumpido de cocina.
            </p>
          </div>
        </div>
      </div>

      {/* 5. CIERRE COMERCIAL & VISITAS */}
      <div className="p-8 sm:p-10 bg-[#181615] border-4 border-[#b91c1c] shadow-[10px_10px_0_#000] text-center space-y-4">
        <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
          ¿Quieres Conocer el Salón en Persona o Consultar Disponibilidad?
        </h2>
        <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] max-w-2xl mx-auto leading-relaxed">
          Pásate por Urrutia Kalea 1 (a 3 minutos de la boca de metro de Indautxu) o envíanos una solicitud a través del formulario indicando fecha y número de asistentes.
        </p>

        <div className="pt-3 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-8 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>SOLICITAR DISPONIBILIDAD DEL SALÓN</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
