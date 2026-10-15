import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img
} from 'remotion';

// Authentic Woodblock Ransom Letters definitions from Header.tsx
interface LetterConfig {
  char: string;
  bg: string;
  color: string;
  border: string;
  baseRot: number;
  font: string;
  deltaX: number;
  deltaY: number;
  deltaRot: number;
}

const RANSOM_LETTERS: LetterConfig[] = [
  {
    char: 'G',
    bg: '#0a0a0a',
    color: '#ebe5d8',
    border: '3px solid #ffffff',
    baseRot: -4,
    font: 'Anton, Impact, sans-serif',
    deltaX: -130,
    deltaY: -160,
    deltaRot: -32
  },
  {
    char: 'R',
    bg: '#b91c1c',
    color: '#ffffff',
    border: '3px solid #000000',
    baseRot: 3,
    font: 'Syne, Anton, Impact, sans-serif',
    deltaX: -70,
    deltaY: -220,
    deltaRot: 28
  },
  {
    char: 'A',
    bg: '#fdfbf7',
    color: '#0a0a0a',
    border: '3px solid #000000',
    baseRot: -2,
    font: 'Anton, Impact, sans-serif',
    deltaX: -15,
    deltaY: -260,
    deltaRot: -24
  },
  {
    char: 'F',
    bg: '#0a0a0a',
    color: '#ffffff',
    border: '3px solid #ffffff',
    baseRot: 5,
    font: 'Anton, Impact, sans-serif',
    deltaX: 45,
    deltaY: -230,
    deltaRot: 30
  },
  {
    char: 'I',
    bg: '#e2c044',
    color: '#000000',
    border: '3px solid #000000',
    baseRot: -1,
    font: 'Syne, Anton, Impact, sans-serif',
    deltaX: 105,
    deltaY: -180,
    deltaRot: -25
  },
  {
    char: 'T',
    bg: '#0a0a0a',
    color: '#ffffff',
    border: '3px solid #000000',
    baseRot: 3,
    font: 'Anton, Impact, sans-serif',
    deltaX: 160,
    deltaY: -130,
    deltaRot: 36
  }
];

