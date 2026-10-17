import React from 'react';

export interface HeadlightState {
  currentStage: 'arrival' | 'burger' | 'sandwich' | 'pintxos' | 'wide';
  burgerOpacity: number;
  sandwichOpacity: number;
  pintxosOpacity: number;
  glassOpacity: number;
  bezelOpacity: number;
  borderRadius: string; // '50%' to '16px'
  bezelScale: number;
  glowIntensity: number;
}

interface HeadlightTravelerProps {
  // Direct ref for GSAP target
  containerRef?: React.Ref<HTMLDivElement>;
  bezelRef?: React.Ref<HTMLDivElement>;
  innerRef?: React.Ref<HTMLDivElement>;
  imgBurgerRef?: React.Ref<HTMLDivElement>;
  imgSandwichRef?: React.Ref<HTMLDivElement>;
  imgPintxosRef?: React.Ref<HTMLDivElement>;
  glassRef?: React.Ref<HTMLDivElement>;
  tagRef?: React.Ref<HTMLDivElement>;
  tagText?: string;
  tagColor?: string;
  isWide?: boolean;
}

export const HeadlightTraveler: React.FC<HeadlightTravelerProps> = ({
  containerRef,
  bezelRef,
  innerRef,
  imgBurgerRef,
  imgSandwichRef,
  imgPintxosRef,
  glassRef,
  tagRef,
  tagText = 'GASTRONOMÍA CON CARÁCTER',
  tagColor = '#b91c1c',
  isWide = false
}) => {
  return (
    <div
      ref={containerRef}
      className="headlight-traveler relative flex items-center justify-center will-change-transform select-none"
      style={{
        width: 280,
        height: 280,
        // Centered transform origin for smooth scale and rotation
        transformOrigin: 'center center',
      }}
    >
      {/* 1. DYNAMIC AMBIENT DROP SHADOW (Changes depth with motion) */}
      <div
        className="headlight-shadow absolute -inset-4 rounded-full pointer-events-none transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(16px)',
          zIndex: 1,
        }}
      />

      {/* 2. INNER CLIPPED FOOD VIEWPORT (Morphs from circle to rounded card) */}
      <div
        ref={innerRef}
        className="headlight-aperture relative w-full h-full overflow-hidden transition-[border-radius] duration-200"
        style={{
          borderRadius: '50%',
          backgroundColor: '#121110',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.85)',
          zIndex: 5,
        }}
      >
        {/* IMAGE 1: BURGER 100% BUEY */}
        <div
          ref={imgBurgerRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <img
            src="./assets/grafit/instagram/burguer.webp"
            alt="Burger Grafit 100% Buey"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.08)' }}
            loading="eager"
          />
          {/* Subtle inner warmth vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(226,192,68,0.12) 0%, rgba(0,0,0,0.4) 100%)',
            }}
          />
        </div>

        {/* IMAGE 2: SÁNDWICH DE BARRA */}
        <div
          ref={imgSandwichRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <img
            src="./assets/grafit/instagram/sandwich-barra.jpg"
            alt="Sándwich de barra a la plancha"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.12)' }}
            loading="eager"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(185,28,28,0.12) 0%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </div>

        {/* IMAGE 3: BARRA DE PINTXOS */}
        <div
          ref={imgPintxosRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <img
            src="./assets/grafit/instagram/pintxos.jpg"
            alt="Barra de pintxos artesanos Grafit"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.05)' }}
            loading="eager"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(226,192,68,0.15) 0%, rgba(0,0,0,0.5) 100%)',
            }}
          />
        </div>

        {/* 3. OPTICAL GLASS LENS (Original fluted glass texture for simulated arrival) */}
        <div
          ref={glassRef}
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
          style={{
            opacity: 1,
            zIndex: 10,
            backgroundColor: 'rgba(20, 18, 16, 0.45)',
          }}
        >
          {/* Real optical fluted glass layer from isolated headlight */}
          <img
            src="./assets/grafit/motion/van/layers/headlight_glass_centered.png"
            alt="Óptica del faro"
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(1.15) contrast(1.2)',
            }}
          />
          {/* Glass Fresnel fluting lines */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-radial-gradient(circle at center, transparent 0, transparent 8px, rgba(255,255,255,0.06) 9px, rgba(0,0,0,0.12) 10px)',
              mixBlendMode: 'overlay',
            }}
          />
          {/* Bulb reflection specular hot spot */}
          <div
            className="absolute w-12 h-12 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(226,192,68,0.2) 50%, transparent 80%)',
              filter: 'blur(3px)',
              top: '42%',
              left: '44%',
            }}
          />
        </div>
      </div>

      {/* 4. HIGH-FIDELITY VECTOR SVG CHROME BEZEL (Crisp at any resolution) */}
      <div
        ref={bezelRef}
        className="headlight-bezel-wrapper absolute -inset-[9%] pointer-events-none"
        style={{
          zIndex: 15,
          willChange: 'opacity, transform',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer high-contrast metallic chrome gradient */}
            <linearGradient id="vwChromeGradient" x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#f3f3f3" />
              <stop offset="18%" stopColor="#ffffff" />
              <stop offset="32%" stopColor="#8c8882" />
              <stop offset="50%" stopColor="#f8f7f4" />
              <stop offset="68%" stopColor="#403c38" />
              <stop offset="85%" stopColor="#d9d5ce" />
              <stop offset="100%" stopColor="#6e6a64" />
            </linearGradient>

            {/* Inner bevel ring with deep shadow */}
            <linearGradient id="innerGasket" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1816" />
              <stop offset="50%" stopColor="#2c2825" />
              <stop offset="100%" stopColor="#0d0c0b" />
            </linearGradient>

            {/* Specular highlight arc */}
            <linearGradient id="specularArc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Exterior chrome ring (reproduces the stamped lip of VW T2) */}
          <circle
            cx="100"
            cy="100"
            r="89"
            stroke="url(#vwChromeGradient)"
            strokeWidth="13"
          />

          {/* Dark inner rubber gasket where glass meets chrome */}
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="url(#innerGasket)"
            strokeWidth="3.5"
          />

          {/* Specular reflection glint on top-left edge */}
          <path
            d="M 52 38 A 86 86 0 0 1 128 24"
            stroke="url(#specularArc)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Bottom adjustment screw notch at 6 o'clock (authentic VW detail) */}
          <circle cx="100" cy="191" r="2.8" fill="#1c1a18" stroke="#8e8983" strokeWidth="1" />
          <line x1="98.5" y1="191" x2="101.5" y2="191" stroke="#333" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 5. VIBRANT ZINE BADGE ATTACHED TO TRAVELING HEADLIGHT (Rally / Inspection Seal) */}
      <div
        ref={tagRef}
        className="headlight-tag absolute -top-3.5 z-20 whitespace-nowrap px-3 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase border shadow-[3px_3px_0_#000] pointer-events-none transition-transform duration-200"
        style={{
          backgroundColor: '#0c0b0a',
          color: '#e2c044',
          borderColor: '#e2c044',
          opacity: 0,
          transform: 'scale(0.8) translateY(-6px)',
        }}
      >
        {tagText}
      </div>
    </div>
  );
};
