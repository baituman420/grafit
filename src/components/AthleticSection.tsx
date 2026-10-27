import React from 'react';
import { Flame, ArrowRight, Sparkles } from 'lucide-react';

interface AthleticSectionProps {
  onNavigate: (path: string) => void;
}

export const AthleticSection: React.FC<AthleticSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="athletic-section"
      className="relative w-full min-h-[640px] sm:min-h-[740px] lg:min-h-[820px] flex items-end border-b-8 border-black overflow-hidden bg-black text-[#f5efe1] select-none"
    >
      {/* =================================================================== */}
      {/* 1. ATHLETIC ZURIGORRI WOVEN SCARF BANNER TRIM (TOP & BOTTOM)       */}
      {/* =================================================================== */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,#b91c1c_0px,#b91c1c_36px,#ffffff_36px,#ffffff_72px)] border-b-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.9)] z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,#b91c1c_0px,#b91c1c_36px,#ffffff_36px,#ffffff_72px)] border-t-2 border-black z-30" />

      {/* =================================================================== */}
      {/* 2. PANORAMIC PROTAGONIST BACKGROUND: MURAL GRITTY SAN MAMÉS        */}
      {/* =================================================================== */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('./assets/grafit/athletic-mural-gritty.webp')`,
        }}
      />

      {/* =================================================================== */}
      {/* 3. LOCALIZED VELADURA (PRESERVES SAN MAMÉS, SHIELD & CREST)         */}
      {/* =================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,10,9,0.2) 0%, rgba(12,10,9,0.35) 40%, rgba(12,10,9,0.85) 75%, rgba(12,10,9,0.98) 100%)',
        }}
      />
      {/* SUBTLE GRAIN / NOISE OVERLAY */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-10" />

      {/* =================================================================== */}
      {/* 4. EDITORIAL FANZINE COVER HERO CONTENT                             */}
      {/* =================================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32 space-y-6">
        
        {/* HEADER BADGES */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-xs px-3.5 py-1 border-2 border-black uppercase font-bold rot-neg-1 shadow-[3px_3px_0_#000]">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>SENTIMIENTO ATHLETICZALE // INDAUTXU</span>
          </span>
          <span className="font-mono text-xs font-bold text-[#e2c044] bg-black/85 px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
            ★ PUNTO DE ENCUENTRO EN URRUTIA KALEA 1 ★
          </span>
        </div>

        {/* MONUMENTAL TITULAR */}
        <div className="space-y-3 max-w-4xl">
          <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-wider leading-[0.92] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            EL ATHLETIC SE VIVE EN GRAFIT
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#e2c044] uppercase tracking-wider font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            "San Mamesera bidean, Urrutia kalea da lehenengo harmaila"
          </p>
        </div>

        {/* EDITORIAL BRIEF BODY */}
        <p className="font-sans text-neutral-200 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          Hay partidos que no se ven, se viven. En Grafit compartimos la pasión por el Athletic, los encuentros entre amigos y esa manera tan nuestra de sentir el fútbol. Un espacio con personalidad para disfrutar de cada jornada y celebrar juntos cada momento.
        </p>

        {/* CALL TO ACTION BUTTON */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('ambientes-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onNavigate('/espacio');
              }
            }}
            className="px-8 py-4 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-base sm:text-lg uppercase tracking-wider border-3 border-black shadow-[6px_6px_0_#000] flex items-center justify-center gap-2.5 cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>DESCUBRE EL AMBIENTE</span>
          </button>

          <button
            onClick={() => onNavigate('/carta')}
            className="px-6 py-4 bg-[#181615]/90 hover:bg-black text-[#f5efe1] font-mono text-xs sm:text-sm font-bold uppercase border-2 border-neutral-700 shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>VER CARTA DE PICOTEO</span>
            <ArrowRight className="w-4 h-4 text-[#e2c044]" />
          </button>
        </div>

      </div>
    </section>
  );
};
