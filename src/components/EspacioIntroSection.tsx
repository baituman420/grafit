import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Music2 } from 'lucide-react';

interface EspacioIntroSectionProps {
  onNavigate: (path: string) => void;
}

export const EspacioIntroSection: React.FC<EspacioIntroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#0c0b0a] text-[#f5efe1] border-b-8 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* PHOTO COMPOSITION (5 COLS) */}
          <div className="lg:col-span-5 relative space-y-4">
            {/* MAIN REAL SALON VIEW */}
            <div className="relative border-3 border-[#33302c] bg-black shadow-[8px_8px_0_#000] overflow-hidden aspect-[4/3]">
              <img
                src="./assets/grafit/interior/grafit-salon-mesas-27.jpg"
                alt="Amplitud del Salón Multiusos Grafit"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 border border-black uppercase shadow">
                DISTRIBUCIÓN DIÁFANA
              </div>
            </div>

            {/* SECONDARY POLAROID: VOLKSWAGEN DECORATIVA DEL SALÓN */}
            <div className="relative p-2.5 bg-[#181615] border-2 border-[#e2c044] shadow-[5px_5px_0_#000] flex items-center gap-3">
              <div className="w-20 h-16 bg-black border border-black shrink-0 overflow-hidden">
                <img
                  src="./assets/grafit/instagram/volkswagen.jpg"
                  alt="Volkswagen decorativa del salón"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-mono text-xs">
                <span className="text-[#e2c044] font-bold block uppercase">// EL ICONO DEL SALÓN</span>
                <span className="text-[#b8b0a2] text-[11px] leading-tight block">
                  Media furgoneta Volkswagen clásica instalada como decoración real.
                </span>
              </div>
            </div>
          </div>

          {/* EDITORIAL CONTENT (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e2c044] uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#e2c044] rounded-full" />
              <span>// VENTAJA COMPETITIVA EN INDAUTXU</span>
            </div>

            <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wider text-[#f5efe1] leading-tight">
              Un Salón Multiusos con Amplitud y Carácter
            </h2>

            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
              La mayor ventaja de Grafit no es solo su barra de Indautxu: es su espacioso salón interior. Una estancia independiente, diáfana y con personalidad genuina presidida por la media Volkswagen y el gran mural de concierto.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 bg-[#181615] border border-[#33302c] shadow-[3px_3px_0_#000]">
                <span className="text-[#e2c044] font-bold block mb-1 uppercase">★ VERSATILIDAD MODULAR</span>
                <p className="text-[#b8b0a2] text-[11px] leading-snug">
                  Mesas agrupables para comidas de cuadrilla, formato cóctel para celebraciones de pie o distribución abierta.
                </p>
              </div>

              <div className="p-3 bg-[#181615] border border-[#33302c] shadow-[3px_3px_0_#000]">
                <span className="text-[#b91c1c] font-bold block mb-1 uppercase">★ INDEPENDENCIA DE AMBIENTE</span>
                <p className="text-[#b8b0a2] text-[11px] leading-snug">
                  Tu grupo disfruta a su propio ritmo sin interferir con la vida cotidiana de la barra delantera.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={() => onNavigate('/espacio')}
                className="px-6 py-3 bg-[#f5efe1] hover:bg-white text-black font-['Anton'] text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <span>EXPLORAR EL ESPACIO COMPLETO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/contacto?tipo=evento')}
                className="px-6 py-3 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <span>CONSULTAR DISPONIBILIDAD</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
