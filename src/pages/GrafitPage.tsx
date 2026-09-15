import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowLeft, History } from 'lucide-react';

interface GrafitPageProps {
  onNavigate: (path: string) => void;
}

export const GrafitPage: React.FC<GrafitPageProps> = ({ onNavigate }) => {
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
            CONOCE EL GRAFIT
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-800">
            // HISTORIA DESDE 2017
          </span>
        </div>
        
        <h1 className="font-anton text-4xl sm:text-6xl text-black uppercase">
          EL PROYECTO GRAFIT
        </h1>
        <p className="font-syne text-lg font-bold text-neutral-800 max-w-2xl mt-2">
          Un refugio para los amantes de la buena música, la cerveza de tanque y el ambiente de barrio en Indautxu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="polaroid-frame rot-neg-1">
          <img src={GRAFIT_DATA.historia.inaugurationPhoto} alt="Inauguración Grafit" className="w-full aspect-[4/3] object-cover border border-black" />
          <p className="mt-2 font-courier text-xs font-bold text-center">Inauguración Oficial (2017)</p>
        </div>
        <div className="polaroid-frame rot-pos-1">
          <img src={GRAFIT_DATA.historia.muralPhoto} alt="Mural Grafit" className="w-full aspect-[4/3] object-cover border border-black" />
          <p className="mt-2 font-courier text-xs font-bold text-center">Mural de Vinilos y Recuerdos</p>
        </div>
      </div>
    </div>
  );
};
