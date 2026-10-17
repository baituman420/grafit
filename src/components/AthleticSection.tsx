import React from 'react';
import { Beer, MapPin, Users, ArrowRight, Flame, Navigation, Trophy, Sparkles } from 'lucide-react';

interface AthleticSectionProps {
  onNavigate: (path: string) => void;
}

export const AthleticSection: React.FC<AthleticSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="athletic-section"
      className="relative py-18 sm:py-28 border-b-8 border-black overflow-hidden bg-[#0c0a09] text-[#f5efe1] select-none"
    >
      {/* =================================================================== */}
      {/* 1. ATHLETIC ZURIGORRI WOVEN SCARF BANNER TRIM (TOP & BOTTOM)       */}
      {/* =================================================================== */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,#b91c1c_0px,#b91c1c_36px,#ffffff_36px,#ffffff_72px)] border-b-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.9)] z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(90deg,#b91c1c_0px,#b91c1c_36px,#ffffff_36px,#ffffff_72px)] border-t-2 border-black z-20" />

      {/* =================================================================== */}
      {/* 2. AUTHENTIC PUNK WALLPAPER SUBSTRATE (COLOR VERSION) & STADIUM GLOW */}
      {/* =================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('./assets/grafit/punk-wall-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.75,
        }}
      />
      {/* STADIUM FLOODLIGHT & ATHLETIC ZURIGORRI VELADURA */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 25%, rgba(185,28,28,0.42) 0%, transparent 65%), radial-gradient(ellipse at 75% 75%, rgba(226,192,68,0.25) 0%, transparent 60%), linear-gradient(180deg, rgba(12,10,9,0.88) 0%, rgba(18,14,12,0.60) 45%, rgba(12,10,9,0.92) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ================================================================= */}
        {/* MONUMENTAL ATHLETICZALE STREET TIFO HEADLINE                       */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-xs px-3.5 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[3px_3px_0_#000]">
              <Flame className="w-4 h-4 text-amber-300" />
              <span>SENTIMIENTO ATHLETICZALE // INDAUTXU</span>
            </span>
            <span className="font-mono text-xs font-bold text-[#e2c044] bg-black/85 px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
              ★ A 10 MINUTOS A PIE DE LA CATEDRAL ★
            </span>
            <span className="font-mono text-xs text-neutral-400 px-2.5 py-1 bg-black/60 border border-neutral-800 hidden sm:inline-block">
              URRUTIA KALEA 1 • KM ZERO DE LA PREVIA
            </span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wider leading-[0.92] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            AQUÍ COMIENZA EL RUGIDO DE SAN MAMÉS.
            <span className="block text-white text-3xl sm:text-5xl lg:text-6xl mt-2 tracking-normal drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
              <span className="bg-[#b91c1c] text-white px-2.5 py-0.5 inline-block mr-2 shadow-[3px_3px_0_#000] rot-neg-1 border border-black">LA PREVIA NO SE IMPROVISA:</span>
              <span className="text-[#ded8cb]">SE VIVE EN INDAUTXU.</span>
            </span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-[#e2c044] uppercase tracking-wider font-bold">
            "San Mamesera bidean, Urrutia kalea da lehenengo harmaila"
          </p>

          <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-4xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            En Grafit el fútbol no es una moda ni un decorado: es el pulso auténtico de Indautxu cada jornada en la que juega el Athletic.
            Antes de enfilar por María Díaz de Haro y Licenciado Poza hacia San Mamés, las cuadrillas se concentran en nuestra acera y barra
            para el primer cañón de tanque a -2°C, el poteo con banda sonora de rock y la hermandad zurigorri del barrio.
          </p>

          {/* ITINERARY ROUTE TIFO PILL */}
          <div className="p-3.5 bg-black/85 border-2 border-neutral-700 flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-neutral-300 shadow-[4px_4px_0_#000]">
            <div className="flex items-center gap-1.5 text-[#e2c044] font-bold">
              <Navigation className="w-4 h-4" />
              <span>EL ITINERARIO SAGRADO:</span>
            </div>
            <span className="text-white font-bold bg-[#b91c1c] px-2 py-0.5 border border-black">1. Grafit (Urrutia 1)</span>
            <span className="text-[#b91c1c] font-bold">→</span>
            <span>Alameda Urquijo</span>
            <span className="text-[#b91c1c] font-bold">→</span>
            <span>Licenciado Poza</span>
            <span className="text-[#b91c1c] font-bold">→</span>
            <span className="text-[#e2c044] font-bold">San Mamés (10 min a pie)</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* IMMERSIVE 2-PHOTO TIFO ESSAY & BARRIO RITUALS                     */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* PRIMARY FOCAL PHOTO: REAL GRAFIT STREET FACADE (7 COLS) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="p-3 bg-[#181615] border-4 border-black shadow-[10px_10px_0_#b91c1c] relative group">
              <div className="masking-tape tape-corner-tl" />
              <div className="relative aspect-[16/10] bg-black border-2 border-neutral-800 overflow-hidden">
                <img
                  src="./assets/grafit/interior/grafit-barra-01.jpg"
                  alt="Fachada real del Café Grafit con cartel de Días de Partido del Athletic"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-3 py-1 border border-black uppercase shadow">
                  URRUTIA KALEA 1 • AMBIENTE PREVIA
                </div>
                <div className="absolute bottom-3 right-3 bg-black/90 text-[#e2c044] font-mono text-[10px] font-bold px-3 py-1 border border-[#e2c044] uppercase shadow">
                  ★ CARTEL REAL: DÍAS DE PARTIDO DEL ATHLETIC ★
                </div>
              </div>
              <div className="p-2 flex items-center justify-between font-mono text-xs text-neutral-400">
                <span>La fachada y el barril de roble de Urrutia 1, donde arranca la previa.</span>
                <span className="text-[#e2c044] font-bold">BILBAO</span>
              </div>
            </div>
          </div>

          {/* SECONDARY FOCAL PHOTO: ICE COLD TANK BEER & KEY RITUALS (5 COLS) */}
          <div className="lg:col-span-5 space-y-5">
            {/* PHOTO 2: BEER TAP */}
            <div className="p-3 bg-[#181615] border-3 border-black shadow-[6px_6px_0_#000] relative group">
              <div className="relative aspect-[16/9] bg-black border-2 border-neutral-800 overflow-hidden">
                <img
                  src="./assets/grafit/drinks/grafit-cerveza-canero-01.jpg"
                  alt="Grifos de cerveza de tanque helada a -2°C"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-[#e2c044] text-black font-mono text-[10px] font-bold px-2 py-0.5 border border-black uppercase">
                  CERVEZA DE TANQUE A -2°C
                </div>
              </div>
              <p className="font-mono text-[11px] text-[#ded8cb] mt-2 text-center">
                Caña helada de tanque presencial sin pasteurizar: el tiro perfecto antes del partido.
              </p>
            </div>

            {/* THREE RITUAL PILLARS (DIRECT ON BACKGROUND, NO HEAVY CARDS) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 bg-black/60 border border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-[#b91c1c] text-white flex items-center justify-center shrink-0 font-anton text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-anton text-lg text-white uppercase tracking-wide">
                    La Previa en Urrutia (2h antes)
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 leading-snug">
                    Kalimotxo de taberna bien tirado, raciones calientes y clásicos de rock en los altavoces para cantar con la cuadrilla.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-black/60 border border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-[#e2c044] text-black flex items-center justify-center shrink-0 font-anton text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-anton text-lg text-white uppercase tracking-wide">
                    Cerveza Glaciar a -2°C
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 leading-snug">
                    Dos tanques presenciales conectados a los cañeros. Espuma densa y frescura máxima para el brindis antes de subir al estadio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-black/60 border border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-[#b91c1c] text-white flex items-center justify-center shrink-0 font-anton text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-anton text-lg text-white uppercase tracking-wide">
                    El Tercer Tiempo (Postpartido)
                  </h4>
                  <p className="font-sans text-xs text-neutral-300 leading-snug">
                    Al terminar en San Mamés, el salón abre mesas corridas para que la cuadrilla cene con calma: hamburguesas 100% buey sin turnos.
                  </p>
                </div>
              </div>
            </div>

            {/* CONVERSION CTAS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('/contacto?tipo=comida-cuadrilla')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>★ RESERVAR MESA DE CUADRILLA ★</span>
              </button>

              <button
                onClick={() => onNavigate('/carta')}
                className="w-full sm:w-auto px-5 py-3.5 bg-[#f5efe1] hover:bg-white text-black font-anton text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <span>VER CARTA DE POTE & PICOTEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
