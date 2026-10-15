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

export const GrafitHeroSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ==========================================
  // PROGRESS TIMINGS (0 - 300 FRAMES, 10 SECONDS)
  // ==========================================
  // Scene 1: 0 - 65   (Grafit aparece)
  // Scene 2: 65 - 135 (Faros gastronómicos activos)
  // Scene 3: 135 - 205 (Despiece de piezas)
  // Scene 4: 205 - 260 (Lo que esconde Grafit: Grupos, Eventos, Salón)
  // Scene 5: 260 - 300 (Cierre comercial)

  // 1. Scene 1 - Entrance of Van
  const vanEnterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 80 }
  });
  const vanScale = interpolate(vanEnterSpring, [0, 1], [0.82, 1.0]);
  const vanY = interpolate(vanEnterSpring, [0, 1], [70, 0]);
  const vanOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: 'clamp' });
  const vanTilt = interpolate(vanEnterSpring, [0, 1], [6, 0]);

  // 2. Scene 2 - Headlight activation & Food reveal
  const hlGlow = interpolate(
    frame,
    [65, 75, 85, 130],
    [0, 1, 0.4, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const burgerReveal = spring({
    frame: frame - 72,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 90 }
  });
  const burgerScale = interpolate(burgerReveal, [0, 1], [0.1, 1.0]);
  const burgerRot = interpolate(burgerReveal, [0, 1], [-25, 0]);

  const sandwichReveal = spring({
    frame: frame - 82,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 90 }
  });
  const sandwichScale = interpolate(sandwichReveal, [0, 1], [0.1, 1.0]);
  const sandwichRot = interpolate(sandwichReveal, [0, 1], [25, 0]);

  const foodTagOpacity = interpolate(
    frame,
    [85, 95, 135, 145],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 3. Scene 3 - Detachment / Exploded view
  const isDebadged = frame >= 135;

  const emblemSpring = spring({
    frame: frame - 135,
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 70 }
  });
  const emblemScale = interpolate(emblemSpring, [0, 1], [1.0, 2.5]);
  const emblemX = interpolate(emblemSpring, [0, 1], [0, 75]);
  const emblemY = interpolate(emblemSpring, [0, 1], [0, -60]);
  const emblemRot = interpolate(emblemSpring, [0, 1], [0, 18]);
  const emblemShadow = interpolate(emblemSpring, [0, 1], [0, 25]);
  const emblemOpacity = interpolate(frame, [195, 215], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const plateSpring = spring({
    frame: frame - 145,
    fps,
    config: { damping: 10, mass: 1.1, stiffness: 60 }
  });
  const plateY = interpolate(plateSpring, [0, 1], [0, 250]);
  const plateRot = interpolate(plateSpring, [0, 1], [0, -16]);
  const plateOpacity = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const hlSlide = spring({
    frame: frame - 150,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 70 }
  });
  const hlLeftX = interpolate(hlSlide, [0, 1], [0, -110]);
  const hlRightX = interpolate(hlSlide, [0, 1], [0, 110]);
  const hlSlideOpacity = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const vanBodyFade = interpolate(
    frame,
    [160, 210],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const vanBodySlideY = interpolate(
    frame,
    [160, 210],
    [0, 140],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 4. Scene 4 - Concepts reveal (Grupos, Eventos, Salón Multiusos)
  const gruposSpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 100 }
  });
  const gruposScale = interpolate(gruposSpring, [0, 1], [2.2, 1.0]);
  const gruposOpacity = interpolate(gruposSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  const eventosSpring = spring({
    frame: frame - 215,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 100 }
  });
  const eventosScale = interpolate(eventosSpring, [0, 1], [2.2, 1.0]);
  const eventosOpacity = interpolate(eventosSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  const salonSpring = spring({
    frame: frame - 230,
    fps,
    config: { damping: 11, mass: 0.8, stiffness: 100 }
  });
  const salonScale = interpolate(salonSpring, [0, 1], [2.2, 1.0]);
  const salonOpacity = interpolate(salonSpring, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' });

  const scene4Fade = interpolate(
    frame,
    [255, 265],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 5. Scene 5 - Commercial closing
  const closingSpring = spring({
    frame: frame - 262,
    fps,
    config: { damping: 13, mass: 0.9, stiffness: 85 }
  });
  const closingScale = interpolate(closingSpring, [0, 1], [0.85, 1.0]);
  const closingOpacity = interpolate(closingSpring, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  // Scaling factor for 1280x720 canvas
  // Original van is 720x900. On a 720h canvas, scale to 0.72 fits comfortably with 648px height.
  const baseVanScale = 0.70;
  const vanCanvasW = 720 * baseVanScale;
  const vanCanvasH = 900 * baseVanScale;
  const vanLeft = (width - vanCanvasW) / 2;
  const vanTop = (height - vanCanvasH) / 2 + 35; // slightly lower for podium anchor

  return (
    <AbsoluteFill style={{ backgroundColor: '#181615', overflow: 'hidden', fontFamily: 'Impact, Anton, sans-serif' }}>
      
      {/* ============================================================== */}
      {/* CAPA POSTERIOR: FONDO GRÁFICO ORIGINAL DE GRAFIT (PUNK WALL BG) */}
      {/* ============================================================== */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 19, 18, 0.45), rgba(20, 19, 18, 0.45)),
            url("${staticFile('assets/grafit/punk-wall-bg.jpg')}")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
          transform: `scale(${interpolate(frame, [0, 300], [1.03, 1.0])})`,
          filter: 'contrast(1.08) brightness(0.95)'
        }}
      />

      {/* TEXTURA VINTAGE & GRANO ANALÓGICO (ZINE WALL EFFECT) */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 20%, rgba(200, 185, 155, 0.3), transparent 60%),
            radial-gradient(ellipse at 85% 75%, rgba(180, 160, 130, 0.25), transparent 55%),
            radial-gradient(#000000 0.75px, transparent 0.75px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 24px 24px',
          mixBlendMode: 'multiply',
          opacity: 0.45,
          pointerEvents: 'none'
        }}
      />

      {/* ============================================================== */}
      {/* CAPA INTERMEDIA: CONTENIDOS REVELADOS (SCENE 4 & SCENE 5)      */}
      {/* ============================================================== */}

      {/* SCENE 4: CONCEPTOS REVELADOS DETRÁS DE LA CARROCERÍA */}
      {frame >= 195 && frame < 270 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            opacity: scene4Fade,
            zIndex: 10,
            padding: 40
          }}
        >
          {/* BADGE 1: GRUPOS */}
          <div
            style={{
              transform: `scale(${gruposScale}) rotate(-3deg)`,
              opacity: gruposOpacity,
              backgroundColor: '#b91c1c',
              color: '#ffffff',
              padding: '12px 36px',
              border: '4px solid #000000',
              boxShadow: '8px 8px 0px #000000',
              fontSize: 64,
              letterSpacing: '4px',
              textTransform: 'uppercase'
            }}
          >
            ★ GRUPOS ★
          </div>

          {/* BADGE 2: EVENTOS */}
          <div
            style={{
              transform: `scale(${eventosScale}) rotate(2deg)`,
              opacity: eventosOpacity,
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '10px 42px',
              border: '4px solid #ffffff',
              boxShadow: '8px 8px 0px #b91c1c',
              fontSize: 68,
              letterSpacing: '5px',
              textTransform: 'uppercase'
            }}
          >
            EVENTOS
          </div>

          {/* BADGE 3: SALÓN MULTIUSOS */}
          <div
            style={{
              transform: `scale(${salonScale}) rotate(-1deg)`,
              opacity: salonOpacity,
              backgroundColor: '#f5efe1',
              color: '#000000',
              padding: '8px 32px',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0px #000000',
              fontSize: 42,
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}
          >
            EL GRAN SALÓN MULTIUSOS
          </div>

          <p
            style={{
              opacity: salonOpacity,
              fontFamily: 'Courier New, monospace',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#f5efe1',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: '6px 16px',
              border: '1px solid #b91c1c',
              marginTop: 10,
              letterSpacing: '2px'
            }}
          >
            // COMIDAS • CUMPLEAÑOS • CELEBRACIONES EN INDAUTXU
          </p>
        </AbsoluteFill>
      )}

      {/* SCENE 5: CIERRE COMERCIAL FINAL */}
      {frame >= 255 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: closingOpacity,
            transform: `scale(${closingScale})`,
            zIndex: 50,
            padding: 40,
            textAlign: 'center'
          }}
        >
          {/* TAPE TOP */}
          <div
            style={{
              backgroundColor: '#b91c1c',
              color: '#ffffff',
              fontFamily: 'Courier New, monospace',
              fontSize: 14,
              fontWeight: 'bold',
              letterSpacing: '3px',
              padding: '4px 14px',
              border: '2px solid #000000',
              transform: 'rotate(-2deg)',
              marginBottom: 16
            }}
          >
            // GRAFIT ROCK CAFÉ • BILBAO
          </div>

          {/* MAIN PROPOSAL */}
          <h1
            style={{
              fontSize: 54,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '4px 4px 0px #b91c1c, 8px 8px 0px #000000',
              margin: '0 0 20px 0',
              maxWidth: 900,
              lineHeight: 1.1
            }}
          >
            TU PRÓXIMA EXPERIENCIA EMPIEZA EN GRAFIT
          </h1>

          {/* CTA BADGE */}
          <div
            style={{
              backgroundColor: '#f5efe1',
              color: '#000000',
              border: '5px solid #000000',
              boxShadow: '8px 8px 0px #b91c1c',
              padding: '16px 40px',
              fontSize: 36,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              transform: 'rotate(1deg)',
              cursor: 'pointer',
              marginBottom: 20
            }}
          >
            ★ ORGANIZA TU EVENTO ★
          </div>

          {/* ADDRESS & DETAILS */}
          <div
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: 15,
              color: '#e5e0d3',
              backgroundColor: 'rgba(0,0,0,0.85)',
              padding: '8px 24px',
              border: '2px solid rgba(255,255,255,0.2)',
              letterSpacing: '2px'
            }}
          >
            URRUTIA KALEA 1 • INDAUTXU (BILBAO) • TEL: 944 12 34 56
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================== */}
      {/* CAPA FRONTAL: MEDIA VOLKSWAGEN Y PIEZAS ANIMADAS               */}
      {/* ============================================================== */}
      <div
        style={{
          position: 'absolute',
          left: vanLeft,
          top: vanTop,
          width: vanCanvasW,
          height: vanCanvasH,
          transform: `scale(${vanScale}) translateY(${vanY}px) perspective(800px) rotateX(${vanTilt}deg)`,
          opacity: vanOpacity,
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
            height: '100%',
            opacity: vanBodyFade
          }}
        />

        {/* BASE BODY OF THE VOLKSWAGEN (LAYER 02) */}
        {/* In frames 0-135, complete with badge; in frame 135+, debadged to prevent duplication */}
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
            height: '100%',
            opacity: vanBodyFade,
            transform: `translateY(${vanBodySlideY}px)`
          }}
        />

        {/* ============================================================== */}
        {/* SCENE 2: FAROS ACTIVOS Y GASTRONOMÍA (REVELACIÓN DE PRODUCTO)   */}
        {/* ============================================================== */}
        {frame >= 65 && frame < 210 && (
          <>
            {/* GLOW PULSE EN FAROS */}
            <div
              style={{
                position: 'absolute',
                left: (156 - 56) * baseVanScale + hlLeftX,
                top: (526 - 56) * baseVanScale,
                width: 112 * baseVanScale,
                height: 112 * baseVanScale,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 230, 120, 0.45)',
                filter: 'blur(10px)',
                opacity: hlGlow * hlSlideOpacity
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: (588 - 56) * baseVanScale + hlRightX,
                top: (522 - 56) * baseVanScale,
                width: 112 * baseVanScale,
                height: 112 * baseVanScale,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 230, 120, 0.45)',
                filter: 'blur(10px)',
                opacity: hlGlow * hlSlideOpacity
              }}
            />

            {/* FARO IZQUIERDO: REVELACIÓN BURGER GRAFIT */}
            <div
              style={{
                position: 'absolute',
                left: (156 - 42) * baseVanScale + hlLeftX,
                top: (526 - 42) * baseVanScale,
                width: 84 * baseVanScale,
                height: 84 * baseVanScale,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #e2c044',
                transform: `scale(${burgerScale}) rotate(${burgerRot}deg)`,
                opacity: hlSlideOpacity,
                boxShadow: '0 0 12px rgba(226, 192, 68, 0.8)'
              }}
            >
              <Img
                src={staticFile('assets/grafit/instagram/burguer.webp')}
                style={{
                  width: '140%',
                  height: '140%',
                  objectFit: 'cover',
                  transform: 'translate(-15%, -15%)'
                }}
              />
            </div>

            {/* FARO DERECHO: REVELACIÓN SÁNDWICH BARRA */}
            <div
              style={{
                position: 'absolute',
                left: (588 - 42) * baseVanScale + hlRightX,
                top: (522 - 42) * baseVanScale,
                width: 84 * baseVanScale,
                height: 84 * baseVanScale,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #e2c044',
                transform: `scale(${sandwichScale}) rotate(${sandwichRot}deg)`,
                opacity: hlSlideOpacity,
                boxShadow: '0 0 12px rgba(226, 192, 68, 0.8)'
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

            {/* ETIQUETAS GASTRONÓMICAS DE FAROS (SCENE 2) */}
            <div
              style={{
                position: 'absolute',
                left: (156 - 70) * baseVanScale,
                top: (526 + 50) * baseVanScale,
                backgroundColor: '#b91c1c',
                color: '#ffffff',
                fontFamily: 'Courier New, monospace',
                fontSize: 10,
                fontWeight: 'bold',
                padding: '2px 8px',
                border: '1px solid #000',
                transform: 'rotate(-4deg)',
                opacity: foodTagOpacity
              }}
            >
              BURGER 100% BUEY
            </div>

            <div
              style={{
                position: 'absolute',
                left: (588 - 60) * baseVanScale,
                top: (522 + 50) * baseVanScale,
                backgroundColor: '#000000',
                color: '#e2c044',
                fontFamily: 'Courier New, monospace',
                fontSize: 10,
                fontWeight: 'bold',
                padding: '2px 8px',
                border: '1px solid #e2c044',
                transform: 'rotate(4deg)',
                opacity: foodTagOpacity
              }}
            >
              COCINA NON-STOP
            </div>
          </>
        )}

        {/* ============================================================== */}
        {/* SCENE 3: PIEZAS INDEPENDIENTES (EMBLEMA VW & MATRÍCULA GRAFIT) */}
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
                filter: `drop-shadow(${emblemShadow}px ${emblemShadow * 1.5}px 15px rgba(0,0,0,0.9))`,
                opacity: emblemOpacity,
                zIndex: 35
              }}
            >
              <Img
                src={staticFile('assets/grafit/motion/van/layers/layer_03_vw_emblem.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* MATRÍCULA GRAFIT CON CAÍDA POR GRAVEDAD */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: `translateY(${plateY}px) rotate(${plateRot}deg)`,
                opacity: plateOpacity,
                filter: 'drop-shadow(4px 8px 10px rgba(0,0,0,0.8))',
                zIndex: 30
              }}
            >
              <Img
                src={staticFile('assets/grafit/motion/van/layers/layer_06_license_plate.png')}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </>
        )}
      </div>

      {/* BANNER SUPERIOR INICIAL EN ESCENA 1 & 2 */}
      {frame < 140 && (
        <div
          style={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            border: '3px solid #b91c1c',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            padding: '6px 20px',
            fontFamily: 'Courier New, monospace',
            fontSize: 13,
            fontWeight: 'bold',
            letterSpacing: '3px',
            zIndex: 40,
            opacity: interpolate(frame, [0, 15, 130, 140], [0, 1, 1, 0])
          }}
        >
          // EL SALÓN MULTIUSOS DE GRAFIT // INDAUTXU
        </div>
      )}

    </AbsoluteFill>
  );
};
