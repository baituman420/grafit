import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowLeft, Calendar, Music, Clock } from 'lucide-react';

interface AgendaPageProps {
  onNavigate: (path: string) => void;
}

export const AgendaPage: React.FC<AgendaPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <button
        onClick={() => onNavigate('/')}
        className="mb-6 px-4 py-2 bg-black text-white font-mono-code text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A LA HOME</span>
      </button>

      <div className="p-6 sm:p-8 bg-[#f4eedd] border-3 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] tape-top mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
            MÚSICA EN DIRECTO
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-800">
            // SALA DE CONCIERTOS GRAFIT
          </span>
        </div>
        
        <h1 className="font-anton text-4xl sm:text-6xl text-black uppercase">
          AGENDA DE CONCIERTOS
        </h1>
        <p className="font-syne text-lg font-bold text-neutral-800 max-w-2xl mt-2">
          Actuaciones en directo, acústicos, bandas locales y sesiones de vinilo.
        </p>
      </div>

      <div className="space-y-6">
        {GRAFIT_DATA.agenda.eventsList.map((evt) => (
          <div key={evt.id} className="p-6 bg-[#e5dfd0] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-64 aspect-[16/10] bg-black border border-black overflow-hidden shrink-0">
              <img src={evt.image} alt={evt.artist} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-mono-code text-xs text-[#b91c1c] font-bold">
                {evt.dateDay} {evt.dateMonth} • {evt.time} • {evt.entry}
              </div>
              <h2 className="font-anton text-3xl text-black uppercase">{evt.artist}</h2>
              <p className="font-sans text-sm text-neutral-800">{evt.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