export const GrafitHeroMobileV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig(); // 1080 x 1920

  // =========================================================================
  // 1. IMPACT TIMINGS & SCREEN SHAKE (FRAMES 0 - 60)
  // =========================================================================
  const impactFrame = 40;

  // Screen shake on collision (frames 40 - 56)
  const shakeIntensity = interpolate(
    frame,
    [impactFrame - 1, impactFrame, impactFrame + 3, impactFrame + 14],
    [0, 24, 14, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const shakeX = Math.sin(frame * 4.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 5.2) * shakeIntensity;

  // =========================================================================
  // 2. VOLKSWAGEN ENTRANCE & COLLISION PHYSICS
  // =========================================================================
  // Van charges up fast from below (frame 16 to 40)
  const vanChargeSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 11, mass: 0.75, stiffness: 95 }
  });

  // At impact (frame 40), van has a momentary compression recoil
  const vanImpactRecoil = interpolate(
    frame,
    [38, 41, 46, 58],
    [1.0, 0.93, 1.04, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const vanY = interpolate(vanChargeSpring, [0, 1], [1950, 0]);
  const vanScaleIntro = interpolate(vanChargeSpring, [0, 1], [0.65, 1.0]);

  // Mobile scale: van occupies ~90% of screen width (972px / 1080px = 1.35x of 720px)
  const baseVanScale = 1.35;
  const vanCanvasW = 720 * baseVanScale; // 972px
  const vanCanvasH = 900 * baseVanScale; // 1215px
  const vanLeft = (width - vanCanvasW) / 2; // 54px
  const vanTop = 270; // Positioned cleanly below header and above CTA

  // =========================================================================
  // 3. GRAFIT LETTERS TIMELINE (INTRO -> HIT -> REBOUND -> HEADER PIN)
  // =========================================================================
  const lettersEnterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 }
  });
  const introLettersScale = interpolate(lettersEnterSpring, [0, 1], [0.3, 1.0]);
  const introLettersOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  const hitProgress = interpolate(
    frame,
    [impactFrame, impactFrame + 8, impactFrame + 22],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const returnToHeaderSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 75 }
  });

  // =========================================================================
  // 4. MOMENTO 02 & 03: VW EMBLEM FALLS & BURGER EMERGES (FRAMES 85 - 145)
  // =========================================================================
  // Emblem coordinates in van space: Center (369 * 1.35, 430 * 1.35) = (498, 580)
  // A. Emblem pop forward (frames 85 - 94)
  const emblemPopSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 90 }
  });
  const emblemZPop = interpolate(emblemPopSpring, [0, 1], [1.0, 1.15]);
  const emblemInitialShadow = interpolate(emblemPopSpring, [0, 1], [0, 18]);

  // B. Emblem falls downward with gravity (frames 95 - 145)
  const isEmblemFalling = frame >= 95;
  const fallT = Math.max(0, (frame - 95) / 30.0);
  const emblemFallY = 0.5 * 1800 * (fallT * fallT); // gravity acceleration: 0.5*g*t^2
  const emblemFallRot = interpolate(frame, [95, 140], [0, -22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });
  const emblemOpacity = interpolate(frame, [125, 142], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // C. Burger emerges from the emblem cavity (frames 98 - 150+)
  const burgerEmergeSpring = spring({
    frame: frame - 98,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 80 }
  });
  // Starts small inside the cavity (scale: 0.2) and blooms outward to hero size (scale: 1.25)
  const burgerScale = interpolate(burgerEmergeSpring, [0, 1], [0.15, 1.22]);
  const burgerY = interpolate(burgerEmergeSpring, [0, 1], [0, 15]);
  const burgerShadow = interpolate(burgerEmergeSpring, [0, 1], [0, 30]);

  // Burger sticker pop
  const burgerTagSpring = spring({
    frame: frame - 118,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 90 }
  });

  // =========================================================================
  // 5. MOMENTO 04 & 05: HEADLIGHTS SINK, REBOUND & REVEAL (FRAMES 135 - 195)
  // =========================================================================
  // Left headlight center: (156 * 1.35 = 210.6, 526 * 1.35 = 710.1)
  // Right headlight center: (588 * 1.35 = 793.8, 522 * 1.35 = 704.7)

  // A. LEFT HEADLIGHT (SINK & REBOUND)
  // Sink phase: frames 135 - 148 (shrinks to 0.72x, darkens)
  // Rebound phase: frames 148 - 180 (shoots forward to 1.45x overshoot -> 1.30x)
  const hlLeftSinkSpring = spring({
    frame: frame - 135,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 100 }
  });
  const hlLeftReboundSpring = spring({
    frame: frame - 149,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 110 }
  });

  // Headlight scale: 1.0 -> 0.70 (sink) -> 1.35 (rebound with overshoot)
  const hlLeftScale = frame < 149
    ? interpolate(hlLeftSinkSpring, [0, 1], [1.0, 0.70])
    : interpolate(hlLeftReboundSpring, [0, 1], [0.70, 1.35]);

  // Brightness/depth effect during sink
  const hlLeftBrightness = frame < 149
    ? interpolate(hlLeftSinkSpring, [0, 1], [1.0, 0.45])
    : interpolate(hlLeftReboundSpring, [0, 1], [0.45, 1.15]);

  // Left content reveal progress (sandwich)
  const hlLeftRevealT = interpolate(
    frame,
    [149, 162],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // B. RIGHT HEADLIGHT (SINK & REBOUND WITH SLIGHT DESFASE)
  // Sink phase: frames 138 - 152
  // Rebound phase: frames 152 - 184
  const hlRightSinkSpring = spring({
    frame: frame - 138,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 100 }
  });
  const hlRightReboundSpring = spring({
    frame: frame - 152,
    fps,
    config: { damping: 10, mass: 0.8, stiffness: 110 }
  });

  const hlRightScale = frame < 152
    ? interpolate(hlRightSinkSpring, [0, 1], [1.0, 0.70])
    : interpolate(hlRightReboundSpring, [0, 1], [0.70, 1.35]);

  const hlRightBrightness = frame < 152
    ? interpolate(hlRightSinkSpring, [0, 1], [1.0, 0.45])
    : interpolate(hlRightReboundSpring, [0, 1], [0.45, 1.15]);

  const hlRightRevealT = interpolate(
    frame,
    [152, 165],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Headlight stickers
  const hlTagsSpring = spring({
    frame: frame - 165,
    fps,
    config: { damping: 12, mass: 0.85, stiffness: 85 }
  });

  // =========================================================================
  // 6. MOMENTO 06: EVENTOS Y GRUPOS (SURGEN DE LA FURGONETA) (FRAMES 175 - 240)
  // =========================================================================
  // Banners emerging directly from the van
  // 1. Grupos (frame 175)
  const gruposSpring = spring({
    frame: frame - 175,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });
  // 2. Eventos (frame 188)
  const eventosSpring = spring({
    frame: frame - 188,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });
  // 3. Salón Multiusos (frame 202)
  const salonSpring = spring({
    frame: frame - 202,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });

  // =========================================================================
  // 7. MOMENTO 07: COMMERCIAL CLOSING & CTA (FRAMES 225 - 300)
  // =========================================================================
  const ctaSpring = spring({
    frame: frame - 228,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 85 }
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1.0]);
  const ctaOpacity = interpolate(ctaSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  // Switch to sockets body when headlights start sinking (frame >= 135)
  const showSockets = frame >= 135;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#181615',
        overflow: 'hidden',
        fontFamily: 'Anton, Impact, sans-serif',
        transform: `translate(${shakeX}px, ${shakeY}px)`
      }}
    >
      {/* ============================================================== */}
      {/* 1. FONDO GRÁFICO ORIGINAL (PUNK WALL BG CON BLEND MULTIPLY)    */}
      {/* ============================================================== */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(18, 17, 16, 0.45), rgba(18, 17, 16, 0.45)),
            url("${staticFile('assets/grafit/punk-wall-bg.jpg')}")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '720px auto',
          filter: 'contrast(1.08) brightness(0.92)'
        }}
      />

      {/* TEXTURA ZINE VINTAGE Y GRANO ANALÓGICO */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 25%, rgba(200, 185, 155, 0.28), transparent 60%),
            radial-gradient(ellipse at 80% 75%, rgba(180, 160, 130, 0.22), transparent 55%),
            radial-gradient(#000000 0.85px, transparent 0.85px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 20px 20px',
          mixBlendMode: 'multiply',
          opacity: 0.5,
          pointerEvents: 'none'
        }}
      />

      {/* ============================================================== */}
      {/* 2. MEDIA VOLKSWAGEN CENTRAL (90% ANCHO MÓVIL)                  */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          left: vanLeft,
          top: vanTop,
          width: vanCanvasW,
          height: vanCanvasH,
          transform: `translateY(${vanY}px) scale(${vanScaleIntro * vanImpactRecoil})`,
          zIndex: 20,
          pointerEvents: 'none'
        }}
      >
        {/* PODIUM & SHADOWS LAYER (LAYER 09) */}
        <Img
          src={staticFile('assets/grafit/motion/van/layers/layer_09_podium_shadows.png')}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />

        {/* BASE BODY OF THE VOLKSWAGEN */}
        {/* When headlights sink (frame >= 135), switches to sockets layer revealing dark recessed housing */}
        <Img
          src={
            showSockets
              ? staticFile('assets/grafit/motion/van/layers/layer_02_half_van_sockets.png')
              : frame >= 95
              ? staticFile('assets/grafit/motion/van/layers/layer_02_half_van_debadged.png')
              : staticFile('assets/grafit/motion/van/layers/layer_02_half_van_complete.png')
          }
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />

        {/* ============================================================== */}
        {/* MOMENTO 02 & 03: EMBLEMA VW CAYENDO + HAMBURGUESA EMERGENTE     */}
        {/* ============================================================== */}
        {/* A. EMBLEMA VW EN MOVIMIENTO (POP FORWARD Y CAÍDA HACIA ABAJO) */}
        {frame < 145 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transformOrigin: `${373 * baseVanScale}px ${427 * baseVanScale}px`,
              transform: isEmblemFalling
                ? `translateY(${emblemFallY}px) rotate(${emblemFallRot}deg) scale(${emblemZPop})`
                : `scale(${emblemZPop})`,
              filter: `drop-shadow(0px ${emblemInitialShadow}px ${emblemInitialShadow * 1.5}px rgba(0,0,0,0.85))`,
              opacity: emblemOpacity,
              zIndex: 35
            }}
          >
            <Img
              src={staticFile('assets/grafit/motion/van/layers/layer_03_vw_emblem.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}

        {/* B. HAMBURGUESA GRAFIT EMERGIENDO DEL HUECO DEL EMBLEMA */}
        {frame >= 96 && (
          <div
            style={{
              position: 'absolute',
              // Centered exactly at VW emblem coordinates (369 * 1.35, 430 * 1.35)
              left: 369 * baseVanScale - (110 * baseVanScale),
              top: 430 * baseVanScale - (110 * baseVanScale) + burgerY,
              width: 220 * baseVanScale, // ~297px diameter
              height: 220 * baseVanScale,
              transform: `scale(${burgerScale}) perspective(800px) rotateX(-4deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 55
            }}
          >
            {/* GLOW DE PROFUNDIDAD EN EL HUECO */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'rgba(226, 192, 68, 0.4)',
                filter: 'blur(20px)',
                zIndex: -1
              }}
            />

            {/* BURGER CONTAINER WITH GOLDEN RING AND INNER VIGNETTE */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '5px solid #e2c044',
                boxShadow: `0 0 28px rgba(226, 192, 68, 0.95), 0 ${burgerShadow}px ${burgerShadow * 1.5}px rgba(0,0,0,0.9)`,
                position: 'relative'
              }}
            >
              <Img
                src={staticFile('assets/grafit/instagram/burguer.webp')}
                style={{
                  width: '135%',
                  height: '135%',
                  objectFit: 'cover',
                  transform: 'translate(-15%, -15%)'
                }}
              />
            </div>

            {/* STICKER "BURGER 100% BUEY" */}
            {frame >= 115 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: -14,
                  backgroundColor: '#b91c1c',
                  color: '#ffffff',
                  fontFamily: 'Courier New, monospace',
                  fontSize: 16,
                  fontWeight: 'bold',
                  padding: '5px 18px',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  transform: `scale(${interpolate(burgerTagSpring, [0, 1], [0.4, 1.0])}) rotate(-4deg)`,
                  opacity: interpolate(burgerTagSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
                  whiteSpace: 'nowrap',
                  zIndex: 60
                }}
              >
                BURGER 100% BUEY
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* MOMENTO 04 & 05: FAROS CON HUNDIMIENTO, REBOTE Y REVELACIÓN   */}
        {/* ============================================================== */}

        {/* FARO IZQUIERDO: HUNDIMIENTO -> REBOTE -> SÁNDWICH */}
        <div
          style={{
            position: 'absolute',
            left: 156 * baseVanScale - (59 * baseVanScale),
            top: 526 * baseVanScale - (59 * baseVanScale),
            width: 118 * baseVanScale, // ~160px
            height: 118 * baseVanScale,
            transformOrigin: 'center center',
            transform: `scale(${hlLeftScale})`,
            filter: `brightness(${hlLeftBrightness}) contrast(${interpolate(hlLeftScale, [0.7, 1.35], [1.2, 1.0])})`,
            zIndex: hlLeftScale > 1.0 ? 50 : 25
          }}
        >
          {/* ARO CROMADO EXTERIOR */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: hlLeftScale > 1.0 ? '0 12px 28px rgba(0,0,0,0.85), 0 0 20px rgba(226, 192, 68, 0.7)' : 'none'
            }}
          >
            {/* Lente original (se desvanece durante la revelación) */}
            <Img
              src={staticFile('assets/grafit/motion/van/layers/headlight_isolated_left.png')}
              style={{
                position: 'absolute',
                top: -(526 - 59) * baseVanScale,
                left: -(156 - 59) * baseVanScale,
                width: vanCanvasW,
                height: vanCanvasH,
                opacity: 1 - hlLeftRevealT
              }}
            />

            {/* Contenido revelado: Sándwich de barra */}
            {hlLeftRevealT > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: hlLeftRevealT,
                  border: '3px solid #e2c044',
                  boxSizing: 'border-box'
                }}
              >
                <Img
                  src={staticFile('assets/grafit/instagram/sandwich-barra.jpg')}
                  style={{
                    width: '140%',
                    height: '140%',
                    objectFit: 'cover',
                    transform: 'translate(-15%, -15%)'
                  }}
                />
              </div>
            )}
          </div>

          {/* ETIQUETA COCINA NON-STOP AL REBOTAR */}
          {frame >= 162 && (
            <div
              style={{
                position: 'absolute',
                bottom: -16,
                left: -20,
                backgroundColor: '#0a0a0a',
                color: '#e2c044',
                fontFamily: 'Courier New, monospace',
                fontSize: 14,
                fontWeight: 'bold',
                padding: '4px 12px',
                border: '2px solid #e2c044',
                boxShadow: '4px 4px 0 #b91c1c',
                transform: `scale(${interpolate(hlTagsSpring, [0, 1], [0.4, 1.0])}) rotate(-5deg)`,
                opacity: interpolate(hlTagsSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
                whiteSpace: 'nowrap',
                zIndex: 65
              }}
            >
              COCINA NON-STOP
            </div>
          )}
        </div>

        {/* FARO DERECHO: HUNDIMIENTO -> REBOTE -> EL SALÓN MULTIUSOS */}
        <div
          style={{
            position: 'absolute',
            left: 588 * baseVanScale - (59 * baseVanScale),
            top: 522 * baseVanScale - (59 * baseVanScale),
            width: 118 * baseVanScale, // ~160px
            height: 118 * baseVanScale,
            transformOrigin: 'center center',
            transform: `scale(${hlRightScale})`,
            filter: `brightness(${hlRightBrightness}) contrast(${interpolate(hlRightScale, [0.7, 1.35], [1.2, 1.0])})`,
            zIndex: hlRightScale > 1.0 ? 50 : 25
          }}
        >
          {/* ARO CROMADO EXTERIOR */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: hlRightScale > 1.0 ? '0 12px 28px rgba(0,0,0,0.85), 0 0 20px rgba(226, 192, 68, 0.7)' : 'none'
            }}
          >
            {/* Lente original (se desvanece durante la revelación) */}
            <Img
              src={staticFile('assets/grafit/motion/van/layers/headlight_isolated_right.png')}
              style={{
                position: 'absolute',
                top: -(522 - 59) * baseVanScale,
                left: -(588 - 59) * baseVanScale,
                width: vanCanvasW,
                height: vanCanvasH,
                opacity: 1 - hlRightRevealT
              }}
            />

            {/* Contenido revelado: Foto real del Salón Multiusos */}
            {hlRightRevealT > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: hlRightRevealT,
                  border: '3px solid #e2c044',
                  boxSizing: 'border-box'
                }}
              >
                <Img
                  src={staticFile('assets/grafit/interior/grafit-salon-mesas-11.jpg')}
                  style={{
                    width: '160%',
                    height: '160%',
                    objectFit: 'cover',
                    transform: 'translate(-20%, -15%)'
                  }}
                />
              </div>
            )}
          </div>

          {/* ETIQUETA EL GRAN SALÓN AL REBOTAR */}
          {frame >= 165 && (
            <div
              style={{
                position: 'absolute',
                bottom: -16,
                right: -20,
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                fontFamily: 'Courier New, monospace',
                fontSize: 14,
                fontWeight: 'bold',
                padding: '4px 14px',
                border: '2px solid #000000',
                boxShadow: '4px 4px 0 #000',
                transform: `scale(${interpolate(hlTagsSpring, [0, 1], [0.4, 1.0])}) rotate(5deg)`,
                opacity: interpolate(hlTagsSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
                whiteSpace: 'nowrap',
                zIndex: 65
              }}
            >
              EL GRAN SALÓN
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* MOMENTO 06: EVENTOS Y GRUPOS (SURGEN DE LA FURGONETA)          */}
        {/* ============================================================== */}
        {frame >= 175 && (
          <div
            style={{
              position: 'absolute',
              top: 130,
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              zIndex: 52
            }}
          >
            {/* BADGE 1: GRUPOS (SALE DE LA LUNA DELANTERA) */}
            <div
              style={{
                transform: `scale(${interpolate(gruposSpring, [0, 1], [0.3, 1.0])}) rotate(-3deg)`,
                opacity: interpolate(gruposSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                padding: '10px 42px',
                border: '5px solid #000000',
                boxShadow: '8px 8px 0px #000000',
                fontSize: 62,
                letterSpacing: '4px',
                textTransform: 'uppercase'
              }}
            >
              ★ GRUPOS ★
            </div>

            {/* BADGE 2: EVENTOS (CRUZA SOBRE EL CAPÓ) */}
            {frame >= 188 && (
              <div
                style={{
                  transform: `scale(${interpolate(eventosSpring, [0, 1], [0.3, 1.0])}) rotate(3deg)`,
                  opacity: interpolate(eventosSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  padding: '10px 50px',
                  border: '5px solid #ffffff',
                  boxShadow: '8px 8px 0px #b91c1c',
                  fontSize: 64,
                  letterSpacing: '5px',
                  textTransform: 'uppercase'
                }}
              >
                EVENTOS
              </div>
            )}

            {/* BADGE 3: EL GRAN SALÓN MULTIUSOS */}
            {frame >= 202 && (
              <div
                style={{
                  transform: `scale(${interpolate(salonSpring, [0, 1], [0.3, 1.0])}) rotate(-1deg)`,
                  opacity: interpolate(salonSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
                  backgroundColor: '#f5efe1',
                  color: '#000000',
                  padding: '8px 36px',
                  border: '4px solid #000000',
                  boxShadow: '6px 6px 0px #000000',
                  fontSize: 38,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginTop: 6
                }}
              >
                EL GRAN SALÓN MULTIUSOS
              </div>
            )}

            {/* SUBTÍTULO DESCRIPTIVO LOCAL */}
            {frame >= 210 && (
              <div
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#f5efe1',
                  backgroundColor: 'rgba(0,0,0,0.92)',
                  padding: '6px 18px',
                  border: '1px solid #b91c1c',
                  boxShadow: '3px 3px 0 #000',
                  letterSpacing: '2px',
                  marginTop: 4
                }}
              >
                // COMIDAS • CUMPLEAÑOS • CELEBRACIONES EN INDAUTXU
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. COREOGRAFÍA DE LAS LETRAS GRAFIT (CABECERA SUPERIOR)       */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 40,
          pointerEvents: 'none'
        }}
      >
        {RANSOM_LETTERS.map((letter, idx) => {
          // Posición en centro (fase intro)
          const centerLetterW = 125;
          const centerLetterH = 175;
          const centerGap = 16;
          const totalCenterW = 6 * centerLetterW + 5 * centerGap;
          const centerStartX = (width - totalCenterW) / 2;
          const centerTargetX = centerStartX + idx * (centerLetterW + centerGap);
          const centerTargetY = 460;

          // Posición en Header móvil real (fase fijada superior)
          const headerLetterW = 68;
          const headerLetterH = 96;
          const headerGap = 12;
          const totalHeaderW = 6 * headerLetterW + 5 * headerGap;
          const headerStartX = (width - totalHeaderW) / 2;
          const headerTargetX = headerStartX + idx * (headerLetterW + headerGap);
          const headerTargetY = 60;

          const currentX = interpolate(returnToHeaderSpring, [0, 1], [centerTargetX, headerTargetX]);
          const currentY = interpolate(returnToHeaderSpring, [0, 1], [centerTargetY, headerTargetY]);
          const currentW = interpolate(returnToHeaderSpring, [0, 1], [centerLetterW, headerLetterW]);
          const currentH = interpolate(returnToHeaderSpring, [0, 1], [centerLetterH, headerLetterH]);
          const currentFontSize = interpolate(returnToHeaderSpring, [0, 1], [115, 62]);

          const scatterX = hitProgress * letter.deltaX;
          const scatterY = hitProgress * letter.deltaY;
          const scatterRot = hitProgress * letter.deltaRot;

          return (
            <div
              key={letter.char}
              style={{
                position: 'absolute',
                left: currentX + scatterX,
                top: currentY + scatterY,
                width: currentW,
                height: currentH,
                backgroundColor: letter.bg,
                color: letter.color,
                border: letter.border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: letter.font,
                fontSize: currentFontSize,
                lineHeight: 1,
                boxShadow: '5px 7px 0px rgba(0,0,0,0.95), 10px 14px 20px rgba(0,0,0,0.3)',
                transform: `scale(${introLettersScale}) rotate(${letter.baseRot + scatterRot}deg)`,
                opacity: introLettersOpacity,
                transition: 'none'
              }}
            >
              {letter.char}
            </div>
          );
        })}

        {/* TAPE ACCENT STRIP SOBRE EL HEADER */}
        {frame >= 75 && (
          <div
            style={{
              position: 'absolute',
              top: 42,
              left: (width - 480) / 2,
              width: 140,
              height: 24,
              backgroundColor: 'rgba(230, 222, 202, 0.88)',
              borderLeft: '2px dashed rgba(160, 150, 120, 0.4)',
              borderRight: '2px dashed rgba(160, 150, 120, 0.4)',
              transform: 'rotate(-2deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
              opacity: interpolate(frame, [75, 88], [0, 1], { extrapolateRight: 'clamp' }),
              zIndex: 42
            }}
          />
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. MOMENTO 07: CIERRE COMERCIAL Y CONVERSIÓN INFERIOR          */}
      {/* ============================================================== */}
      {frame >= 225 && (
        <div
          style={{
            position: 'absolute',
            bottom: 45,
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 40px',
            boxSizing: 'border-box',
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            zIndex: 65
          }}
        >
          {/* TAGLINE */}
          <div
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#ffffff',
              backgroundColor: '#b91c1c',
              padding: '6px 20px',
              border: '2px solid #000000',
              boxShadow: '4px 4px 0 #000',
              letterSpacing: '3px',
              transform: 'rotate(-1deg)',
              marginBottom: 12
            }}
          >
            // GRAFIT ROCK CAFÉ • INDAUTXU
          </div>

          {/* MAIN COMMERCIAL PROPOSAL */}
          <h2
            style={{
              fontSize: 46,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              lineHeight: 1.1,
              textShadow: '4px 4px 0px #b91c1c, 8px 8px 0px #000000',
              margin: '0 0 18px 0',
              maxWidth: 900
            }}
          >
            TU PRÓXIMA EXPERIENCIA EMPIEZA EN GRAFIT
          </h2>

          {/* BIG CTA BUTTON */}
          <div
            style={{
              backgroundColor: '#f5efe1',
              color: '#000000',
              border: '5px solid #000000',
              boxShadow: '8px 8px 0px #b91c1c, 14px 14px 0px #000000',
              padding: '16px 44px',
              fontSize: 36,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              transform: 'rotate(1deg)',
              marginBottom: 16
            }}
          >
            ★ ORGANIZA TU EVENTO ★
          </div>

          {/* PHYSICAL ADDRESS (SIN TELÉFONO PROVISIONAL) */}
          <div
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#e5e0d3',
              backgroundColor: 'rgba(10, 10, 10, 0.92)',
              padding: '8px 24px',
              border: '2px solid rgba(255,255,255,0.2)',
              letterSpacing: '3px'
            }}
          >
            URRUTIA KALEA 1 • INDAUTXU (BILBAO)
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
