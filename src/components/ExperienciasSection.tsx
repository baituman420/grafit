import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Users, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface ExperienciasSectionProps {
  onNavigate: (path: string) => void;
}

export const ExperienciasSection: React.FC<ExperienciasSectionProps> = ({ onNavigate }) => {
  const { eventos } = GRAFIT_DATA;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-black">
      <div className="space-y-4 mb-8">
        <div className="inline-block bg-black text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1">
          // ENCUENTROS & CELEBRACIONES
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
              EVENTOS CON IDENTIDAD EN BILBAO
            </h2>
            <p className="font-sans text-neutral-800 text-sm sm:text-base max-w-2xl mt-1">
              {eventos.subtext}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/eventos')}
            className="px-5 py-2.5 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-base uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>VER TODOS LOS FORMATOS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventos.tipologias.map((tipo) => (
          <div
            key={tipo.id}
            className="bg-[#f4eedd] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden"
          >
            <div className="relative h-44 border-b-2 border-black bg-neutral-900 overflow-hidden">
              <img
                src={tipo.image}
                alt={tipo.title}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
              <span className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono-code text-[10px] px-2 py-0.5 border border-black uppercase font-bold">
                {tipo.badge}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-anton text-xl uppercase tracking-wider text-black">
                  {tipo.title}
                </h3>
                <p className="font-mono-code text-xs text-[#b91c1c] uppercase font-bold mt-0.5">
                  {tipo.subtitle}
                </p>
                <p className="font-sans text-xs text-neutral-700 mt-2 leading-relaxed">
                  {tipo.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate('/eventos')}
                className="w-full py-2 bg-white text-black hover:bg-black hover:text-white border-2 border-black font-mono-code text-xs font-bold uppercase transition-colors"
              >
                MÁS DETALLES →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
