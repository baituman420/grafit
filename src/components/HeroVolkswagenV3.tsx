import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RotateCcw, Calendar, ArrowDown, MapPin } from 'lucide-react';

interface HeroVolkswagenV3Props {
  onNavigate: (path: string) => void;
  onExploreGastronomy?: () => void;
}

interface LetterConfig {
  char: string;
  bg: string;
  color: string;
  border: string;
  baseRot: number;
  deltaX: number;
  deltaY: number;
  deltaRot: number;
  font: string;
}

const RANSOM_LETTERS: LetterConfig[] = [
  {
    char: 'G',
    bg: '#0a0a0a',
    color: '#ebe5d8',
    border: '3px solid #ffffff',
    baseRot: -4,
    deltaX: -110,
    deltaY: -140,
    deltaRot: -30,
    font: "font-['Anton']",
  },
  {
    char: 'R',
    bg: '#b91c1c',
    color: '#ffffff',
    border: '3px solid #000000',
    baseRot: 3,
    deltaX: -60,
    deltaY: -190,
    deltaRot: 25,
    font: "font-['Anton']",
  },
  {
    char: 'A',
    bg: '#fdfbf7',
    color: '#0a0a0a',
    border: '3px solid #000000',
    baseRot: -2,
    deltaX: -10,
    deltaY: -220,
    deltaRot: -20,
    font: "font-['Anton']",
  },
  {
    char: 'F',
    bg: '#0a0a0a',
    color: '#ffffff',
    border: '3px solid #ffffff',
    baseRot: 5,
    deltaX: 40,
    deltaY: -190,
    deltaRot: 26,
    font: "font-['Anton']",
  },
  {
    char: 'I',
    bg: '#e2c044',
    color: '#000000',
    border: '3px solid #000000',
    baseRot: -1,
    deltaX: 90,
    deltaY: -150,
    deltaRot: -22,
    font: "font-['Anton']",
  },
  {
    char: 'T',
    bg: '#0a0a0a',
    color: '#ffffff',
    border: '3px solid #000000',
    baseRot: 3,
    deltaX: 140,
    deltaY: -110,
    deltaRot: 32,
    font: "font-['Anton']",
  },
];

