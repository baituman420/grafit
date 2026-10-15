import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Utensils, Calendar, ArrowRight, Users, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden py-8 lg:py-16 bg-newsprint/80 text-[#0a0a0a] border-b-8 border-black">
      {/* CENTER FOLD DOTTED CREASE LINE */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] border-l-2 border-dashed border-black/30 pointer-events-none z-30"></div>
      <div className="hidden lg:block absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono-code tracking-widest bg-black text-white px-3 py-1 z-40">
        LINEA DE PLEGADO // FOLIO IZQUIERDA (EL ORIGEN) + FOLIO DERECHA (EL ESPACIO)
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        
        {/* MAIN PASTE-UP SPREAD GRID (5 COLS / 7 COLS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
          
          {/* ================= LEFT COLUMN: THE ROOTS, THE TAVERN, ATHLETIC (5 COLS) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:-ml-4">
            
            {/* ARTIFACT 1: PHOTO OF BAR COUNTER */}
            <article className="relative bg-white p-4 border-4 border-black pasteup-shadow transform -rotate-3 lg:-translate-x-4">
              <div className="masking-tape tape-top-center"></div>
              <div className="masking-tape tape-corner-tr"></div>
              <div className="overflow-hidden border-2 border-black bg-black aspect-[4/3]">
                <img
                  src="./assets/grafit/interior/grafit-barra-01.jpg"
                  alt="La Barra del Grafit Café"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  loading="eager"
                />
              </div>
              <div className="mt-3 bg-[#f5efe1] p-3 border border-black font-typewriter text-xs leading-tight">
                <div className="font-bold flex justify-between items-center text-xs uppercase border-b border-black/40 pb-1.5 mb-1.5">
                  <span>[DOC. #01] LA BARRA DE INDAUTXU</span>
                  <span className="text-[#b91c1c]">CABINA & BARRAS</span>
                </div>
                <p className="text-[13px] text-neutral-800">
                  Paredes con historia, mural de discos de vinilo y la barra donde convive el primer cortado matinal con las cañas heladas de tanque.
                </p>
              </div>
              <div className="absolute -bottom-4 -right-3 bg-[#b91c1c] text-white font-ransom px-4 py-1 text-base tracking-wider uppercase transform rotate-6 border-2 border-black">
                #BILBOROCK
              </div>
            </article>

            {/* ARTIFACT 2: ATHLETIC & BAR CULTURE CLIP */}
            <article className="relative bg-[#fdfbf7] p-6 border-4 border-black pasteup-shadow transform rotate-2 lg:translate-x-6">
              <div className="masking-tape tape-corner-tl"></div>
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <span className="font-ransom text-3xl tracking-wider text-[#0a0a0a]">SAN MAMÉS VIBES</span>
                <span className="bg-[#b91c1c] text-white font-mono-code text-[11px] px-2.5 py-0.5 font-bold uppercase">A 10 MINUTOS DE LA CATEDRAL</span>
              </div>
              <div className="space-y-3 font-typewriter text-xs">
                <p className="font-bold text-base leading-snug">
                  «En el Grafit los días de partido no son una promoción comercial: son la vida del barrio.»
                </p>
                <p className="text-[13px] text-neutral-800">
                  La marea zurigorri desemboca en estas maderas. Cañón de cerveza recién tirado a -2°C, pintxos recién salidos y ambiente que une a varias generaciones.
                </p>
              </div>
              <div className="mt-5 border-2 border-dashed border-black p-4 bg-[#e2c044]/30 flex justify-between items-center">
                <div>
                  <div className="font-mono-code text-[11px] tracking-widest uppercase font-bold">REGISTRO DE BARRA</div>
                  <div className="font-ransom text-2xl">CERVEZA DE TANQUE ESTRELLA</div>
                  <div className="font-mono-code text-[11px]">PRESIÓN DIRECTA • CERO PASTEURIZAR</div>
                </div>
                <div className="font-ransom text-4xl text-[#b91c1c]">
                  -2°C
                </div>
              </div>
            </article>

            {/* ARTIFACT 3: FOOD CUTOUT & KITCHEN NON-STOP */}
            <article className="relative bg-white p-4 border-4 border-black pasteup-shadow transform -rotate-2 lg:-translate-x-2">
              <div className="masking-tape tape-bottom-center"></div>
              <div className="flex gap-4">
                <div className="w-1/2 border-2 border-black bg-black overflow-hidden aspect-square">
                  <img
                    src="./assets/grafit/instagram/burguer.webp"
                    alt="Burger Grafit"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    loading="eager"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-between font-typewriter">
                  <div>
                    <span className="inline-block bg-[#0a0a0a] text-white text-[11px] px-2 py-0.5 font-mono-code mb-1">FOGONES REALES</span>
                    <h4 className="font-ransom text-3xl leading-none text-[#0a0a0a]">BURGER GRAFIT 100% BUEY</h4>
                    <p className="text-[12px] leading-tight text-neutral-700 mt-2">
                      Carne seleccionada, cheddar ahumado, bacon y salsa especial.
                    </p>
                  </div>
                  <div className="border-t border-black pt-2 mt-2">
                    <div className="font-typewriter text-xs text-[#b91c1c] font-bold">KITCHEN NON-STOP</div>
                    <div className="text-[11px] text-neutral-700">Cocina abierta de 12:00 a 23:30</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 right-6 bg-[#e2c044] text-black font-mono-code text-xs font-bold px-3 py-1 border border-black transform rotate-4">
                COCINA SIN SNOBISMOS
              </div>
            </article>

          </div>

          {/* ================= RIGHT COLUMN: SALÓN MULTIUSOS, FURGONETA & EVENTOS (7 COLS) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pl-6">
            
            {/* GIANT MANIFESTO TORN STRIP */}
            <section className="relative lg:translate-x-4">
              <div className="torn-strip-yellow p-6 md:p-8 pasteup-shadow transform rotate-1 border-3 border-black">
                <div className="font-mono-code text-xs uppercase tracking-widest text-black/80 mb-2 font-bold">
                  /// GRAFIT ROCK CAFÉ // INDAUTXU — BILBAO
                </div>
                <blockquote className="font-ransom text-4xl md:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.88] text-[#0a0a0a]">
                  «MÁS QUE UN BAR: UN ESPACIO SINGULAR PARA <span className="bg-black text-white px-3 py-1 inline-block transform -rotate-1">EVENTOS Y CELEBRACIONES.»</span>
                </blockquote>
              </div>
            </section>

            {/* HIGHLIGHT: SALÓN MULTIUSOS & FURGONETA VOLKSWAGEN */}
            <article className="relative bg-white p-5 border-4 border-black pasteup-shadow transform -rotate-1 z-20">
              <div className="masking-tape tape-corner-tl"></div>
              <div className="masking-tape tape-corner-tr"></div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-6 overflow-hidden border-2 border-black bg-black aspect-[4/3]">
                  <img
                    src="./assets/grafit/instagram/volkswagen.jpg"
                    alt="Furgoneta Volkswagen en el salón de Grafit"
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-6 space-y-2 font-typewriter">
                  <div className="bg-[#b91c1c] text-white text-[11px] font-mono-code px-2 py-0.5 inline-block uppercase font-bold">
                    ICONO DEL SALÓN
                  </div>
                  <h3 className="font-ransom text-3xl leading-none text-black">
                    EL GRAN SALÓN MULTIUSOS
                  </h3>
                  <p className="text-xs text-neutral-800 leading-relaxed">
                    Presidido por nuestra auténtica Volkswagen T2 roja y blanca. Un espacio versátil concebido para comidas de cuadrilla, cumpleaños, afterworks y encuentros con total comodidad.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="font-mono-code text-[11px] bg-[#f4eedd] border border-black px-2 py-1 font-bold">
                      CAPACIDAD MODULAR
                    </span>
                    <span className="font-mono-code text-[11px] bg-[#f4eedd] border border-black px-2 py-1 font-bold">
                      FORMATO CÓCTEL O MESA
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* ARTIFACT 4: MASSIVE WIDE CROWD INAUGURATION PHOTO (ARCHIVE) */}
            <article className="relative bg-white p-4 border-4 border-black pasteup-shadow-heavy transform rotate-1 lg:translate-x-2">
              <div className="masking-tape tape-top-center"></div>
              <div className="masking-tape tape-bottom-center"></div>
              <div className="relative overflow-hidden border-2 border-black bg-black aspect-[16/9]">
                <img
                  src="./assets/grafit/archive/grafit-inauguracion-2017-07.jpg"
                  alt="Archivo Histórico - Parroquia de Grafit"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 bg-black/90 text-white p-2 border-2 border-white font-mono-code text-xs uppercase tracking-wider">
                  <span className="text-[#e2c044] font-bold">MEMORIA HISTÓRICA</span> // INDAUTXU
                </div>
              </div>
              <div className="mt-3 flex flex-wrap justify-between items-end gap-3 font-typewriter">
                <div>
                  <span className="font-ransom text-2xl tracking-wide uppercase text-[#0a0a0a]">PUNTO DE ENCUENTRO INTERGENERACIONAL</span>
                  <p className="text-xs text-neutral-800">
                    Desde 2017 acogiendo cuadrillas del barrio, celebraciones y amantes del rock en un ambiente cercano y sin artificios.
                  </p>
                </div>
              </div>
            </article>

            {/* ACTION BUTTONS STRIP */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/eventos')}
                className="px-7 py-4 bg-black text-white font-ransom text-2xl sm:text-3xl uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_#b91c1c] hover:bg-[#b91c1c] transition-all flex items-center gap-3"
              >
                <Users className="w-6 h-6 text-[#e2c044]" />
                <span>PLANEAR EVENTO O GRUPO</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('/espacio')}
                className="px-7 py-4 bg-[#fdfbf7] text-black font-ransom text-2xl sm:text-3xl uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-3"
              >
                <span>CONOCER EL ESPACIO</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
