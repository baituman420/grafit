import React from 'react';

/**
 * GRAFIT CAFÉ — TRANSICIÓN DE PAPEL RASGADO HERO DESKTOP (V2)
 * 
 * Integra orgánicamente la franja superior de collage fanzine con el fondo oscuro del hero,
 * eliminando por completo el corte horizontal recto mediante:
 * 1. Silueta hiperrealista de papel rasgado a mano con variación de frecuencia y profundidad.
 * 2. Capa doble de fibras de pulpa blanca/crema al descubierto (efecto físico de desgarro).
 * 3. Sombra proyectada profunda sobre el collage superior para dar sensación de capa física.
 * 4. Fijaciones de cinta adhesiva envejecida (celo fanzine) y detalle punk en rojo.
 * 
 * CONDICIONES ESTRICTAS:
 * - Exclusivo para escritorio (hidden lg:block).
 * - Cero impacto en móvil.
 * - Cero dependencias pesadas ni animaciones innecesarias.
 */
export const HeroTornPaperEdge: React.FC = () => {
  // Coordenadas con variabilidad natural, desgarros profundos, dientes de fibra y cortes diagonales
  const mainTornPath = `
    M 0,28
    L 24,27 L 42,20 L 58,28 L 74,21 L 96,14 L 118,22 L 134,18 L 152,30 L 175,12 L 198,24 L 222,16 L 244,22 
    L 272,31 L 295,14 L 320,24 L 342,17 L 368,26 L 398,10 L 425,23 L 448,16 L 472,28 L 504,13 L 532,25 
    L 556,19 L 582,32 L 614,14 L 640,24 L 668,17 L 696,29 L 728,11 L 755,23 L 780,16 L 808,30 L 838,12 
    L 865,24 L 892,18 L 920,31 L 952,14 L 978,25 L 1005,17 L 1032,29 L 1064,12 L 1092,24 L 1118,17 
    L 1146,32 L 1178,13 L 1205,24 L 1230,17 L 1258,29 L 1290,11 L 1318,23 L 1344,17 L 1372,30 L 1404,13 
    L 1432,24 L 1458,18 L 1486,31 L 1518,14 L 1544,25 L 1570,17 L 1598,30 L 1630,11 L 1658,23 L 1684,17 
    L 1712,31 L 1744,13 L 1770,24 L 1798,17 L 1826,30 L 1858,14 L 1884,24 L 1905,19 L 1920,26
    L 1920,58
    L 0,58
    Z
  `;

  const topRimPath = `
    M 0,28
    L 24,27 L 42,20 L 58,28 L 74,21 L 96,14 L 118,22 L 134,18 L 152,30 L 175,12 L 198,24 L 222,16 L 244,22 
    L 272,31 L 295,14 L 320,24 L 342,17 L 368,26 L 398,10 L 425,23 L 448,16 L 472,28 L 504,13 L 532,25 
    L 556,19 L 582,32 L 614,14 L 640,24 L 668,17 L 696,29 L 728,11 L 755,23 L 780,16 L 808,30 L 838,12 
    L 865,24 L 892,18 L 920,31 L 952,14 L 978,25 L 1005,17 L 1032,29 L 1064,12 L 1092,24 L 1118,17 
    L 1146,32 L 1178,13 L 1205,24 L 1230,17 L 1258,29 L 1290,11 L 1318,23 L 1344,17 L 1372,30 L 1404,13 
    L 1432,24 L 1458,18 L 1486,31 L 1518,14 L 1544,25 L 1570,17 L 1598,30 L 1630,11 L 1658,23 L 1684,17 
    L 1712,31 L 1744,13 L 1770,24 L 1798,17 L 1826,30 L 1858,14 L 1884,24 L 1905,19 L 1920,26
  `;

  return (
    <div
      className="hidden lg:block absolute -top-7 left-0 right-0 w-full pointer-events-none select-none z-30 overflow-visible"
      aria-hidden="true"
    >
      {/* 1. SILUETA SVG DE PAPEL RASGADO CON SOMBRA PROYECTADA MULTICAPA */}
      <svg
        viewBox="0 0 1920 58"
        preserveAspectRatio="none"
        className="w-full h-9 xl:h-10 block"
        style={{
          filter: 'drop-shadow(0 -6px 10px rgba(0,0,0,0.92)) drop-shadow(0 -2px 3px rgba(0,0,0,0.98))',
        }}
      >
        {/* Cuerpo oscuro del papel rasgado (#0c0b0a idéntico al fondo del hero) */}
        <path d={mainTornPath} fill="#0c0b0a" />

        {/* Fibras expuestas de papel artesanal (blanco crema envejecido) */}
        <path
          d={topRimPath}
          fill="none"
          stroke="#fbf8f0"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="22, 2, 9, 3, 35, 2, 7, 1, 14, 2, 28, 3"
          opacity="0.90"
        />

        {/* Subcapa de pulpa deshilachada intermedia (ocre pálido) */}
        <path
          d={topRimPath}
          fill="none"
          stroke="#cfbe9e"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6, 8, 24, 4, 12, 3, 18, 5"
          opacity="0.55"
        />
      </svg>

      {/* 2. CINTAS ADHESIVAS FANZINE (CELO ENVEJECIDO Y MARCAS PUNK) */}
      {/* Cinta izquierda: sobre el ala de identidad */}
      <div
        className="absolute left-[11%] -top-3 w-16 xl:w-20 h-6 bg-[#fef3c7]/25 backdrop-blur-[0.5px] border-t border-b border-white/25 shadow-[0_2px_5px_rgba(0,0,0,0.45)] -rotate-3"
        style={{
          clipPath: 'polygon(0% 4%, 96% 0%, 100% 20%, 97% 45%, 100% 70%, 96% 96%, 4% 100%, 0% 75%, 3% 50%, 0% 25%)',
        }}
      />

      {/* Marca de cinta roja punk (cinta de señalización o fanzine) */}
      <div
        className="absolute left-[31%] -top-1 w-9 h-3.5 bg-[#b91c1c]/45 border border-[#b91c1c]/60 shadow-[0_1px_3px_rgba(0,0,0,0.5)] rotate-[-8deg] opacity-80"
        style={{
          clipPath: 'polygon(2% 0%, 98% 3%, 100% 95%, 0% 100%)',
        }}
      />

      {/* Cinta derecha: sobre el ala de navegación rápida */}
      <div
        className="absolute right-[13%] -top-2.5 w-18 xl:w-22 h-6 bg-[#fef3c7]/20 backdrop-blur-[0.5px] border-t border-b border-white/20 shadow-[0_2px_5px_rgba(0,0,0,0.4)] rotate-4"
        style={{
          clipPath: 'polygon(0% 0%, 96% 4%, 100% 30%, 97% 55%, 100% 80%, 96% 100%, 4% 96%, 0% 70%, 3% 45%, 0% 20%)',
        }}
      />
    </div>
  );
};
