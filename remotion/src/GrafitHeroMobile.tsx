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

export const GrafitHeroMobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig(); // 1080 x 1920

  // =========================================================================
  // 1. IMPACT TIMINGS & SCREEN SHAKE
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
  // A. Entrance of letters in center (frames 0 - 15)
  const lettersEnterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 }
  });
  const introLettersScale = interpolate(lettersEnterSpring, [0, 1], [0.3, 1.0]);
  const introLettersOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // B. Letters explosion & scatter (frames 40 - 58)
  const hitProgress = interpolate(
    frame,
    [impactFrame, impactFrame + 8, impactFrame + 22],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // C. Letters travel to web header position (frames 55 - 90)
  const returnToHeaderSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 75 }
  });

  // =========================================================================
  // 4. HEADLIGHTS & GASTRONOMY REVEAL (FRAMES 85 - 210)
  // =========================================================================
  const hlGlow = interpolate(
    frame,
    [85, 98, 115, 200],
    [0, 1.4, 0.7, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Left headlight: Burger Grafit pop
  const burgerSpring = spring({
    frame: frame - 92,
    fps,
    config: { damping: 11, mass: 0.75, stiffness: 90 }
  });
  const burgerScale = interpolate(burgerSpring, [0, 1], [0.1, 1.0]);
  const burgerX = interpolate(burgerSpring, [0, 1], [0, -110]);
  const burgerY = interpolate(burgerSpring, [0, 1], [0, 30]);

  // Right headlight: Sandwich barra pop
  const sandwichSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 11, mass: 0.75, stiffness: 90 }
  });
  const sandwichScale = interpolate(sandwichSpring, [0, 1], [0.1, 1.0]);
  const sandwichX = interpolate(sandwichSpring, [0, 1], [0, 110]);
  const sandwichY = interpolate(sandwichSpring, [0, 1], [0, 30]);

  const foodTagSpring = spring({
    frame: frame - 118,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 85 }
  });

  // Food elements gently slide outwards in scene 4/5 to frame the van cleanly
  const foodFlankSpread = interpolate(
    frame,
    [160, 200],
    [0, 35],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // =========================================================================
  // 5. PIECE DETACHMENT & CONCEPT REVEAL (FRAMES 150 - 240)
  // =========================================================================
  const isDebadged = frame >= 150;

  // VW Emblem detaches, flies forward and to the right, then fades (frames 150 - 210)
  const emblemSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 12, mass: 0.85, stiffness: 65 }
  });
  const emblemScale = interpolate(emblemSpring, [0, 1], [1.0, 2.0]);
  const emblemX = interpolate(emblemSpring, [0, 1], [0, 195]);
  const emblemY = interpolate(emblemSpring, [0, 1], [0, 15]);
  const emblemRot = interpolate(emblemSpring, [0, 1], [0, 18]);
  const emblemShadow = interpolate(emblemSpring, [0, 1], [2, 35]);
  const emblemOpacity = interpolate(
    frame,
    [190, 210],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // License plate drops with gravity and fades before CTA enters (frames 158 - 210)
  const plateSpring = spring({
    frame: frame - 158,
    fps,
    config: { damping: 10, mass: 1.1, stiffness: 55 }
  });
  const plateY = interpolate(plateSpring, [0, 1], [0, 380]);
  const plateRot = interpolate(plateSpring, [0, 1], [0, -14]);
  const plateOpacity = interpolate(
    frame,
    [192, 212],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Banners emerging directly from the van
  // 1. Grupos (frame 165)
  const gruposSpring = spring({
    frame: frame - 165,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });
  // 2. Eventos (frame 178)
  const eventosSpring = spring({
    frame: frame - 178,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });
  // 3. Salón Multiusos (frame 192)
  const salonSpring = spring({
    frame: frame - 192,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 95 }
  });

  // =========================================================================
  // 6. COMMERCIAL CLOSING & CTA (FRAMES 215 - 300)
  // =========================================================================
  const ctaSpring = spring({
    frame: frame - 218,
    fps,
    config: { damping: 12, mass: 0.9, stiffness: 85 }
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1.0]);
  const ctaOpacity = interpolate(ctaSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

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
      {/* 2. MEDIA VOLKSWAGEN CENTRAL (85 - 100% ANCHO MÓVIL)            */}
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

        {/* BASE BODY OF THE VOLKSWAGEN (LAYER 02) */}
        {/* Seamless debadged layer in frame 150+ eliminates duplicate silhouettes */}
        <Img
          src={
            isDebadged
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
        {/* FAROS Y REVELACIÓN GASTRONÓMICA (SALEN DIRECTAMENTE DEL FARO) */}
        {/* ============================================================== */}
        {frame >= 80 && (
          <>
            {/* GLOW EN FAROS */}
            <div
              style={{
                position: 'absolute',
                left: (156 - 65) * baseVanScale,
                top: (526 - 65) * baseVanScale,
                width: 130 * baseVanScale,
                height: 130 * baseVanScale,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 230, 120, 0.55)',
                filter: 'blur(16px)',
                opacity: hlGlow
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: (588 - 65) * baseVanScale,
                top: (522 - 65) * baseVanScale,
                width: 130 * baseVanScale,
                height: 130 * baseVanScale,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 230, 120, 0.55)',
                filter: 'blur(16px)',
                opacity: hlGlow
              }}
            />

            {/* FARO IZQUIERDO: BURGER GRAFIT EMERGENTE */}
            <div
              style={{
                position: 'absolute',
                left: (156 - 45) * baseVanScale + burgerX - foodFlankSpread,
                top: (526 - 45) * baseVanScale + burgerY,
                width: 90 * baseVanScale,
                height: 90 * baseVanScale,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #e2c044',
                transform: `scale(${burgerScale}) rotate(-6deg)`,
                boxShadow: '0 0 24px rgba(226, 192, 68, 0.95), 0 8px 20px rgba(0,0,0,0.8)',
                zIndex: 45
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

            {/* FARO DERECHO: SÁNDWICH BARRA EMERGENTE */}
            <div
              style={{
                position: 'absolute',
                left: (588 - 45) * baseVanScale + sandwichX + foodFlankSpread,
                top: (522 - 45) * baseVanScale + sandwichY,
                width: 90 * baseVanScale,
                height: 90 * baseVanScale,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #e2c044',
                transform: `scale(${sandwichScale}) rotate(6deg)`,
                boxShadow: '0 0 24px rgba(226, 192, 68, 0.95), 0 8px 20px rgba(0,0,0,0.8)',
                zIndex: 45
              }}
            >
              <Img
                src={staticFile('assets/grafit/instagram/sandwich-barra.jpg')}
                style={{
                  width: '135%',
                  height: '135%',
                  objectFit: 'cover',
                  transform: 'translate(-15%, -15%)'
                }}
              />
            </div>

            {/* STICKERS GASTRONÓMICOS VINCULADOS A LOS PRODUCTOS */}
            {frame >= 115 && (
              <>
                {/* BURGER STICKER */}
                <div
                  style={{
                    position: 'absolute',
                    left: (156 - 85) * baseVanScale + burgerX - foodFlankSpread,
                    top: (526 + 65) * baseVanScale + burgerY,
                    backgroundColor: '#b91c1c',
                    color: '#ffffff',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: '4px 14px',
                    border: '2px solid #000000',
                    boxShadow: '4px 4px 0 #000',
                    transform: `scale(${interpolate(foodTagSpring, [0, 1], [0.5, 1])}) rotate(-5deg)`,
                    opacity: interpolate(foodTagSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
                    zIndex: 46
                  }}
                >
                  BURGER 100% BUEY
                </div>

                {/* SÁNDWICH STICKER */}
                <div
                  style={{
                    position: 'absolute',
                    left: (588 - 75) * baseVanScale + sandwichX + foodFlankSpread,
                    top: (522 + 65) * baseVanScale + sandwichY,
                    backgroundColor: '#0a0a0a',
                    color: '#e2c044',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: '4px 14px',
                    border: '2px solid #e2c044',
                    boxShadow: '4px 4px 0 #b91c1c',
                    transform: `scale(${interpolate(foodTagSpring, [0, 1], [0.5, 1])}) rotate(5deg)`,
                    opacity: interpolate(foodTagSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
                    zIndex: 46
                  }}
                >
                  COCINA NON-STOP
                </div>
              </>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* PIEZAS DESPRENDIDAS: EMBLEMA VW Y MATRÍCULA GRAFIT             */}
        {/* ============================================================== */}
        {isDebadged && (
          <>
            {/* EMBLEMA VW FLOTANTE HACIA CÁMARA */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: `translate(${emblemX}px, ${emblemY}px) scale(${emblemScale}) rotate(${emblemRot}deg)`,
                filter: `drop-shadow(${emblemShadow}px ${emblemShadow * 1.4}px 24px rgba(0,0,0,0.95))`,
                opacity: emblemOpacity,
                zIndex: 60
              }}
            >
              <Img
                src={staticFile('assets/grafit/motion/van/layers/layer_03_vw_emblem.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MATRÍCULA GRAFIT CAYENDO CON FÍSICA DE GRAVEDAD */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: `translateY(${plateY}px) rotate(${plateRot}deg)`,
                filter: 'drop-shadow(6px 12px 14px rgba(0,0,0,0.85))',
                opacity: plateOpacity,
                zIndex: 55
              }}
            >
              <Img
                src={staticFile('assets/grafit/motion/van/layers/layer_06_license_plate.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* CONCEPTOS QUE SURGEN DE LA FURGONETA (GRUPOS, EVENTOS, SALÓN)  */}
        {/* ============================================================== */}
        {frame >= 165 && (
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
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
            {frame >= 178 && (
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
            {frame >= 192 && (
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
            {frame >= 200 && (
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
      {/* 3. COREOGRAFÍA DE LAS LETRAS GRAFIT                           */}
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
          const totalCenterW = 6 * centerLetterW + 5 * centerGap; // ~830px
          const centerStartX = (width - totalCenterW) / 2;
          const centerTargetX = centerStartX + idx * (centerLetterW + centerGap);
          const centerTargetY = 460;

          // Posición en Header móvil real (fase fijada superior)
          const headerLetterW = 68;
          const headerLetterH = 96;
          const headerGap = 12;
          const totalHeaderW = 6 * headerLetterW + 5 * headerGap; // ~468px
          const headerStartX = (width - totalHeaderW) / 2;
          const headerTargetX = headerStartX + idx * (headerLetterW + headerGap);
          const headerTargetY = 60;

          // Interpolación suave entre centro y header
          const currentX = interpolate(returnToHeaderSpring, [0, 1], [centerTargetX, headerTargetX]);
          const currentY = interpolate(returnToHeaderSpring, [0, 1], [centerTargetY, headerTargetY]);
          const currentW = interpolate(returnToHeaderSpring, [0, 1], [centerLetterW, headerLetterW]);
          const currentH = interpolate(returnToHeaderSpring, [0, 1], [centerLetterH, headerLetterH]);
          const currentFontSize = interpolate(returnToHeaderSpring, [0, 1], [115, 62]);

          // Desplazamiento por choque
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

        {/* TAPE ACCENT STRIP SOBRE EL HEADER UNA VEZ FIJADO */}
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
      {/* 4. CIERRE COMERCIAL Y CONVERSIÓN INFERIOR (SCENE FINAL)        */}
      {/* ============================================================== */}
      {frame >= 215 && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
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
              marginBottom: 14
            }}
          >
            // GRAFIT ROCK CAFÉ • INDAUTXU
          </div>

          {/* MAIN COMMERCIAL PROPOSAL */}
          <h2
            style={{
              fontSize: 48,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              lineHeight: 1.1,
              textShadow: '4px 4px 0px #b91c1c, 8px 8px 0px #000000',
              margin: '0 0 20px 0',
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
              fontSize: 38,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              transform: 'rotate(1deg)',
              marginBottom: 18
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
