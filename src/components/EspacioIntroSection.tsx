import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EspacioIntroSectionProps {
  onNavigate: (path: string) => void;
}

export const EspacioIntroSection: React.FC<EspacioIntroSectionProps> = ({ onNavigate }) => {
  const { espacio } = GRAFIT_DATA;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-black">
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* TEXTO */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1">
              // EL SALÓN MULTIUSOS DE INDAUTXU
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
              UN ESPACIO AMPLIO, VERSÁTIL Y CON PERSONALIDAD
            </h2>
            <p className="font-sans text-neutral-800 text-base sm:text-lg leading-relaxed">
              El corazón de las celebraciones en Grafit es su amplio salón interior. Con la auténtica furgoneta Volkswagen presidiendo la estancia, paredes de ladrillo visto y mesas configurables, dispones de la amplitud necesaria para que tu grupo disfrute a su propio ritmo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono-code text-xs">
              <div className="p-3 bg-[#f4eedd] border-2 border-black">
                <span className="font-bold text-black uppercase block mb-1">Configuración a Medida</span>
                Formatos de pie, cóctel o mesas corridas para comidas y cenas.
              </div>
              <div className="p-3 bg-[#f4eedd] border-2 border-black">
                <span className="font-bold text-black uppercase block mb-1">Identidad Visual</span>
                La furgoneta Volkswagen y murales de vinilos para un ambiente único.
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/espacio')}
                className="px-6 py-3 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-base uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
              >
                <span>VER TODOS LOS DETALLES DEL SALÓN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/contacto')}
                className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-base uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
              >
                <span>CONSULTAR DISPONIBILIDAD</span>
              </button>
            </div>
          </div>

          {/* FOTO DESTACADA FURGONETA */}
          <div className="lg:col-span-5">
            <div className="border-4 border-black shadow-[6px_6px_0px_#b91c1c] bg-black overflow-hidden relative">
              <img
                src={espacio.furgoneta.image}
                alt="Furgoneta Volkswagen en el salón de Grafit"
                className="w-full h-80 sm:h-96 object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/85 text-white p-3 font-mono-code text-xs">
                <span className="text-[#b91c1c] font-bold uppercase block">// ICONO EXCLUSIVO</span>
                La icónica Volkswagen roja y blanca en nuestro salón multiusos.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
