import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowRight } from 'lucide-react';

interface HistoriaSectionProps {
  onNavigate: (path: string) => void;
}

export const HistoriaSection: React.FC<HistoriaSectionProps> = ({ onNavigate }) => {
  const { historia } = GRAFIT_DATA;

  return (
    <section className="py-14 lg:py-24 border-b-8 border-black relative overflow-hidden bg-newsprint/80">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 pb-4 border-b-4 border-black gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rubber-stamp text-xs bg-black text-white border-none py-0.5 px-2">
                ARCHIVO & IDENTIDAD
              </span>
              <span className="font-mono-code text-xs font-bold text-neutral-800">
                // INDAUTXU EST. 2017
              </span>
            </div>
            <h2 className="font-ransom text-5xl sm:text-7xl text-black uppercase tracking-tight">
              NUESTRA HISTORIA
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/grafit')}
            className="px-6 py-3 bg-[#fdfbf7] text-black font-ransom text-2xl uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            <span>CONOCE EL GRAFIT</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* HISTORIA MAIN GRID - FLUID & ASYMMETRICAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: HISTORIC ARCHIVE POLAROIDS COLLAGE */}
          <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
            
            {/* INAUGURATION 2017 MAIN PANORAMIC */}
            <div className="w-full max-w-xl polaroid-frame rot-neg-3 z-10 tape-top lg:-ml-6">
              <div className="relative aspect-[16/9] bg-black overflow-hidden border-3 border-black">
                <img
                  src={historia.inaugurationPhoto}
                  alt="Inauguración Grafit Café 2017"
                  className="w-full h-full object-cover contrast-110"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-black text-white font-mono-code text-xs font-bold px-2.5 py-0.5 border border-white">
                  ARCHIVAL PHOTO • MAYO 2017
                </div>
              </div>
              <p className="mt-2.5 font-typewriter text-xs font-bold text-center text-neutral-900">
                Fotografía original de la inauguración del bar (2017)
              </p>
            </div>

            {/* OVERLAPPING MURAL DETAIL PHOTO */}
            <div className="absolute -bottom-6 right-2 sm:right-4 w-56 sm:w-68 polaroid-frame rot-pos-4 z-20 hidden sm:block tape-corner-right">
              <div className="relative aspect-[4/3] bg-black overflow-hidden border-2 border-black">
                <img
                  src={historia.muralPhoto}
                  alt="Mural Musical Grafit"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-1.5 font-typewriter text-xs font-bold text-center text-neutral-900">
                Mural de Discos en Pared
              </p>
            </div>

          </div>

          {/* RIGHT: MANIFESTO & IDENTITY TEXT */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            
            {/* MANIFESTO QUOTE BOX */}
            <div className="p-8 bg-[#fdfbf7] border-4 border-black shadow-[8px_8px_0px_#b91c1c] tape-corner-left">
              <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none mb-3">
                EL MANIFIESTO
              </span>
              <p className="font-woodblock text-2xl sm:text-3xl text-black leading-snug">
                {historia.quote}
              </p>
            </div>

            {/* BULLET POINTS */}
            <div className="space-y-4 font-typewriter text-sm text-neutral-900">
              {historia.manifesto.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#ebe5d8] border-2 border-black/40 shadow-sm">
                  <span className="font-mono-code font-bold text-[#b91c1c] text-xl shrink-0">
                    // 0{idx + 1}
                  </span>
                  <p className="leading-relaxed font-bold">{item}</p>
                </div>
              ))}
            </div>

            {/* BADGES FOOTER */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono-code text-xs font-bold">
              <span className="bg-black text-white px-4 py-1.5 border-2 border-black">
                📍 URRUTIA KALEA 1
              </span>
              <span className="bg-[#e2c044] text-black px-4 py-1.5 border-2 border-black">
                🎸 100% ESPÍRITU ROCK
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
