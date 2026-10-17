import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Calendar, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface CierreComercialSectionProps {
  onNavigate: (path: string) => void;
}

export const CierreComercialSection: React.FC<CierreComercialSectionProps> = ({ onNavigate }) => {
  const { info } = GRAFIT_DATA;

  return (
    <section className="relative py-18 sm:py-26 px-4 sm:px-6 lg:px-12 border-b-8 border-black text-[#f5efe1] overflow-hidden select-none bg-[#12100e]">
      {/* 1. AUTHENTIC PUNK WALLPAPER (COLOR VERSION WITH VEIL) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 75%',
          opacity: 0.78,
        }}
      />
      {/* VELADURA DE DESCANSO VISUAL & LEGIBILIDAD DIRECTA */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,11,10,0.92) 0%, rgba(18,16,14,0.68) 35%, rgba(18,16,14,0.72) 70%, rgba(10,10,10,0.95) 100%)',
        }}
      />

      {/* TOP & BOTTOM SEAMLESS FADES */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0c0b0a 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        <div className="inline-block bg-[#b91c1c] text-white px-3.5 py-1 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0_#000] font-bold">
          // PLANIFICA TU CELEBRACIÓN EN INDAUTXU
        </div>

        <h2 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          ¿PREPARANDO UNA COMIDA DE CUADRILLA O CELEBRACIÓN?
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#ded8cb] max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
          El salón multiusos de Grafit y nuestra cocina continua están a vuestra disposición. Explícanos qué tipo de encuentro tenéis en mente,
          la fecha aproximada y el número estimado de comensales: te responderemos con opciones y disponibilidad directa sin costes de sala.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="w-full sm:w-auto px-8 py-4 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>★ SOLICITAR DISPONIBILIDAD ★</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigate('/eventos')}
            className="w-full sm:w-auto px-7 py-4 bg-[#f5efe1] hover:bg-white text-black font-anton text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>VER GUÍA DE EVENTOS</span>
          </button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-6 font-mono text-xs text-[#ded8cb]/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#e2c044]" />
            <span className="text-white font-bold">{info.address} • {info.neighborhood} ({info.city})</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span>A 3 min del Metro Indautxu</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#e2c044] font-bold">Sin rotaciones forzadas</span>
          </div>
        </div>

      </div>
    </section>
  );
};
