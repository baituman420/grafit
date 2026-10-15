import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Utensils, Clock, Users, ArrowRight, ArrowLeft, Beer, Sparkles } from 'lucide-react';

interface CartaPageProps {
  onNavigate: (path: string) => void;
}

export const CartaPage: React.FC<CartaPageProps> = ({ onNavigate }) => {
  const { gastronomia, info } = GRAFIT_DATA;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* NAVIGATION BACK */}
      <button
        onClick={() => onNavigate('/')}
        className="px-4 py-2 bg-black text-white font-mono-code text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>VOLVER A LA HOME</span>
      </button>

      {/* HEADER SECTION */}
      <div className="p-6 sm:p-8 bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] tape-top space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
            GASTRONOMÍA ROCK
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-800">
            // {info.kitchenHours}
          </span>
        </div>

        <h1 className="font-anton text-4xl sm:text-6xl text-black uppercase tracking-wider">
          {gastronomia.headline}
        </h1>
        <p className="font-sans text-neutral-800 text-base sm:text-lg max-w-3xl leading-relaxed">
          {gastronomia.subtext}
        </p>
      </div>

      {/* NOTA DESTACADA PARA GRUPOS */}
      <div className="p-6 bg-[#fbf8f1] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs px-2.5 py-0.5 border border-black uppercase font-bold">
            PROPUESTAS PARA GRUPOS & EVENTOS
          </div>
          <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed max-w-2xl">
            {gastronomia.gruposNota}
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contacto')}
          className="px-6 py-3 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-base uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
        >
          <span>CONSULTAR MENÚ DE GRUPO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ESPECIALIDADES HABITUALES CON FOTOGRAFÍA REAL */}
      <div className="space-y-6">
        <div className="border-b-4 border-black pb-3">
          <div className="font-mono-code text-xs font-bold text-neutral-600 uppercase tracking-widest">
            // ESPECIALIDADES DE LA CASA
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
            NUESTROS PLATOS DESTACADOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gastronomia.dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row overflow-hidden"
            >
              {dish.image && (
                <div className="sm:w-2/5 h-48 sm:h-auto border-b-3 sm:border-b-0 sm:border-r-3 border-black bg-neutral-900 shrink-0 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {dish.badge && (
                    <span className="inline-block bg-black text-white font-mono-code text-[10px] px-2 py-0.5 border border-black uppercase font-bold">
                      {dish.badge}
                    </span>
                  )}
                  <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                    {dish.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARTEL INFORMATIVO NON-STOP */}
      <div className="p-6 bg-black text-white border-4 border-black shadow-[6px_6px_0px_#b91c1c] text-center space-y-3">
        <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 font-bold">
          FILOSOFÍA NON-STOP
        </div>
        <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-white">
          COCINA ABIERTA CUANDO LA NECESITAS
        </h3>
        <p className="font-mono-code text-xs text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Ya sea un bocado rápido a media tarde, una cena de picoteo improvisada o un evento planificado, nuestra cocina mantiene su servicio activo de 12:00 a 23:30 sin interrupción de sobremesa.
        </p>
      </div>

      {/* CIERRE A EVENTOS */}
      <div className="p-8 bg-[#fbf8f1] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center space-y-4">
        <h2 className="font-anton text-3xl uppercase tracking-wider text-black">
          ¿ORGANIZANDO UNA REUNIÓN O CELEBRACIÓN?
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-800 max-w-xl mx-auto">
          Podemos preparar mesas reservadas con combinaciones de hamburguesas, raciones y bebida para grupos de cualquier tamaño.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-6 py-3 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>PEDIR PRESUPUESTO DE GRUPO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/espacio')}
            className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>CONOCER EL SALÓN MULTIUSOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
