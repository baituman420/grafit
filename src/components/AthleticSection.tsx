import React from 'react';
import { Beer, MapPin, Users, ArrowRight, Shield, Flame, Navigation, Trophy } from 'lucide-react';

interface AthleticSectionProps {
  onNavigate: (path: string) => void;
}

export const AthleticSection: React.FC<AthleticSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="athletic-section"
      className="relative py-16 sm:py-24 border-b-8 border-black overflow-hidden bg-[#0a0908] text-[#f5efe1] select-none"
    >
      {/* 1. ATHLETIC ZURIGORRI STRIPES (VINTAGE SCARF TEXTURE) */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(90deg,#b91c1c_0px,#b91c1c_36px,#ffffff_36px,#ffffff_72px)] border-b-2 border-black shadow-[0_4px_10px_rgba(0,0,0,0.8)]" />

      {/* ATMOSPHERIC SUBSTRATE */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/grafit/fanzine-wall-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0908]/85 to-[#0a0908] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* ================================================================= */}
        {/* HEADER BLOCK: INDAUTXU, BARRIO & SENTIMIENTO ROJIBLANCO           */}
        {/* ================================================================= */}
        <div className="p-6 sm:p-10 md:p-12 bg-[#141211]/95 border-4 border-neutral-800 shadow-[8px_8px_0px_#b91c1c] relative space-y-5 mb-12">
          <div className="masking-tape tape-corner-tl" />

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[2px_2px_0_#000]">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>SENTIMIENTO ATHLETICZALE // INDAUTXU</span>
            </span>
            <span className="font-mono-code text-xs font-bold text-[#e2c044] bg-black/80 px-2.5 py-1 border border-neutral-700">
              ★ A 10 MINUTOS A PIE DE SAN MAMÉS ★
            </span>
            <span className="font-mono-code text-xs text-neutral-400 px-2 py-1 bg-black/60 border border-neutral-800 hidden sm:inline-block">
              URRUTIA KALEA 1
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-[#f5efe1] uppercase tracking-wider leading-[0.92]">
              LA PREVIA NO SE IMPROVISA.
              <span className="block text-[#b91c1c]">SE VIVE EN INDAUTXU.</span>
            </h2>
            <p className="font-mono-code text-xs sm:text-sm text-[#e2c044] uppercase tracking-wider font-bold">
              "Partida San Mamésen jokatzen da, baina bihotza auzoan geratzen da"
            </p>
          </div>

          <p className="font-sans text-neutral-300 text-sm sm:text-base max-w-4xl leading-relaxed">
            En Grafit el fútbol no es una moda ni un decorado: es el latido natural del barrio de Indautxu cada jornada en la que juega el Athletic. Antes de subir por María Díaz de Haro y Licenciado Poza hacia la Catedral, las cuadrillas se concentran en nuestra barra para el primer cañón de tanque y el poteo con banda sonora de rock.
          </p>

          {/* ITINERARY ROUTE PILL */}
          <div className="p-3 bg-black/80 border-2 border-neutral-700 flex flex-wrap items-center gap-2 sm:gap-4 font-mono-code text-[11px] sm:text-xs text-neutral-300">
            <div className="flex items-center gap-1.5 text-[#e2c044] font-bold">
              <Navigation className="w-4 h-4" />
              <span>LA RUTA CLÁSICA:</span>
            </div>
            <span className="text-white font-bold">1. Grafit (Urrutia 1)</span>
            <span className="text-[#b91c1c]">→</span>
            <span>Alameda Urquijo</span>
            <span className="text-[#b91c1c]">→</span>
            <span>Licenciado Poza</span>
            <span className="text-[#b91c1c]">→</span>
            <span className="text-[#e2c044] font-bold">San Mamés (10 min)</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3 MOMENTOS SAGRADOS + FOTOGRAFÍAS REALES                          */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3 AUTHENTIC ROJIBLANCO PILLARS (7 COLS) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* PILLAR 1: LA PREVIA */}
            <div className="p-5 sm:p-6 bg-[#161413] border-3 border-neutral-800 hover:border-[#b91c1c] transition-colors relative group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black border-2 border-[#b91c1c] flex items-center justify-center shrink-0 shadow-[3px_3px_0_#000]">
                  <Flame className="w-6 h-6 text-[#b91c1c]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] text-[#e2c044] uppercase font-bold tracking-wider">
                      MOMENTO 01 // 2 HORAS ANTES
                    </span>
                    <span className="font-mono-code text-[10px] bg-[#b91c1c] text-white px-1.5 py-0.2 uppercase font-bold">
                      BARRA VIVA
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    La Previa en Urrutia
                  </h3>
                  <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                    El punto de reunión de cuadrillas antes del partido. Kalimotxos de taberna bien preparados, gildas, raciones rápidas y clásicos de rock en los altavoces para calentar gargantas con la gente del barrio.
                  </p>
                </div>
              </div>
            </div>

            {/* PILLAR 2: CERVEZA DE TANQUE A -2°C */}
            <div className="p-5 sm:p-6 bg-[#161413] border-3 border-neutral-800 hover:border-[#e2c044] transition-colors relative group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black border-2 border-[#e2c044] flex items-center justify-center shrink-0 shadow-[3px_3px_0_#000]">
                  <Beer className="w-6 h-6 text-[#e2c044]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] text-[#e2c044] uppercase font-bold tracking-wider">
                      MOMENTO 02 // EL TIRO SAGRADO
                    </span>
                    <span className="font-mono-code text-[10px] bg-[#e2c044] text-black px-1.5 py-0.2 uppercase font-bold">
                      -2°C GLACIAR
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    Cerveza de Tanque a -2°C
                  </h3>
                  <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                    Dos tanques presenciales de cerveza sin pasteurizar directamente conectados a los cañeros. Espuma densa, tiro perfecto a copa fría y frescura máxima sin carbónico añadido. El brindis obligatorio antes de salir hacia el estadio.
                  </p>
                </div>
              </div>
            </div>

            {/* PILLAR 3: EL POSTPARTIDO */}
            <div className="p-5 sm:p-6 bg-[#161413] border-3 border-neutral-800 hover:border-[#b91c1c] transition-colors relative group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-black border-2 border-[#b91c1c] flex items-center justify-center shrink-0 shadow-[3px_3px_0_#000]">
                  <Users className="w-6 h-6 text-[#b91c1c]" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] text-[#e2c044] uppercase font-bold tracking-wider">
                      MOMENTO 03 // TERCER TIEMPO
                    </span>
                    <span className="font-mono-code text-[10px] bg-black text-[#e2c044] border border-[#e2c044] px-1.5 py-0.2 uppercase font-bold">
                      COCINA NON-STOP
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    El Refugio del Postpartido
                  </h3>
                  <p className="font-sans text-neutral-300 text-sm leading-relaxed">
                    Cuando termina el partido y la marea vuelve de San Mamés, el gran salón abre mesas para que la cuadrilla cene con calma: hamburguesas 100% buey, sándwiches plancha y raciones calientes para celebrar o desahogar el partido sin turnos ni expulsiones.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA ACCIÓN ATHLETIC */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate('/contacto?tipo=comida-cuadrilla')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4 text-amber-300" />
                <span>★ RESERVAR MESA DE CUADRILLA PARA PARTIDO ★</span>
              </button>

              <button
                onClick={() => onNavigate('/carta')}
                className="w-full sm:w-auto px-5 py-3.5 bg-black hover:bg-neutral-900 text-white font-anton text-sm sm:text-base uppercase tracking-wider border-2 border-neutral-700 shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <span>VER CARTA DE POTE & PICOTEO</span>
                <ArrowRight className="w-4 h-4 text-[#e2c044]" />
              </button>
            </div>
          </div>

          {/* RIGHT: REAL PHOTO ESSAY OF GRAFIT MATCHDAY AMBIANCE (5 COLS) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* PHOTO 1: LA BARRA Y GRIFOS DE CERVEZA */}
            <div className="p-3 bg-[#181615] border-3 border-black shadow-[6px_6px_0px_#000] relative">
              <div className="masking-tape tape-corner-tr" />
              <div className="relative aspect-[4/3] bg-black border-2 border-neutral-800 overflow-hidden">
                <img
                  src="./assets/grafit/interior/grafit-barra-01.jpg"
                  alt="Barra viva de Grafit con cañeros de tanque"
                  className="w-full h-full object-cover contrast-110"
                />
                <div className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono-code text-[10px] font-bold px-2 py-0.5 border border-black uppercase">
                  GRIFOS & TANQUES HELADOS
                </div>
              </div>
              <p className="font-mono-code text-[11px] text-neutral-400 mt-2 text-center">
                La barra de Urrutia 1 durante la previa de San Mamés.
              </p>
            </div>

            {/* PHOTO 2: MESAS DEL SALÓN PARA EL POSTPARTIDO */}
            <div className="p-3 bg-[#181615] border-3 border-black shadow-[6px_6px_0px_#b91c1c] relative">
              <div className="relative aspect-[4/3] bg-black border-2 border-neutral-800 overflow-hidden">
                <img
                  src="./assets/grafit/interior/grafit-salon-mesas-11.jpg"
                  alt="Mesas corridas para cuadrillas en el salón"
                  className="w-full h-full object-cover contrast-110"
                />
                <div className="absolute top-2 left-2 bg-black/90 text-[#e2c044] font-mono-code text-[10px] font-bold px-2 py-0.5 border border-[#e2c044] uppercase">
                  SALÓN DE CUADRILLAS
                </div>
              </div>
              <p className="font-mono-code text-[11px] text-neutral-400 mt-2 text-center">
                Comedor modulable para el tercer tiempo y cenas tras el partido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
