import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ArrowLeft, Utensils, Clock, Phone } from 'lucide-react';

interface CartaPageProps {
  onNavigate: (path: string) => void;
}

export const CartaPage: React.FC<CartaPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* NAVIGATION BACK */}
      <button
        onClick={() => onNavigate('/')}
        className="mb-6 px-4 py-2 bg-black text-white font-mono-code text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A LA HOME</span>
      </button>

      {/* HEADER */}
      <div className="p-6 sm:p-8 bg-[#f4eedd] border-3 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] tape-top mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
            GASTRONOMÍA GRAFIT
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-800">
            // COCINA ININTERRUMPIDA 12:00 - 23:30
          </span>
        </div>
        
        <h1 className="font-anton text-4xl sm:text-6xl text-black uppercase">
          CARTA & BEBIDAS
        </h1>
        <p className="font-syne text-lg font-bold text-neutral-800 max-w-2xl mt-2">
          Hamburguesas 100% buey, pintxos clásicos de barra, desayunos recién hechos y tanques de cerveza helada.
        </p>
      </div>

      {/* CARTA CONTENT PLACEHOLDER / SHELL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-[#e5dfd0] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)]">
          <h2 className="font-anton text-2xl text-black uppercase mb-4 border-b-2 border-black pb-2">
            🍔 HAMBURGUESAS & PLATOS
          </h2>
          <div className="space-y-4 font-mono-code text-xs">
            {GRAFIT_DATA.gastronomia.featuredDishes.filter(d => d.category === 'burger' || d.category === 'plato').map(d => (
              <div key={d.id} className="p-3 bg-[#f4eedd] border border-black">
                <div className="flex justify-between font-bold text-sm text-black mb-1">
                  <span>{d.name}</span>
                  <span className="text-[#b91c1c]">{d.price}</span>
                </div>
                <p className="font-sans text-xs text-neutral-700">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#e5dfd0] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)]">
          <h2 className="font-anton text-2xl text-black uppercase mb-4 border-b-2 border-black pb-2">
            🍺 TANQUES & PINTXOS
          </h2>
          <div className="space-y-4 font-mono-code text-xs">
            {GRAFIT_DATA.gastronomia.featuredDishes.filter(d => d.category === 'pintxo' || d.category === 'cerveza' || d.category === 'desayuno').map(d => (
              <div key={d.id} className="p-3 bg-[#f4eedd] border border-black">
                <div className="flex justify-between font-bold text-sm text-black mb-1">
                  <span>{d.name}</span>
                  <span className="text-[#b91c1c]">{d.price}</span>
                </div>
                <p className="font-sans text-xs text-neutral-700">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center p-6 bg-black text-white border-2 border-black font-mono-code text-xs">
        <p className="font-bold">// LA CARTA COMPLETA CON PRECIOS Y ALÉRGENOS ESTÁ EN FASE DE DEMO</p>
      </div>
    </div>
  );
};
