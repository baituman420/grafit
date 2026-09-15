import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Clock, ArrowRight } from 'lucide-react';

interface AgendaSectionProps {
  onNavigate: (path: string) => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ onNavigate }) => {
  const { agenda } = GRAFIT_DATA;

  return (
    <section className="py-14 lg:py-24 border-b-8 border-black relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* BACKGROUND GRAPHIC TEXTURE */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none overflow-hidden">
        <div className="font-ransom text-[26vw] text-white tracking-tighter leading-none transform rotate-12 -translate-y-1/4">
          LIVE ROCK
        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b-4 border-neutral-700 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
                MÚSICA EN DIRECTO
              </span>
              <span className="font-mono-code text-xs font-bold text-[#e2c044]">
                ★ ENTRAMOS EN ESCENA
              </span>
            </div>
            <h2 className="font-ransom text-5xl sm:text-7xl text-white uppercase tracking-tight">
              CONCIERTOS & AGENDA
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/agenda')}
            className="self-start md:self-auto px-6 py-3.5 bg-[#e2c044] text-black font-ransom text-2xl uppercase tracking-wider border-4 border-white shadow-[5px_5px_0px_#b91c1c] hover:bg-white transition-all flex items-center gap-2"
          >
            <span>VER AGENDA COMPLETA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* EVENTS FLYER LIST / COLLAGE - WIDE SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {agenda.eventsList.map((evt, idx) => {
            const rotationClass = idx % 2 === 0 ? 'rot-neg-2' : 'rot-pos-2';
            const offsetClass = idx === 1 ? 'lg:translate-y-6' : idx === 2 ? 'lg:-translate-y-4' : '';
            return (
              <div
                key={evt.id}
                className={`bg-[#ebe5d8] text-black border-4 border-black p-6 shadow-[8px_8px_0px_#b91c1c] relative flex flex-col justify-between transition-transform hover:-translate-y-2 ${rotationClass} ${offsetClass}`}
              >
                {/* TAPE CORNER */}
                <div className="absolute -top-3 -right-3 w-20 h-7 bg-[#e0d9c3]/90 border border-black/30 shadow-sm transform rotate-12 z-20" />

                <div>
                  {/* REAL PHOTO POSTER */}
                  <div className="relative aspect-[16/10] bg-black overflow-hidden border-3 border-black mb-5">
                    <img
                      src={evt.image}
                      alt={evt.artist}
                      className="w-full h-full object-cover grayscale brightness-110 contrast-125 hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />

                    {/* DATE BADGE */}
                    <div className="absolute top-2 left-2 bg-black text-white p-2.5 border-2 border-white text-center font-ransom leading-none">
                      <span className="block text-3xl text-[#e2c044]">{evt.dateDay}</span>
                      <span className="block text-xs text-white">{evt.dateMonth}</span>
                    </div>

                    {/* RUBBER STAMP ON PHOTO */}
                    {evt.stampText && (
                      <div className="absolute bottom-2 right-2">
                        <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2 transform -rotate-6">
                          {evt.stampText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ARTIST & GENRE */}
                  <h3 className="font-ransom text-4xl text-black uppercase leading-none mb-1.5">
                    {evt.artist}
                  </h3>

                  <p className="font-mono-code font-bold text-xs text-[#b91c1c] uppercase tracking-wider mb-4">
                    // {evt.genre}
                  </p>

                  <p className="font-typewriter text-xs text-neutral-800 leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                {/* EVENT FOOTER DETAILS */}
                <div className="pt-4 border-t-2 border-dashed border-black/40 flex items-center justify-between font-mono-code text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-black">
                    <Clock className="w-4 h-4 text-[#b91c1c]" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="bg-black text-white font-bold px-3 py-1 border border-black">
                    {evt.entry}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT / ORGANIZA TU CONCIERTO */}
        <div className="mt-16 p-8 bg-[#fdfbf7] text-black border-4 border-black shadow-[8px_8px_0px_#e2c044] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-ransom text-3xl border-3 border-black shrink-0">
              ⚡
            </div>
            <div>
              <h4 className="font-ransom text-2xl md:text-3xl uppercase">¿TIENES UNA BANDA O QUIERES ORGANIZAR UN EVENTO?</h4>
              <p className="font-typewriter text-xs md:text-sm text-neutral-800">Ofrecemos nuestro escenario y equipo de sonido en Indautxu para grupos locales.</p>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('/grupos')}
            className="px-6 py-3.5 bg-black text-white font-ransom text-2xl uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors shrink-0"
          >
            CONTACTAR CON EL BAR
          </button>
        </div>

      </div>
    </section>
  );
};