export const HeroVolkswagenV3: React.FC<HeroVolkswagenV3Props> = ({
  onNavigate,
  onExploreGastronomy,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vanWrapperRef = useRef<HTMLDivElement>(null);
  const vanBodyRef = useRef<HTMLImageElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const hlLeftRef = useRef<HTMLDivElement>(null);
  const hlRightRef = useRef<HTMLDivElement>(null);
  const hlLeftGlowRef = useRef<HTMLDivElement>(null);
  const hlRightGlowRef = useRef<HTMLDivElement>(null);
  const hlLeftBeamRef = useRef<HTMLDivElement>(null);
  const hlRightBeamRef = useRef<HTMLDivElement>(null);
  const hlLeftGlassRef = useRef<HTMLDivElement>(null);
  const hlRightGlassRef = useRef<HTMLDivElement>(null);
  const ctaOverlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);

  const runHeroAnimation = () => {
    if (!containerRef.current || !vanWrapperRef.current) return;

    const isMobile = window.innerWidth < 768;

    // Reset initial states
    gsap.killTweensOf([
      containerRef.current,
      vanWrapperRef.current,
      emblemRef.current,
      hlLeftRef.current,
      hlRightRef.current,
      hlLeftGlowRef.current,
      hlRightGlowRef.current,
      hlLeftBeamRef.current,
      hlRightBeamRef.current,
      hlLeftGlassRef.current,
      hlRightGlassRef.current,
      ctaOverlayRef.current,
      ...lettersRef.current,
    ]);

    // Initial setup
    gsap.set(vanWrapperRef.current, {
      y: isMobile ? 650 : 800,
      scale: 0.65,
      opacity: 0,
    });

    gsap.set(emblemRef.current, {
      scale: 1,
      y: 0,
      rotation: 0,
      opacity: 1,
    });

    gsap.set([hlLeftRef.current, hlRightRef.current], {
      scale: 1,
      filter: 'brightness(1)',
    });

    gsap.set([hlLeftGlassRef.current, hlRightGlassRef.current], {
      opacity: 0.9,
    });

    gsap.set([hlLeftGlowRef.current, hlRightGlowRef.current], {
      opacity: 0,
    });

    gsap.set([hlLeftBeamRef.current, hlRightBeamRef.current], {
      opacity: 0,
      scale: 0.85,
    });

    gsap.set(ctaOverlayRef.current, {
      opacity: 0,
      y: 30,
    });

    // Reset letters in center
    lettersRef.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          x: 0,
          y: 0,
          rotation: RANSOM_LETTERS[i].baseRot,
          scale: 0.4,
          opacity: 0,
        });
      }
    });

    const masterTl = gsap.timeline();

    // 1. Letters Intro (0.2s - 0.7s)
    masterTl.to(lettersRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.7)',
    }, 0.2);

    // 2. Van charges from below (0.6s - 1.2s)
    masterTl.to(vanWrapperRef.current, {
      y: 0,
      scale: 1.0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.in',
    }, 0.6);

    // 3. Impact & Collision (1.2s - 1.6s)
    // Screen shake
    masterTl.to(containerRef.current, {
      x: 'random(-16, 16)',
      y: 'random(-12, 12)',
      duration: 0.05,
      repeat: 7,
      yoyo: true,
      ease: 'none',
      onComplete: () => {
        gsap.set(containerRef.current, { x: 0, y: 0 });
      },
    }, 1.2);

    // Van recoil
    masterTl.to(vanWrapperRef.current, {
      scale: 0.94,
      y: 15,
      duration: 0.1,
      ease: 'power2.out',
    }, 1.25);

    masterTl.to(vanWrapperRef.current, {
      scale: 1.03,
      y: -6,
      duration: 0.2,
      ease: 'power1.out',
    }, 1.35);

    masterTl.to(vanWrapperRef.current, {
      scale: 1.0,
      y: 0,
      duration: 0.25,
      ease: 'elastic.out(1, 0.4)',
    }, 1.55);

    // Letters hit reaction: violent scatter
    lettersRef.current.forEach((el, i) => {
      if (el) {
        masterTl.to(el, {
          x: RANSOM_LETTERS[i].deltaX * (isMobile ? 0.75 : 1.2),
          y: RANSOM_LETTERS[i].deltaY * (isMobile ? 0.75 : 1.1),
          rotation: RANSOM_LETTERS[i].baseRot + RANSOM_LETTERS[i].deltaRot,
          duration: 0.35,
          ease: 'power4.out',
        }, 1.22);

        // Letters elastic spring back and dock to top position
        masterTl.to(el, {
          x: 0,
          y: isMobile ? -24 : -36,
          rotation: RANSOM_LETTERS[i].baseRot,
          scale: isMobile ? 0.85 : 1.0,
          duration: 0.8,
          ease: 'elastic.out(1.1, 0.45)',
        }, 1.65);
      }
    });

    // 4. Headlights Ignition Sequence (1.8s - 2.5s)
    // Electrical switch click & micro-spark
    masterTl.to([hlLeftGlowRef.current, hlRightGlowRef.current], {
      opacity: 0.45,
      duration: 0.06,
    }, 1.82);

    masterTl.to([hlLeftGlowRef.current, hlRightGlowRef.current], {
      opacity: 0.1,
      duration: 0.05,
    }, 1.88);

    // Full warm tungsten & halogen ignition bloom
    masterTl.to([hlLeftGlowRef.current, hlRightGlowRef.current], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 1.93);

    // Subtle physical vibration / kick on the headlight housings
    masterTl.to([hlLeftRef.current, hlRightRef.current], {
      scale: 1.06,
      duration: 0.18,
      ease: 'back.out(2)',
    }, 1.93);

    masterTl.to([hlLeftRef.current, hlRightRef.current], {
      scale: 1.0,
      duration: 0.25,
      ease: 'power1.out',
    }, 2.11);

    // Forward beam flare blossoms into the atmosphere
    masterTl.to([hlLeftBeamRef.current, hlRightBeamRef.current], {
      opacity: 0.85,
      scale: 1.1,
      duration: 0.6,
      ease: 'power2.out',
    }, 1.98);

    // 5. Commercial Banners & CTAs Bloom (2.4s - 3.1s)
    masterTl.to(ctaOverlayRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 2.4);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (hlLeftGlowRef.current && hlRightGlowRef.current) {
        gsap.set([hlLeftGlowRef.current, hlRightGlowRef.current], { opacity: 1 });
      }
      if (hlLeftBeamRef.current && hlRightBeamRef.current) {
        gsap.set([hlLeftBeamRef.current, hlRightBeamRef.current], { opacity: 0.8, scale: 1 });
      }
      if (ctaOverlayRef.current) {
        gsap.set(ctaOverlayRef.current, { opacity: 1, y: 0 });
      }
      return;
    }

    runHeroAnimation();

    const handleResize = () => {
      // Refresh layout if needed
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0c0b0a] text-[#f5efe1] border-b-8 border-black select-none">
      {/* 1. AUTHENTIC PUNK WALLPOSTER WALLPAPER WITH DEPTH */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-luminosity"
        style={{
          backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
        }}
      />
      {/* ATMOSPHERIC RADIAL VIGNETTE - CLEAN OPEN STAGE FROM PIXEL 0 */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 36%, rgba(28,24,22,0.15) 0%, rgba(12,11,10,0.72) 55%, #0c0b0a 100%)',
        }}
      />

      {/* MAIN ANIMATED STAGE */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto px-4 pt-8 pb-8 sm:pt-10 sm:pb-12 flex flex-col items-center justify-center min-h-[560px] sm:min-h-[640px]"
      >
        {/* ================================================================= */}
        {/* RANSOM WOODBLOCK LETTERS HEADER (G R A F I T)                      */}
        {/* ================================================================= */}
        <div className="relative z-20 flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 mb-5 sm:mb-7">
          {RANSOM_LETTERS.map((letter, i) => (
            <div
              key={letter.char}
              ref={(el) => { lettersRef.current[i] = el; }}
              className={`w-11 h-15 sm:w-15 sm:h-22 md:w-18 md:h-26 flex items-center justify-center ${letter.font} text-3xl sm:text-5xl md:text-6xl shadow-[4px_4px_0_#000]`}
              style={{
                backgroundColor: letter.bg,
                color: letter.color,
                border: letter.border,
                transform: `rotate(${letter.baseRot}deg)`,
              }}
            >
              {letter.char}
            </div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* PANORAMIC SCENIC STAGE (UNBOXED IDENTITY + VAN + DIRECT NAV)      */}
        {/* ================================================================= */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center gap-6 lg:gap-10 xl:gap-14">
          
          {/* DESKTOP SCENIC WING LEFT: INTEGRATED EDITORIAL IDENTITY (NO BOX/CARD) */}
          <div className="hidden lg:flex flex-col items-end w-64 xl:w-72 shrink-0 self-center relative z-20 text-right select-text">
            {/* Live Status indicator */}
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-[#e2c044] font-bold">
                LOCAL AUTÉNTICO • BILBAO
              </span>
            </div>

            {/* Editorial Title */}
            <div>
              <h1 className="font-anton text-5xl xl:text-6xl text-[#f5efe1] uppercase tracking-wider leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                GRAFIT
              </h1>
              <div className="flex items-center justify-end gap-2 mt-1.5">
                <span className="h-[2px] w-8 bg-[#b91c1c]" />
                <p className="font-mono text-xs xl:text-sm text-[#ded8cb] font-bold uppercase tracking-widest">
                  ROCK CAFÉ <span className="text-[#b91c1c]">//</span> INDAUTXU
                </p>
              </div>
            </div>

            {/* Location & Access details */}
            <div className="mt-5 space-y-1 font-mono text-xs xl:text-sm text-[#ded8cb]/90">
              <p className="font-bold text-white flex items-center justify-end gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                <span>URRUTIA KALEA 1</span>
                <MapPin className="w-4 h-4 text-[#b91c1c] shrink-0" />
              </p>
              <p className="text-neutral-400 text-xs">48010 Indautxu, Bilbao</p>
              <p className="text-[#e2c044] font-mono text-[10px] uppercase tracking-wider pt-0.5">
                ★ A 3 MIN DEL METRO INDAUTXU
              </p>
            </div>

            {/* Editorial Atmosphere Badges - Clean Text Lines */}
            <div className="mt-5 pt-3 border-t border-white/10 flex flex-col items-end gap-1.5 font-mono text-[10px] xl:text-[11px] uppercase text-neutral-300">
              <span className="text-[#ded8cb] hover:text-white transition-colors">
                ★ SALÓN MULTIUSOS DECORADO
              </span>
              <span className="text-[#ded8cb] hover:text-white transition-colors">
                ★ HAMBURGUESAS 100% BUEY & PICOTEO
              </span>
              <span className="text-[#b91c1c] font-bold">
                ★ ESPÍRITU ATHLETIC CLUB
              </span>
            </div>
          </div>

          {/* CENTRAL VOLKSWAGEN STRUCTURE (MOBILE 92-95% / DESKTOP ANCHOR) */}
          <div
            ref={vanWrapperRef}
            className="relative w-full max-w-[370px] sm:max-w-[440px] md:max-w-[480px] aspect-[720/900] mx-auto select-none shrink-0 z-20"
          >
            {/* PODIUM SHADOWS */}
            <img
              src="./assets/grafit/motion/van/layers/layer_09_podium_shadows.png"
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
            />

          {/* PRISTINE CHASSIS BODY LAYER */}
          <img
            ref={vanBodyRef}
            src="./assets/grafit/motion/van/layers/layer_02_half_van_complete.png"
            alt="Volkswagen T1 Decorativa Grafit"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />

          {/* WINDSHIELD GLASS */}
          <img
            src="./assets/grafit/motion/van/layers/layer_07_windshield_glass.png"
            alt=""
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-15 opacity-90"
          />

          {/* LICENSE PLATE */}
          <img
            src="./assets/grafit/motion/van/layers/layer_06_license_plate.png"
            alt="Matrícula Grafit"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
          />

          {/* =============================================================== */}
          {/* A. THE VW EMBLEM (CLEAN, PROUD & ICONIC - REAL REFERENCE)       */}
          {/* =============================================================== */}
          <div
            ref={emblemRef}
            className="absolute z-25 flex items-center justify-center pointer-events-none"
            style={{
              left: '41.8%',
              top: '36.2%',
              width: '21.0%',
              height: '16.8%',
            }}
          >
            <img
              src="./assets/grafit/motion/van/layers/layer_03_vw_emblem.png"
              alt="Emblema Volkswagen"
              className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* =============================================================== */}
          {/* B. LEFT HEADLIGHT (WARM HALOGEN/INCANDESCENT ILLUMINATION)       */}
          {/* =============================================================== */}
          <div
            ref={hlLeftRef}
            className="absolute z-30 flex items-center justify-center select-none"
            style={{
              left: '12.0%',
              top: '50.5%',
              width: '19.2%',
              height: '15.4%',
              transformOrigin: 'center center',
            }}
          >
            {/* Atmospheric Forward Projection Beam / Flare */}
            <div
              ref={hlLeftBeamRef}
              className="absolute -top-[65%] -left-[65%] w-[230%] h-[230%] rounded-full pointer-events-none z-30 mix-blend-screen opacity-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,248,220,0.85) 0%, rgba(250,204,21,0.45) 30%, rgba(234,179,8,0.18) 55%, transparent 75%)',
                filter: 'blur(16px)',
              }}
            />

            {/* High-fidelity Vector SVG Chrome Bezel & Fluted Lens */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#181614] border-2 border-[#999] shadow-[0_8px_24px_rgba(0,0,0,0.9)] z-10">
              {/* Glass fluting texture */}
              <div ref={hlLeftGlassRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <img
                  src="./assets/grafit/motion/van/layers/headlight_glass_centered.png"
                  alt=""
                  className="w-full h-full object-cover brightness-105 contrast-125"
                />
              </div>

              {/* Warm Incandescent Filament & Radial Core Glow (Above glass for authentic internal bulb glow) */}
              <div
                ref={hlLeftGlowRef}
                className="absolute inset-0 rounded-full z-20 pointer-events-none mix-blend-screen flex items-center justify-center opacity-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,250,1) 0%, rgba(254,240,138,0.95) 25%, rgba(234,179,8,0.8) 55%, rgba(180,83,9,0.3) 80%, transparent 100%)',
                }}
              >
                {/* Hot incandescent filament core point */}
                <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_14px_6px_rgba(255,255,255,0.95),0_0_28px_10px_rgba(250,204,21,0.85)]" />
              </div>

              {/* Chrome rim specular gleam */}
              <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none z-30" />
            </div>
          </div>

          {/* =============================================================== */}
          {/* C. RIGHT HEADLIGHT (WARM HALOGEN/INCANDESCENT ILLUMINATION)      */}
          {/* =============================================================== */}
          <div
            ref={hlRightRef}
            className="absolute z-30 flex items-center justify-center select-none"
            style={{
              left: '70%',
              top: '50%',
              width: '19.2%',
              height: '15.4%',
              transformOrigin: 'center center',
            }}
          >
            {/* Atmospheric Forward Projection Beam / Flare */}
            <div
              ref={hlRightBeamRef}
              className="absolute -top-[65%] -left-[65%] w-[230%] h-[230%] rounded-full pointer-events-none z-30 mix-blend-screen opacity-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,248,220,0.85) 0%, rgba(250,204,21,0.45) 30%, rgba(234,179,8,0.18) 55%, transparent 75%)',
                filter: 'blur(16px)',
              }}
            />

            {/* High-fidelity Vector SVG Chrome Bezel & Fluted Lens */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#181614] border-2 border-[#999] shadow-[0_8px_24px_rgba(0,0,0,0.9)] z-10">
              {/* Glass fluting texture */}
              <div ref={hlRightGlassRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                <img
                  src="./assets/grafit/motion/van/layers/headlight_glass_centered.png"
                  alt=""
                  className="w-full h-full object-cover brightness-105 contrast-125"
                />
              </div>

              {/* Warm Incandescent Filament & Radial Core Glow (Above glass for authentic internal bulb glow) */}
              <div
                ref={hlRightGlowRef}
                className="absolute inset-0 rounded-full z-20 pointer-events-none mix-blend-screen flex items-center justify-center opacity-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,250,1) 0%, rgba(254,240,138,0.95) 25%, rgba(234,179,8,0.8) 55%, rgba(180,83,9,0.3) 80%, transparent 100%)',
                }}
              >
                {/* Hot incandescent filament core point */}
                <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_14px_6px_rgba(255,255,255,0.95),0_0_28px_10px_rgba(250,204,21,0.85)]" />
              </div>

              {/* Chrome rim specular gleam */}
              <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none z-30" />
            </div>
          </div>
          </div>

          {/* DESKTOP INTEGRATED SCENIC WING RIGHT: DIRECT NAVIGATION & ACTION (NO BOX/CARD) */}
          <div className="hidden lg:flex flex-col items-start w-64 xl:w-72 shrink-0 self-center relative z-20 text-left select-text">
            {/* Header kicker & replay trigger */}
            <div className="flex items-center justify-between w-full mb-3 pb-1 border-b border-white/10">
              <span className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-[#ded8cb]/70 font-bold">
                EXPLORA EL ESPACIO
              </span>
              <button
                onClick={runHeroAnimation}
                className="flex items-center gap-1 font-mono text-[10px] text-[#e2c044] hover:text-white transition-colors cursor-pointer"
                title="Repetir animación del Hero"
              >
                <RotateCcw className="w-3 h-3" />
                <span>REPETIR</span>
              </button>
            </div>

            {/* Unboxed Typographic Navigation */}
            <nav className="flex flex-col gap-1 w-full">
              {[
                { path: '/', num: '01', label: 'INICIO', tag: '' },
                { path: '/eventos', num: '02', label: 'EVENTOS', tag: 'GRUPOS' },
                { path: '/espacio', num: '03', label: 'EL ESPACIO', tag: 'SALÓN' },
                { path: '/carta', num: '04', label: 'GASTRONOMÍA', tag: 'CARTA' },
                { path: '/contacto', num: '05', label: 'CONTACTO', tag: '' },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className="group flex items-center justify-between w-full py-1.5 text-left cursor-pointer transition-all border-b border-white/5 hover:border-[#e2c044]/50"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[#ded8cb]/40 group-hover:text-[#e2c044] transition-colors">
                      {item.num}
                    </span>
                    <span className="font-anton text-lg xl:text-xl text-[#f5efe1] group-hover:text-[#e2c044] group-hover:translate-x-1.5 uppercase tracking-wider transition-all drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.label}
                    </span>
                  </div>
                  {item.tag && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-black/60 text-[#ded8cb] border border-neutral-800 group-hover:border-[#b91c1c] group-hover:text-white transition-colors">
                      {item.tag}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Unboxed Standout Reservation CTA */}
            <div className="mt-5 w-full">
              <button
                onClick={() => onNavigate('/contacto?tipo=evento')}
                className="w-full py-2.5 px-4 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-sm xl:text-base tracking-widest uppercase border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#e2c044]" />
                <span>★ RESERVAR GRUPO ★</span>
              </button>
              <p className="font-mono text-[9px] text-center text-neutral-400 mt-1.5 uppercase tracking-wider">
                Salón privado • Sin coste de sala
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* COMMERCIAL ACTION OVERLAY (RESERVATION & SCROLL CTAS)             */}
        {/* ================================================================= */}
        <div
          ref={ctaOverlayRef}
          className="relative z-30 mt-6 sm:mt-8 w-full max-w-xl text-center flex flex-col items-center gap-4"
        >
          {/* CASCADING TAGS */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] sm:text-xs">
            <span className="bg-[#181615] text-[#ded8cb] px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
              ★ COMIDAS DE CUADRILLA
            </span>
            <span className="bg-[#181615] text-[#ded8cb] px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
              ★ CUMPLEAÑOS & FIESTAS
            </span>
            <span className="bg-[#181615] text-[#ded8cb] px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
              ★ ENCUENTROS DE EMPRESA
            </span>
          </div>

          <h2 className="font-['Anton'] text-2xl sm:text-4xl text-[#f5efe1] uppercase tracking-wide leading-tight">
            El espacio más versátil de Indautxu para tus celebraciones
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('/contacto?tipo=evento')}
              className="w-full sm:w-auto bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm sm:text-base tracking-widest px-6 py-3 uppercase border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>★ CONSULTAR DISPONIBILIDAD ★</span>
            </button>

            <button
              onClick={() => {
                if (onExploreGastronomy) {
                  onExploreGastronomy();
                } else {
                  const faro = document.getElementById('faro-viajero-section');
                  if (faro) {
                    faro.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollBy({ top: 400, behavior: 'smooth' });
                  }
                }
              }}
              className="w-full sm:w-auto bg-[#f5efe1] hover:bg-white text-black font-['Anton'] text-sm sm:text-base tracking-widest px-6 py-3 uppercase border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <span>DESCUBRE LA GASTRONOMÍA</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
