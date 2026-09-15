import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Phone, ArrowRight } from 'lucide-react';

interface GruposSectionProps {
  onNavigate: (path: string) => void;
}

export const GruposSection: React.FC<GruposSectionProps> = ({ onNavigate }) => {
  const { grupos } = GRAFIT_DATA;

  return (
    <section className="py-14 lg:py-20 border-b-8 border-black relative">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        
        <div className="bg-[#fdfbf7] border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT TEXT & DETAILS */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
                    CUADRILLAS & CELEBRACIONES
                  </span>
                  <span className="font-mono-code text-xs font-bold text-neutral-800">
                    // INDAUTXU BILBAO
                  </span>
                </div>
                <h2 className="font-ransom text-4xl sm:text-6xl text-black uppercase leading-tight">
                  {grupos.headline}
                </h2>
              </div>

              <p className="font-woodblock text-xl text-neutral-900">
                {grupos.description}
              </p>

              {/* FEATURES CHECKLIST */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grupos.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[#ebe5d8] p-3 border-2 border-black font-mono-code text-xs font-bold">
                    <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-ransom text-sm shrink-0">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  onClick={() => onNavigate('/grupos')}
                  className="px-7 py-4 bg-black text-white font-ransom text-2xl uppercase tracking-wider border-4 border-black shadow-[5px_5px_0px_#b91c1c] hover:bg-[#b91c1c] transition-all flex items-center gap-3"
                >
                  <span>RESERVAR ESPACIO PARA GRUPO</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={`tel:${GRAFIT_DATA.info.phone}`}
                  className="px-5 py-4 bg-[#e2c044] text-black font-mono-code text-xs font-bold border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{GRAFIT_DATA.info.phone}</span>
                </a>
              </div>
            </div>

            {/* RIGHT PHOTO */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="polaroid-frame rot-pos-3 w-full max-w-md tape-top">
                <div className="relative aspect-[4/3] bg-black overflow-hidden border-3 border-black">
                  <img
                    src={grupos.photo}
                    alt="Celebración en Grafit"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white font-mono-code text-xs px-2.5 py-0.5 border border-white">
                    REAL CELEBRATION
                  </div>
                </div>
                <p className="mt-2.5 font-typewriter text-xs font-bold text-center text-neutral-900">
                  Cuadrillas festejando en Grafit
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
