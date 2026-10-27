import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeadlightTraveler } from '../experiments/faro-viajero/HeadlightTraveler';
import { SectionCard } from '../experiments/faro-viajero/SectionCard';
import { Utensils, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FaroViajeroSectionProps {
  onNavigate: (path: string) => void;
}

export const FaroViajeroSection: React.FC<FaroViajeroSectionProps> = ({ onNavigate }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);

  // Headlight DOM element refs
  const hlContainerRef = useRef<HTMLDivElement>(null);
  const hlBezelRef = useRef<HTMLDivElement>(null);
  const hlInnerRef = useRef<HTMLDivElement>(null);
  const hlGlassRef = useRef<HTMLDivElement>(null);
  const hlImgBurgerRef = useRef<HTMLDivElement>(null);
  const hlImgSandwichRef = useRef<HTMLDivElement>(null);
  const hlImgPintxosRef = useRef<HTMLDivElement>(null);
  const hlTagRef = useRef<HTMLDivElement>(null);

  // Narrative sections refs
  const secARef = useRef<HTMLDivElement>(null);
  const secBRef = useRef<HTMLDivElement>(null);
  const secCRef = useRef<HTMLDivElement>(null);
  const secDRef = useRef<HTMLDivElement>(null);
  const secERef = useRef<HTMLDivElement>(null);

  const [activeZone, setActiveZone] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'homeFaroViajero',
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stageRef.current,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setCurrentProgress(Math.round(p * 100));

            if (p < 0.20) setActiveZone('A');
            else if (p < 0.45) setActiveZone('B');
            else if (p < 0.70) setActiveZone('C');
            else if (p < 0.88) setActiveZone('D');
            else setActiveZone('E');
          },
        },
      });

      // INITIAL VISUAL SETUP
      gsap.set(hlContainerRef.current, {
        y: isMobile ? -100 : -140,
        x: 0,
        scale: isMobile ? 0.90 : 0.95,
        rotation: 0,
      });
      gsap.set(hlGlassRef.current, { opacity: 1 });
      gsap.set(hlImgBurgerRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(hlImgSandwichRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(hlImgPintxosRef.current, { opacity: 0, scale: 1.15 });
      gsap.set(hlTagRef.current, { opacity: 0, y: -6, scale: 0.8 });
      gsap.set(hlBezelRef.current, { opacity: 1 });

      // Cards initial states
      gsap.set(secARef.current, { opacity: 1, y: 0 });
      gsap.set(secBRef.current, { opacity: 0, y: 30 });
      gsap.set(secCRef.current, { opacity: 0, y: 30 });
      gsap.set(secDRef.current, { opacity: 0, y: 30 });
      gsap.set(secERef.current, { opacity: 0, y: 40 });

      // =====================================================================
      // MOVIMIENTO A -> B: LLEGADA Y PRIMERA REVELACIÓN (HAMBURGUESA)
      // =====================================================================
      tl.to(
        hlContainerRef.current,
        {
          y: isMobile ? -90 : 20,
          x: isMobile ? 18 : 160,
          scale: isMobile ? 1.05 : 1.25,
          rotation: isMobile ? 2.5 : 2,
          duration: 1.8,
          ease: 'power1.inOut',
        },
        0
      );

      tl.to(secARef.current, { opacity: 0, y: -25, duration: 0.8, ease: 'power1.out' }, 0.6);
      tl.to(hlGlassRef.current, { opacity: 0, duration: 1.0, ease: 'power2.out' }, 0.8);
      tl.to(hlImgBurgerRef.current, { opacity: 1, scale: 1.04, duration: 1.2, ease: 'power2.out' }, 0.8);
      tl.to(secBRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 1.0);
      tl.to(hlTagRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 1.2);
      tl.to(bgOverlayRef.current, { opacity: 0.82, duration: 1.5, ease: 'power1.inOut' }, 0.5);

      // =====================================================================
      // MOVIMIENTO B -> C: DESPLAZAMIENTO Y SÁNDWICH DE BARRA
      // =====================================================================
      tl.to(secBRef.current, { opacity: 0, y: -25, duration: 0.8, ease: 'power1.in' }, 2.2);
      tl.to(
        hlContainerRef.current,
        {
          x: isMobile ? -25 : -200,
          y: isMobile ? -95 : 10,
          scale: isMobile ? 1.05 : 1.15,
          rotation: isMobile ? -3 : -3,
          duration: 2.0,
          ease: 'power1.inOut',
        },
        2.2
      );

      tl.to(hlImgBurgerRef.current, { opacity: 0, scale: 1.2, duration: 1.2, ease: 'power2.inOut' }, 2.4);
      tl.to(hlImgSandwichRef.current, { opacity: 1, scale: 1.05, duration: 1.4, ease: 'power2.inOut' }, 2.5);
      tl.to(secCRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 2.8);

      // =====================================================================
      // MOVIMIENTO C -> D: PINTXOS EN EL CENTRO
      // =====================================================================
      tl.to(secCRef.current, { opacity: 0, y: -25, duration: 0.8, ease: 'power1.in' }, 4.4);
      tl.to(
        hlContainerRef.current,
        {
          x: 0,
          y: isMobile ? -90 : -20,
          scale: isMobile ? 1.10 : 1.35,
          rotation: 0,
          duration: 2.0,
          ease: 'power1.inOut',
        },
        4.4
      );

      tl.to(hlImgSandwichRef.current, { opacity: 0, scale: 1.18, duration: 1.2, ease: 'power2.inOut' }, 4.6);
      tl.to(hlImgPintxosRef.current, { opacity: 1, scale: 1.03, duration: 1.4, ease: 'power2.inOut' }, 4.7);
      tl.to(secDRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, 5.0);
      tl.to(hlBezelRef.current, { opacity: 0.45, duration: 1.2, ease: 'power1.out' }, 5.2);

      // =====================================================================
      // MOVIMIENTO D -> E: EL FARO SE CONVIERTE EN FOTOGRAFÍA AMPLIA
      // =====================================================================
      tl.to(secDRef.current, { opacity: 0, y: -25, duration: 0.7, ease: 'power1.in' }, 6.6);
      tl.to(hlTagRef.current, { opacity: 0, scale: 0.5, duration: 0.5 }, 6.6);
      tl.to(hlBezelRef.current, { opacity: 0, duration: 0.8, ease: 'power2.out' }, 6.8);

      tl.to(
        hlInnerRef.current,
        {
          borderRadius: '16px',
          duration: 1.6,
          ease: 'power2.inOut',
        },
        6.8
      );

      tl.to(
        hlContainerRef.current,
        {
          width: isMobile ? 350 : 720,
          height: isMobile ? 210 : 380,
          scale: 1.0,
          y: isMobile ? -130 : -70,
          x: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        6.8
      );

      tl.to(bgOverlayRef.current, { opacity: 0.94, duration: 1.2 }, 6.8);
      tl.to(secERef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 7.2);
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="faro-viajero-section" ref={trackRef} className="relative w-full h-[280vh] bg-[#0c0b0a] border-b-8 border-black">
      {/* PINNED STAGE VIEWPORT */}
      <div
        ref={stageRef}
        className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      >
        {/* PUNK WALLPAPER */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.85,
          }}
        />

        {/* DYNAMIC TRANSITION OVERLAY */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #181615 15%, #0e0d0c 85%)',
            opacity: 0.15,
            transition: 'opacity 0.2s linear',
          }}
        />

        {/* TOP STATUS RIBBON */}
        <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 bg-black/85 px-3 py-1.5 border border-[#33302c] shadow-[3px_3px_0_#000] backdrop-blur-sm pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-[#f5efe1] font-bold uppercase tracking-wider hidden sm:inline">
              // GASTRONOMÍA GRAFIT:
            </span>
            <span className="text-[#e2c044] font-bold">EL FARO VIAJERO</span>
          </div>

          <div className="bg-black/85 px-3 py-1.5 border border-[#33302c] shadow-[3px_3px_0_#000] backdrop-blur-sm flex items-center gap-2 pointer-events-none">
            <span className="text-[#9c9488]">Fase: <strong className="text-[#f5efe1]">{activeZone}</strong></span>
            <span className="text-[#e2c044] font-bold">{currentProgress}%</span>
          </div>
        </div>

        {/* TRAVELING HEADLIGHT COMPONENT */}
        <div className="relative z-30 flex items-center justify-center">
          <HeadlightTraveler
            containerRef={hlContainerRef}
            bezelRef={hlBezelRef}
            innerRef={hlInnerRef}
            glassRef={hlGlassRef}
            imgBurgerRef={hlImgBurgerRef}
            imgSandwichRef={hlImgSandwichRef}
            imgPintxosRef={hlImgPintxosRef}
            tagRef={hlTagRef}
            tagText={
              activeZone === 'B'
                ? 'BURGER 100% BUEY'
                : activeZone === 'C'
                ? 'SÁNDWICH DE BARRA'
                : activeZone === 'D'
                ? 'BARRA DE PINTXOS'
                : 'GRAFIT CAFÉ'
            }
          />
        </div>

        {/* ================================================================= */}
        {/* NARRATIVE CARDS OVERLAYS                                          */}
        {/* ================================================================= */}

        {/* SECTION A: ARRIVAL */}
        <div
          ref={secARef}
          className="absolute z-35 px-4 text-center w-[92%] max-w-sm pointer-events-none"
          style={{ bottom: '26px' }}
        >
          <div className="inline-block bg-[#b91c1c] text-white font-mono text-[11px] font-bold px-2.5 py-0.5 mb-1.5 tracking-widest shadow-[3px_3px_0_#000]">
            MOVIMIENTO A • LLEGADA DEL FARO
          </div>
          <h2 className="font-['Anton'] text-2xl sm:text-4xl text-[#f5efe1] uppercase tracking-wide leading-none drop-shadow-md mb-1.5">
            El Faro Viajero
          </h2>
          <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#ded8cb] max-w-xs mx-auto mb-3 drop-shadow leading-snug">
            Procedente de la Volkswagen del Hero, el faro desciende guiando el viaje por nuestra cocina.
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#e2c044] bg-black/80 px-3 py-1 border border-[#e2c044] shadow-[3px_3px_0_#000]">
            <span className="animate-bounce">↓</span> CONTINÚA CON EL SCROLL <span className="animate-bounce">↓</span>
          </div>
        </div>

        {/* SECTION B: BURGER */}
        <div
          ref={secBRef}
          className="absolute z-35 px-3 pointer-events-none w-[94%] max-w-sm"
          style={{ bottom: '22px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <SectionCard
            stepNumber="01"
            badgeText="Movimiento B"
            badgeColor="red"
            title="Gastronomía con Carácter"
            subtitle="Burger 100% Buey"
            description="Carne de buey de primera calidad, queso fundido, bacon crujiente y pan rústico. El faro enmarca el sabor más contundente de nuestra cocina."
            align="center"
          />
        </div>

        {/* SECTION C: SANDWICH */}
        <div
          ref={secCRef}
          className="absolute z-35 px-3 pointer-events-none w-[94%] max-w-sm"
          style={{ bottom: '22px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <SectionCard
            stepNumber="02"
            badgeText="Movimiento C"
            badgeColor="gold"
            title="Plancha y Picoteo"
            subtitle="Sándwich de Barra a la Plancha"
            description="El faro se desplaza lateralmente mientras la hamburguesa muta en sándwich caliente. Hamburguesas 100% buey y sándwiches recién hechos en el corazón de Indautxu."
            align="center"
          />
        </div>

        {/* SECTION D: PINTXOS */}
        <div
          ref={secDRef}
          className="absolute z-35 px-3 pointer-events-none w-[94%] max-w-sm"
          style={{ bottom: '22px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <SectionCard
            stepNumber="03"
            badgeText="Movimiento D"
            badgeColor="cream"
            title="Barra y Tradición"
            subtitle="Pintxos Artesanos"
            description="El faro crece de diámetro en el centro y su aro cromado se suaviza. Los pintxos de barra se apoderan de la superficie visual con máxima frescura."
            align="center"
          />
        </div>

        {/* SECTION E: EXPANSION TO WIDE PHOTO & CTAs */}
        <div
          ref={secERef}
          className="absolute z-35 px-3 text-center w-[94%] max-w-sm pointer-events-none"
          style={{ bottom: '16px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="inline-block bg-[#16a34a] text-white font-mono text-[10px] font-bold px-2 py-0.5 mb-1 tracking-widest shadow-[2px_2px_0_#000]">
            MOVIMIENTO E • FOTOGRAFÍA AMPLIA
          </div>
          <h2 className="font-['Anton'] text-lg sm:text-2xl text-[#f5efe1] uppercase tracking-wide mb-1 leading-tight">
            Sabores que Acompañan tus Momentos
          </h2>
          <p className="font-['Space_Grotesk'] text-[11px] sm:text-xs text-[#b8b0a2] max-w-xs mx-auto mb-2.5 leading-snug">
            La óptica de la furgoneta se ha expandido en nuestra presentación gastronómica completa. En barra o para tus celebraciones en el salón multiusos.
          </p>

          <div className="flex flex-col gap-2 pointer-events-auto">
            <button
              onClick={() => onNavigate('/carta')}
              className="bg-[#b91c1c] text-white font-['Anton'] text-xs sm:text-sm tracking-wider py-2 px-3 uppercase border border-black shadow-[3px_3px_0_#000] hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>★ VER CARTA COMPLETA ★</span>
            </button>
            <button
              onClick={() => onNavigate('/contacto?tipo=comida-grupo')}
              className="bg-[#f5efe1] text-black font-['Anton'] text-xs sm:text-sm tracking-wider py-2 px-3 uppercase border border-black shadow-[3px_3px_0_#000] hover:bg-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>★ ORGANIZA UNA COMIDA DE GRUPO ★</span>
            </button>
          </div>

          <p className="font-mono text-[10px] text-[#9c9488] mt-2 tracking-wider">
            URRUTIA KALEA 1 • INDAUTXU (BILBAO)
          </p>
        </div>

        {/* BOTTOM SCROLL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#222] z-50">
          <div
            className="h-full bg-[#e2c044] transition-all duration-75"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
