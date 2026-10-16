import React, { useState } from 'react';
import { FaroViajeroStage } from './FaroViajeroStage';

export const FaroViajeroApp: React.FC = () => {
  const [viewportMode, setViewportMode] = useState<'mobile' | 'full'>('mobile');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-[#e5e0d3] font-mono flex flex-col">
      {/* 1. TOP AUDIT & VIEWPORT SWITCHER TOOLBAR */}
      <header className="sticky top-0 z-50 bg-[#161413]/95 border-b-2 border-[#b91c1c] backdrop-blur-md px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* TITLE & PHASE BADGE */}
          <div className="flex items-center gap-3">
            <span className="bg-[#b91c1c] text-white text-[11px] font-bold px-2.5 py-1 tracking-widest uppercase shadow-[2px_2px_0_#000]">
              FASE 03 • EXPERIMENTO
            </span>
            <h1 className="font-['Anton'] text-lg sm:text-xl text-[#f5efe1] uppercase tracking-wide">
              El Faro Viajero • Gastronomía Interactiva
            </h1>
          </div>

          {/* CONTROLS: VIEWPORT MODE & REDUCED MOTION */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center bg-black/60 p-1 border border-[#33302c]">
              <button
                onClick={() => setViewportMode('mobile')}
                className={`px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-[#e2c044] text-black shadow-[2px_2px_0_#000]'
                    : 'text-[#9c9488] hover:text-[#f5efe1]'
                }`}
              >
                📱 Móvil (390×844)
              </button>
              <button
                onClick={() => setViewportMode('full')}
                className={`px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                  viewportMode === 'full'
                    ? 'bg-[#e2c044] text-black shadow-[2px_2px_0_#000]'
                    : 'text-[#9c9488] hover:text-[#f5efe1]'
                }`}
              >
                🖥️ Pantalla Completa
              </button>
            </div>

            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-3 py-1.5 text-xs font-bold border transition-colors cursor-pointer ${
                reducedMotion
                  ? 'bg-[#16a34a] text-white border-green-400'
                  : 'bg-black/60 text-[#9c9488] border-[#33302c] hover:text-[#f5efe1]'
              }`}
            >
              ♿ Mov. Reducido: {reducedMotion ? 'ACTIVADO' : 'DESACTIVADO'}
            </button>
          </div>
        </div>

        {/* NARRATIVE CONTINUITY NOTICE */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#262320] flex items-center justify-between text-[11px] text-[#9c9488] flex-wrap gap-2">
          <div>
            <strong className="text-[#e2c044]">Continuidad Narrativa Hero V3:</strong> El faro procede del foco izquierdo de la Volkswagen (óptica gastronómica que desveló el sándwich en el Hero). Al salir del Hero, viaja autónomo por la pantalla.
          </div>
          <div className="text-[#86efac]">
            ● Rama aislada: <code className="text-[#f5efe1]">experiment/v3-faro-viajero</code>
          </div>
        </div>
      </header>

      {/* 2. MAIN EXPERIMENTAL CANVAS CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-start py-4 px-0 sm:px-4">
        <div
          className={`w-full transition-all duration-300 ${
            viewportMode === 'mobile'
              ? 'max-w-[420px] mx-auto border-x-0 sm:border-x-2 border-[#33302c] shadow-[0_0_50px_rgba(0,0,0,0.85)]'
              : 'max-w-6xl mx-auto border-2 border-[#33302c] shadow-[12px_12px_0_#000]'
          }`}
        >
          <FaroViajeroStage reducedMotion={reducedMotion} />
        </div>
      </main>

      {/* 3. TECHNICAL AUDIT & ANALYSIS FOOTER (QTEAM DELIVERABLE) */}
      <footer className="bg-[#121110] border-t-2 border-[#33302c] p-6 text-xs text-[#9c9488]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[#262320] pb-3">
            <h2 className="font-['Anton'] text-lg text-[#f5efe1] uppercase tracking-wider">
              Informe Técnico y de Auditoría • Fase 03
            </h2>
            <span className="text-[#e2c044]">GSAP ScrollTrigger + SVG Bezel + Mobile-First</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] leading-relaxed">
            <div className="p-4 bg-black/40 border border-[#2b2724]">
              <h3 className="font-['Anton'] text-sm text-[#e2c044] uppercase mb-2">1. Qué Funciona Satisfactoriamente</h3>
              <ul className="list-disc pl-4 space-y-1.5 text-[#ded8cb]">
                <li><strong>Continuidad con el scroll:</strong> El avance y retroceso es 100% fluido y reversible mediante <code className="text-[#e2c044]">scrub: 1</code> sin saltos de fotograma.</li>
                <li><strong>Presencia protagonista en móvil:</strong> El faro ocupa entre el 70% y el 88% del ancho disponible, haciendo los platos plenamente reconocibles.</li>
                <li><strong>Aro cromado vectorial SVG:</strong> Nitidez absoluta en pantallas retina sin la borrosidad del recorte raster original de 103px.</li>
                <li><strong>Metamorfosis a foto rectangular:</strong> Transición suave de <code className="text-[#e2c044]">border-radius: 50% → 16px</code> sin saltos de DOM.</li>
              </ul>
            </div>

            <div className="p-4 bg-black/40 border border-[#2b2724]">
              <h3 className="font-['Anton'] text-sm text-[#e2c044] uppercase mb-2">2. Aspectos para Refinamiento Posterior</h3>
              <ul className="list-disc pl-4 space-y-1.5 text-[#ded8cb]">
                <li><strong>Sensación de peso y flotación:</strong> Ajustar sutilmente la curva de inercia al cruzar el eje de pantalla en móvil.</li>
                <li><strong>Transición de fondo:</strong> El oscurecimiento progresivo del poster punk ayuda al descanso visual, pero convendrá calibrar el tono exacto con la paleta de la carta.</li>
                <li><strong>Interacción táctil:</strong> En pantallas táctiles reales, asegurar que el swipe no interfiera con enlaces secundarios.</li>
              </ul>
            </div>

            <div className="p-4 bg-black/40 border border-[#2b2724]">
              <h3 className="font-['Anton'] text-sm text-[#b91c1c] uppercase mb-2">3. Limitaciones con Máscaras y Fotos</h3>
              <p className="text-[#ded8cb]">
                Las fotos gastronómicas tienen relaciones de aspecto variadas (1:1 en hamburguesa y sándwich, 4:5 en pintxos). Al circularizarlas, se debe aplicar un punto focal centrado (<code className="text-[#e2c044]">object-center</code>) y compensar el encuadre para no cortar ingredientes clave.
              </p>
            </div>

            <div className="p-4 bg-black/40 border border-[#2b2724]">
              <h3 className="font-['Anton'] text-sm text-[#86efac] uppercase mb-2">4. Conexión con el Hero Remotion</h3>
              <p className="text-[#ded8cb]">
                Al finalizar el vídeo del Hero, la coordenada final del faro izquierdo en el canvas (aproximadamente <code className="text-[#e2c044]">x: 210px, y: 710px</code> escalado) servirá como punto de partida exacto de entrada para el elemento DOM de GSAP, asegurando una transición imperceptible fotograma-a-DOM.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
