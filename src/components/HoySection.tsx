import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Utensils, Tv, Disc, Coffee } from 'lucide-react';

export const HoySection: React.FC = () => {
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'comida': return <Utensils className="w-4 h-4 text-[#b91c1c]" />;
      case 'deporte': return <Tv className="w-4 h-4 text-[#e2c044]" />;
      case 'musica': return <Disc className="w-4 h-4 text-black" />;
      default: return <Coffee className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <section className="py-14 lg:py-20 border-b-8 border-black relative bg-[#ebe5d8]/80">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-4 border-b-4 border-black gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
                LA PIZARRA DEL DÍA
              </span>
              <span className="font-mono-code text-xs font-bold text-neutral-800">
                // ACTUALIZADO HOY
              </span>
            </div>
            <h2 className="font-ransom text-5xl sm:text-7xl text-black uppercase tracking-tight">
              HOY EN GRAFIT
            </h2>
          </div>

          <div className="font-typewriter text-xs sm:text-sm font-bold bg-[#fdfbf7] border-3 border-black p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] rot-pos-1">
            📍 Urrutia Kalea 1 • Indautxu, Bilbao
          </div>
        </div>

        {/* ASYMMETRICAL JUSTIFIED BULLETIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GRAFIT_DATA.hoy.map((item, idx) => {
            const rotationClass = idx % 2 === 0 ? 'rot-neg-2' : 'rot-pos-2';
            const offsetClass = idx === 1 ? 'lg:translate-y-4' : idx === 3 ? 'lg:-translate-y-2' : '';
            return (
              <div
                key={item.id}
                className={`bg-[#fdfbf7] border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative transition-all hover:-translate-y-2 hover:shadow-[9px_9px_0px_#b91c1c] ${rotationClass} ${offsetClass}`}
              >
                {/* TAPE STRIP */}
                <div className="absolute -top-3 left-6 w-20 h-6 bg-[#e2dac4]/90 border-x border-black/20 shadow-sm transform -rotate-2 z-10" />

                <div>
                  {/* TAG & PRICE */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-mono-code font-bold text-xs bg-black text-white px-2.5 py-0.5 border border-black uppercase tracking-wider">
                      {getCategoryIcon(item.type)}
                      <span>{item.tag}</span>
                    </span>

                    {item.price && (
                      <span className="font-ransom text-xl text-[#b91c1c] bg-[#ebe5d8] px-2.5 py-0.5 border-2 border-black">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3 className="font-woodblock text-2xl text-black leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* TIME */}
                  {item.time && (
                    <div className="font-mono-code text-xs text-[#b91c1c] font-bold mb-3">
                      ⏰ {item.time}
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <p className="font-typewriter text-xs text-neutral-800 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM STAMP */}
                <div className="mt-6 pt-3 border-t-2 border-dashed border-black/30 flex items-center justify-between">
                  <span className="font-typewriter text-[11px] font-bold text-neutral-600">
                    GRAFIT #0{idx + 1}
                  </span>
                  <span className="rubber-stamp text-[10px] py-0.5 px-1.5 bg-black text-white border-none">
                    ACTIVO
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
