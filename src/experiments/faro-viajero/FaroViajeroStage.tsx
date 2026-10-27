import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeadlightTraveler } from './HeadlightTraveler';
import { SectionCard } from './SectionCard';

gsap.registerPlugin(ScrollTrigger);

interface FaroViajeroStageProps {
  reducedMotion?: boolean;
}

export const FaroViajeroStage: React.FC<FaroViajeroStageProps> = ({ reducedMotion = false }) => {
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

  // Dynamic state for label and progress
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeZone, setActiveZone] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  const jumpToZone = (zone: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const targets = { A: 0.05, B: 0.32, C: 0.55, D: 0.78, E: 0.95 };
    const targetP = targets[zone];
    const st = ScrollTrigger.getById('faroMaster');
    if (st) {
      const scrollPos = st.start + targetP * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.getAll().forEach(t => t.kill());
      return;
    }

    const ctx = gsap.context(() => {
      // Determine screen layout width
      const isMobile = window.innerWidth < 768;

      // 1. PINNED MASTER TIMELINE SYNCHRONIZED WITH SCROLL
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'faroMaster',
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stageRef.current,
          scrub: 1, // Smooth, bidirectional scrub
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

      // Check URL parameters for instant inspection
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get('step')?.toUpperCase();
      const pParam = params.get('p');
      let targetP = 0;
      if (pParam) targetP = parseFloat(pParam);
      else if (stepParam === 'A') targetP = 0.05;
      else if (stepParam === 'B') targetP = 0.32;
      else if (stepParam === 'C') targetP = 0.55;
      else if (stepParam === 'D') targetP = 0.78;
      else if (stepParam === 'E') targetP = 0.95;

      if (targetP > 0) {
        setTimeout(() => {
          const st = ScrollTrigger.getById('faroMaster');
          if (st) {
            const scrollPos = st.start + targetP * (st.end - st.start);
            window.scrollTo(0, scrollPos);
          }
        }, 120);
      }

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
      // Headlight enters from top of screen to primary focal point
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

      // Section A fades out
      tl.to(
        secARef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: 'power1.out',
        },
        0.6
      );

      // Glass fluting fades out, Burger reveals
      tl.to(
        hlGlassRef.current,
        {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        0.8
      );

      tl.to(
        hlImgBurgerRef.current,
        {
          opacity: 1,
          scale: 1.04,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.8
      );

      // Section B (Burger card) fades in
      tl.to(
        secBRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        1.0
      );

      // Headlight tag pops in
      tl.to(
        hlTagRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
        },
        1.2
      );

      // Background transition from busy posters to warm dark focus
      tl.to(
        bgOverlayRef.current,
        {
          opacity: 0.82,
          duration: 1.5,
          ease: 'power1.inOut',
        },
        0.5
      );

      // =====================================================================
      // MOVIMIENTO B -> C: TRANSFORMACIÓN Y DESPLAZAMIENTO A SÁNDWICH
      // =====================================================================
      // Section B fades out
      tl.to(
        secBRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: 'power1.in',
        },
        2.2
      );

      // Headlight travels diagonally across viewport to opposite side
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

      // Continuous transformation: Burger slides/crossfades to Sandwich
      tl.to(
        hlImgBurgerRef.current,
        {
          opacity: 0,
          scale: 1.2,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        2.4
      );

      tl.to(
        hlImgSandwichRef.current,
        {
          opacity: 1,
          scale: 1.05,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        2.5
      );

      // Section C (Sandwich card) fades in
      tl.to(
        secCRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        2.8
      );

      // =====================================================================
      // MOVIMIENTO C -> D: TERCERA TRANSFORMACIÓN (PINTXOS EN EL CENTRO)
      // =====================================================================
      // Section C fades out
      tl.to(
        secCRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.8,
          ease: 'power1.in',
        },
        4.4
      );

      // Headlight returns towards center, expanding diameter
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

      // Sandwich crossfades to Pintxos
      tl.to(
        hlImgSandwichRef.current,
        {
          opacity: 0,
          scale: 1.18,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        4.6
      );

      tl.to(
        hlImgPintxosRef.current,
        {
          opacity: 1,
          scale: 1.03,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        4.7
      );

      // Section D (Pintxos card) fades in
      tl.to(
        secDRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        5.0
      );

      // Bezel begins to soften
      tl.to(
        hlBezelRef.current,
        {
          opacity: 0.45,
          duration: 1.2,
          ease: 'power1.out',
        },
        5.2
      );

      // =====================================================================
      // MOVIMIENTO D -> E: EL FARO SE CONVIERTE EN FOTOGRAFÍA AMPLIA
      // =====================================================================
      // Section D fades out
      tl.to(
        secDRef.current,
        {
          opacity: 0,
          y: -25,
          duration: 0.7,
          ease: 'power1.in',
        },
        6.6
      );

      // Tag hides
      tl.to(
        hlTagRef.current,
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
        },
        6.6
      );

      // Chrome bezel completely fades away
      tl.to(
        hlBezelRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        6.8
      );

      // Headlight aperture expands and morphs: circle -> wide card
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

      // Background reaches full deep graphite elegance
      tl.to(
        bgOverlayRef.current,
        {
          opacity: 0.94,
          duration: 1.2,
        },
        6.8
      );

      // Section E (Commercial Closing & CTAs) blooms in
      tl.to(
        secERef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        7.2
      );
    }, stageRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // REDUCED MOTION STATIC PRESENTATION (ACCESSIBLE FALLBACK)
  if (reducedMotion) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 text-[#f5efe1]">
        <div className="p-6 bg-[#1a1816] border-2 border-[#b91c1c] mb-10 shadow-[6px_6px_0_#000]">
          <span className="font-mono text-xs uppercase bg-[#b91c1c] text-white px-2 py-1 font-bold">
            Modo Accesible • Movimiento Reducido
          </span>
          <h2 className="font-['Anton'] text-3xl uppercase tracking-wide mt-3 mb-2">
            Gastronomía Grafit Café
          </h2>
          <p className="font-['Space_Grotesk'] text-sm text-[#b8b0a2]">
            Presentación estática y directa de nuestras tres propuestas gastronómicas emblemáticas, adaptada para usuarios con preferencia de movimiento reducido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Burger */}
          <div className="bg-[#181615] border-2 border-[#33302c] overflow-hidden shadow-[6px_6px_0_#000]">
            <div className="aspect-square overflow-hidden bg-black">
              <img src="./assets/grafit/instagram/burguer.webp" alt="Burger 100% Buey" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-[#e2c044] font-bold">01 • CARÁCTER</span>
              <h3 className="font-['Anton'] text-xl text-[#f5efe1] uppercase mt-1">Burger 100% Buey</h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#b8b0a2] mt-2">
                Carne seleccionada, pan artesano tostado y receta propia en el corazón de Indautxu.
              </p>
            </div>
          </div>

          {/* Card 2: Sandwich */}
          <div className="bg-[#181615] border-2 border-[#33302c] overflow-hidden shadow-[6px_6px_0_#000]">
            <div className="aspect-square overflow-hidden bg-black">
              <img src="./assets/grafit/instagram/sandwich-barra.jpg" alt="Sándwich de barra" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-[#e2c044] font-bold">02 • PLANCHA & PICOTEO</span>
              <h3 className="font-['Anton'] text-xl text-[#f5efe1] uppercase mt-1">Sándwich a la Plancha</h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#b8b0a2] mt-2">
                Hamburguesas 100% buey y sándwiches recién preparados en barra.
              </p>
            </div>
          </div>

          {/* Card 3: Pintxos */}
          <div className="bg-[#181615] border-2 border-[#33302c] overflow-hidden shadow-[6px_6px_0_#000]">
            <div className="aspect-square overflow-hidden bg-black">
              <img src="./assets/grafit/instagram/pintxos.jpg" alt="Pintxos artesanos" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-[#e2c044] font-bold">03 • TRADICIÓN</span>
              <h3 className="font-['Anton'] text-xl text-[#f5efe1] uppercase mt-1">Barra de Pintxos</h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#b8b0a2] mt-2">
                Clásicos vascos y bocados recién elaborados para acompañar tu cerveza o café.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="p-8 bg-[#181615] border-3 border-[#e2c044] text-center shadow-[8px_8px_0_#000]">
          <h3 className="font-['Anton'] text-2xl uppercase tracking-wider text-[#f5efe1] mb-2">
            Tu próxima experiencia empieza en Grafit
          </h3>
          <p className="font-mono text-xs text-[#e2c044] mb-6">URRUTIA KALEA 1 • INDAUTXU (BILBAO)</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#b91c1c] text-white font-['Anton'] text-base tracking-widest px-6 py-3 uppercase border-2 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:bg-red-700">
              ★ Descubre Nuestra Gastronomía ★
            </button>
            <button className="bg-[#e2c044] text-black font-['Anton'] text-base tracking-widest px-6 py-3 uppercase border-2 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:bg-yellow-400">
              ★ Organiza una Comida de Grupo ★
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD INTERACTIVE SCROLL STAGE
  return (
    <div ref={trackRef} className="faro-viajero-track relative w-full h-[520vh] bg-[#0c0b0a]">
      {/* PINNED STAGE VIEWPORT (Fixed during scroll) */}
      <div
        ref={stageRef}
        className="faro-viajero-stage relative w-full h-screen overflow-hidden flex flex-col items-center justify-center select-none"
      >
        {/* BACKGROUND 1: AUTHENTIC PUNK WALLPOSTER WALLPAPER */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.85,
          }}
        />

        {/* BACKGROUND 2: DYNAMIC TRANSITION OVERLAY (Fades to clean dark graphite) */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #181615 15%, #0e0d0c 85%)',
            opacity: 0.15,
            transition: 'opacity 0.2s linear',
          }}
        />

        {/* TOP STATUS RIBBON: CONTINUITY CONTEXT & QUICK JUMP */}
        <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 border border-[#33302c] shadow-[3px_3px_0_#000] backdrop-blur-sm pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-[#f5efe1] font-bold uppercase tracking-wider hidden sm:inline">
              // Continuidad Hero V3:
            </span>
            <span className="text-[#e2c044]">Faro Izquierdo</span>
          </div>

          {/* QUICK JUMP PILLS */}
          <div className="flex items-center gap-1 bg-black/90 p-1 border border-[#33302c] shadow-[3px_3px_0_#000] backdrop-blur-sm pointer-events-auto">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((step) => (
              <button
                key={step}
                onClick={() => jumpToZone(step)}
                title={`Saltar a Movimiento ${step}`}
                className={`px-2 py-0.5 text-[11px] font-bold transition-all cursor-pointer ${
                  activeZone === step
                    ? 'bg-[#e2c044] text-black shadow-[2px_2px_0_#000]'
                    : 'text-[#9c9488] hover:text-[#f5efe1]'
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          <div className="bg-black/80 px-3 py-1.5 border border-[#33302c] shadow-[3px_3px_0_#000] backdrop-blur-sm flex items-center gap-3 pointer-events-none">
            <span className="text-[#9c9488]">Fase: <strong className="text-[#f5efe1]">{activeZone}</strong></span>
            <span className="text-[#e2c044] font-bold">{currentProgress}%</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* THE TRAVELING HEADLIGHT COMPONENT                                 */}
        {/* ================================================================= */}
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
        {/* NARRATIVE CARDS OVERLAYS (Positioned compatible with mobile)       */}
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
            Procedente de la Volkswagen del Hero, el faro desciende por la página transformándose en la propuesta gastronómica de Grafit.
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#e2c044] bg-black/80 px-3 py-1 border border-[#e2c044] shadow-[3px_3px_0_#000]">
            <span className="animate-bounce">↓</span> SCROLL HACIA ABAJO PARA VIAJAR <span className="animate-bounce">↓</span>
          </div>
        </div>

        {/* SECTION B: BURGER (Positioned opposite to headlight) */}
        <div
          ref={secBRef}
          className="absolute z-35 px-3 pointer-events-none w-[94%] max-w-sm"
          style={{
            bottom: '22px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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
          style={{
            bottom: '22px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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
          style={{
            bottom: '22px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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
          style={{
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
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

          {/* COMMERCIAL CTAS (Clickable) */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            <a
              href="#gastronomia"
              onClick={(e) => { e.preventDefault(); alert('Enlace comercial listo para conectar con /carta'); }}
              className="bg-[#b91c1c] text-white font-['Anton'] text-xs sm:text-sm tracking-wider py-2 px-3 uppercase border border-black shadow-[3px_3px_0_#000] hover:bg-red-700 transition-colors"
            >
              ★ Descubre Nuestra Gastronomía ★
            </a>
            <a
              href="#grupos"
              onClick={(e) => { e.preventDefault(); alert('Enlace comercial listo para conectar con /eventos'); }}
              className="bg-[#e2c044] text-black font-['Anton'] text-xs sm:text-sm tracking-wider py-2 px-3 uppercase border border-black shadow-[3px_3px_0_#000] hover:bg-yellow-400 transition-colors"
            >
              ★ Organiza una Comida de Grupo ★
            </a>
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
