import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, Sparkles, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SlicedTextTransitionProps {
  onExploreEvents?: () => void;
}

export const SlicedTextTransition: React.FC<SlicedTextTransitionProps> = ({ onExploreEvents }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWordsRef = useRef<HTMLDivElement[]>([]);
  const lockBadgeRef = useRef<HTMLDivElement>(null);
  const commercialIntroRef = useRef<HTMLDivElement>(null);

  const concepts = [
    { word: 'GRUPOS', subtitle: 'Cuadrillas & Celebraciones', color: '#f5efe1', accent: '#b91c1c' },
    { word: 'EVENTOS', subtitle: 'Empresa & Cumpleaños', color: '#e2c044', accent: '#f5efe1' },
    { word: 'SALÓN MULTIUSOS', subtitle: 'Versatilidad & Confort Acústico', color: '#f5efe1', accent: '#b91c1c' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Find all slices within each word
      const allSlices = containerRef.current?.querySelectorAll('.slice-layer');

      // Set initial sliced offsets
      allSlices?.forEach((slice, i) => {
        const sliceIndex = parseInt(slice.getAttribute('data-slice') || '0', 10);
        const direction = sliceIndex === 0 ? -1 : sliceIndex === 1 ? 1 : -0.7;
        const offset = (direction * (window.innerWidth < 768 ? 40 : 75));
        
        gsap.set(slice, {
          x: offset,
          opacity: 0.2,
          skewX: direction * 4,
        });
      });

      if (lockBadgeRef.current) {
        gsap.set(lockBadgeRef.current, { scale: 0.9, opacity: 0 });
      }

      if (commercialIntroRef.current) {
        gsap.set(commercialIntroRef.current, { y: 20, opacity: 0 });
      }

      // Sliced text lock-in timeline triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Slices slide into unified alignment (0.65s)
      tl.to(allSlices || [], {
        x: 0,
        opacity: 1,
        skewX: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: {
          each: 0.04,
          from: 'center',
        },
      })
      // 2. Lock badge pops with impact
      .to(lockBadgeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'back.out(2)',
      }, '-=0.2')
      // 3. Commercial intro resolves cleanly
      .to(commercialIntroRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power2.out',
      }, '-=0.15');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToEvents = () => {
    if (onExploreEvents) {
      onExploreEvents();
    } else {
      const el = document.getElementById('experiencias');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: 500, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="sliced-text-transition"
      ref={containerRef}
      className="relative z-30 bg-[#0e0c0b] text-[#f5efe1] py-14 sm:py-20 border-y-8 border-black overflow-hidden select-none"
    >
      {/* BACKGROUND PUNK WALLPAPER SUBSTRATE */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/grafit/fanzine-wall-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0e0c0b]/80 to-[#0e0c0b] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        
        {/* TRANSITION OVERLINE */}
        <div className="inline-flex items-center gap-2 bg-[#b91c1c] text-white font-mono-code text-[10px] sm:text-xs px-3 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>DE LA GASTRONOMÍA AL ESPACIO COMPARTIDO</span>
        </div>

        {/* ================================================================= */}
        {/* SLICED TEXT CONTAINER (GRUPOS • EVENTOS • SALÓN MULTIUSOS)        */}
        {/* ================================================================= */}
        <div className="w-full flex flex-col items-center justify-center space-y-4 sm:space-y-6 my-2">
          {concepts.map((concept, idx) => (
            <div
              key={concept.word}
              ref={(el) => { if (el) textWordsRef.current[idx] = el; }}
              className="relative w-full flex flex-col items-center justify-center group"
            >
              {/* SLICED WORD STACK (3 HORIZONTAL SEGMENTS) */}
              <div className="relative font-anton text-4xl sm:text-6xl md:text-8xl tracking-wider uppercase leading-none overflow-visible">
                
                {/* SLICE 0: TOP 0% - 35% */}
                <div
                  className="slice-layer select-none relative"
                  data-slice="0"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 35%, 0% 35%)',
                    color: concept.color,
                  }}
                >
                  {concept.word}
                </div>

                {/* SLICE 1: MIDDLE 33% - 68% (ABSOLUTE OVERLAY) */}
                <div
                  className="slice-layer select-none absolute inset-0"
                  data-slice="1"
                  style={{
                    clipPath: 'polygon(0% 33%, 100% 33%, 100% 68%, 0% 68%)',
                    color: concept.color,
                    filter: 'drop-shadow(0px 2px 0px rgba(185, 28, 28, 0.4))',
                  }}
                >
                  {concept.word}
                </div>

                {/* SLICE 2: BOTTOM 66% - 100% (ABSOLUTE OVERLAY) */}
                <div
                  className="slice-layer select-none absolute inset-0"
                  data-slice="2"
                  style={{
                    clipPath: 'polygon(0% 66%, 100% 66%, 100% 100%, 0% 100%)',
                    color: concept.color,
                  }}
                >
                  {concept.word}
                </div>
              </div>

              {/* CONTEXT SUBTITLE BADGE */}
              <span className="mt-1 font-mono-code text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest font-bold">
                // {concept.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* LOCKED IN IMPACT BANNER */}
        <div
          ref={lockBadgeRef}
          className="mt-8 p-3 bg-black border-2 border-neutral-700 shadow-[4px_4px_0px_#b91c1c] max-w-xl text-center"
        >
          <span className="font-anton text-base sm:text-xl text-amber-300 tracking-wider uppercase">
            ★ EL ESPACIO QUE SE ADAPTA A TU CELEBRACIÓN EN INDAUTXU ★
          </span>
        </div>

        {/* COMMERCIAL INTRO RESOLUTION */}
        <div
          ref={commercialIntroRef}
          className="mt-6 max-w-2xl text-center space-y-4"
        >
          <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
            Ya sea una comida de cuadrilla, un cumpleaños o un encuentro corporativo distendido, el salón multiusos de Grafit te ofrece intimidad acústica, barra propia y cocina ininterrumpida.
          </p>

          <button
            onClick={handleScrollToEvents}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#fdfbf7] text-black font-anton text-base sm:text-lg uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] hover:text-white transition-all cursor-pointer"
          >
            <span>VER FORMATOS DE EVENTO</span>
            <ArrowDown className="w-4 h-4 text-amber-500 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
