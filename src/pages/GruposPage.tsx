import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowLeft, Users, Phone } from 'lucide-react';

interface GruposPageProps {
  onNavigate: (path: string) => void;
}

export const GruposPage: React.FC<GruposPageProps> = ({ onNavigate }) => {
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
            CUADRILLAS & GRUPOS
          </span>
        </div>
        
        <h1 className="font-anton text-4xl sm:text-6xl text-black uppercase">
          RESERVAS DE GRUPO
        </h1>
        <p className="font-syne text-lg font-bold text-neutral-800 max-w-2xl mt-2">
          Organiza tu cena de cuadrilla, cumpleaños o evento especial en Grafit Indautxu.
        </p>
      </div>

      <div className="p-8 bg-[#e5dfd0] border-3 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto text-center space-y-4">
        <h2 className="font-anton text-2xl uppercase">LLÁMANOS DIRECTAMENTE</h2>
        <p className="font-sans text-sm text-neutral-800">Para reservas de más de 6 personas o menús personalizados:</p>
        <a
          href={`tel:${GRAFIT_DATA.info.phone}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-anton text-2xl border-2 border-black shadow-[4px_4px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors"
        >
          <Phone className="w-6 h-6 text-[#d97706]" />
          <span>{GRAFIT_DATA.info.phone}</span>
        </a>
      </div>
    </div>
  );
};
