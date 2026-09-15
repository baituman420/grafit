import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowRight } from 'lucide-react';

interface ComerBeberSectionProps {
  onNavigate: (path: string) => void;
}

export const ComerBeberSection: React.FC<ComerBeberSectionProps> = ({ onNavigate }) => {
  const { gastronomia } = GRAFIT_DATA;

  return (
    <section className="py-14 lg:py-24 border-b-8 border-black relative overflow-hidden bg-newsprint/90">
      {/* SECTION HEADER */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-4 border-black">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rubber-stamp text-xs bg-black text-white border-none py-0.5 px-2">
                GASTRONOMÍA & TANQUES
              </span>
              <span className="font-mono-code text-xs font-bold text-[#b91c1c]">
                ★ COCINA ININTERRUMPIDA
              </span>
            </div>
            <h2 className="font-ransom text-5xl sm:text-7xl text-black uppercase tracking-tight">
              COMIDA NON-STOP & CERVEZA
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/carta')}
            className="self-start md:self-auto px-6 py-3.5 bg-[#b91c1c] text-white font-ransom text-2xl uppercase tracking-wider border-4 border-black shadow-[5px_5px_0px_#000000] hover:bg-black transition-all flex items-center gap-2"
          >
            <span>VER CARTA COMPLETA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="font-woodblock text-xl text-neutral-900 max-w-4xl mt-4">
          {gastronomia.description}
        </p>
      </div>

      {/* CONTENT GRID: LEFT REAL POSTER + RIGHT FOOD COLLAGE CARDS */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: OFFICIAL KITCHEN NON-STOP POSTER */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="polaroid-frame rot-neg-3 w-full max-w-md sm:max-w-lg tape-top lg:-ml-4">
              <div className="relative aspect-[3/4] bg-black overflow-hidden border-3 border-black">
                <img
                  src={gastronomia.posterSrc}
                  alt="Cartel Cocina Non-Stop Grafit"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-[#b91c1c] text-white font-ransom text-base px-3 py-1 border-2 border-black shadow-md">
                  HASTA LAS 23:30H
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between font-typewriter text-xs font-bold text-neutral-900">
                <span>Cartel Oficial del Bar</span>
                <span className="rubber-stamp text-[10px] py-0.5 px-1.5 bg-[#e2c044] text-black border-none">
                  KITCHEN NON STOP
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: FEATURED DISHES & BEER CUTOUT CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {gastronomia.featuredDishes.map((dish, idx) => {
              const rotationClass = idx % 2 === 0 ? 'rot-pos-2' : 'rot-neg-2';
              const offsetClass = idx === 1 ? 'sm:translate-y-6' : idx === 2 ? 'sm:-translate-y-4' : '';
              return (
                <div
                  key={dish.id}
                  className={`bg-[#fdfbf7] border-4 border-black p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all hover:-translate-y-2 hover:shadow-[9px_9px_0px_#b91c1c] ${rotationClass} ${offsetClass}`}
                >
                  <div>
                    {/* PHOTO CUTOUT */}
                    {dish.image && (
                      <div className="relative aspect-[4/3] bg-black overflow-hidden border-2 border-black mb-4">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {dish.badge && (
                          <span className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono-code font-bold text-xs px-2.5 py-0.5 border border-black uppercase shadow-sm">
                            {dish.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {/* DISH HEADER */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-ransom text-2xl text-black uppercase leading-tight">
                        {dish.name}
                      </h3>
                      <span className="font-ransom text-xl text-[#b91c1c] shrink-0 bg-[#ebe5d8] px-2.5 py-0.5 border-2 border-black">
                        {dish.price}
                      </span>
                    </div>

                    <p className="font-typewriter text-xs text-neutral-800 leading-relaxed mb-4">
                      {dish.description}
                    </p>
                  </div>

                  {/* BOTTOM ACTION */}
                  <div className="pt-3 border-t-2 border-dashed border-black/30 flex items-center justify-between">
                    <span className="font-mono-code text-[11px] text-neutral-700 font-bold uppercase">
                      CAT: {dish.category}
                    </span>
                    <button 
                      onClick={() => onNavigate('/carta')}
                      className="font-mono-code text-xs font-bold text-black hover:text-[#b91c1c] underline"
                    >
                      Ver en carta &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
