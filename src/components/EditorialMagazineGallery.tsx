import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { ChevronLeft, ChevronRight, BookOpen, Maximize2, X, Sparkles, Volume2, Bookmark, Eye } from 'lucide-react';

interface MagazineSpread {
  id: string;
  spreadNumber: string;
  category: string;
  themeColor: string;
  leftPage: {
    vol: string;
    headline: string;
    subhead: string;
    editorialText: string;
    quote: string;
    quoteAuthor: string;
    tags: string[];
    specs: { label: string; value: string }[];
  };
  rightPage: {
    photo: string;
    caption: string;
    stamp: string;
    tagline: string;
    aspectRatio: string;
  };
}

const MAGAZINE_SPREADS: MagazineSpread[] = [
  {
    id: 'culinary-rock',
    spreadNumber: '01 — 02',
    category: 'GASTRONOMÍA // ROCK FOOD',
    themeColor: '#b91c1c',
    leftPage: {
      vol: 'VOL. 03 // ARCHIVO GASTRONÓMICO',
      headline: 'CULINARY ROCK & BUEY 100%',
      subhead: 'La cocina de Grafit no cierra: ritmo ininterrumpido en Indautxu',
      editorialText:
        'Lejos del concepto de comida rápida industrial, en Grafit las hamburguesas se elaboran con carne 100% buey seleccionada, pan artesano tostado y acompañamientos caseros. Una propuesta sólida pensada para disfrutar tanto en barra rápida como en mesa larga de cuadrilla.',
      quote: '"La cocina debe sonar tan rotunda y sincera como un acorde de distorsión."',
      quoteAuthor: 'Grafit Rock Café — Cocina Non-Stop',
      tags: ['100% BUEY', 'COCINA NON-STOP', 'PAN ARTESANO', 'RACIONES'],
      specs: [
        { label: 'DISPONIBILIDAD', value: 'Mediodía, tarde y noche' },
        { label: 'ESPECIALIDAD', value: 'Burger Buey & Sándwich Club' },
        { label: 'SERVICIO', value: 'Barra y Salón Multiusos' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/instagram/burguer.webp',
      caption: 'Hamburguesa 100% buey con queso fundido, bacon crujiente y salsa especial.',
      stamp: 'PLATO INSIGNIA',
      tagline: 'FOTOGRAFÍA REAL // BARRA DE GRAFIT',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'salon-multiusos',
    spreadNumber: '03 — 04',
    category: 'ARQUITECTURA // ESPACIO SINGULAR',
    themeColor: '#e2c044',
    leftPage: {
      vol: 'VOL. 03 // ESPACIO Y ACÚSTICA',
      headline: 'EL GRAN SALÓN DE INDAUTXU',
      subhead: 'Madera, confort acústico y modularidad para grupos',
      editorialText:
        'El secreto mejor guardado de Grafit es su gran salón interior. Un espacio independiente con iluminación cálida, paredes decoradas con mitos del rock y una acústica diseñada para que las conversaciones fluyan sin el estruendo de un comedor convencional.',
      quote: '"Un lugar donde la cuadrilla puede reunirse sin prisas de turnos."',
      quoteAuthor: 'Bitácora de Urrutia 1',
      tags: ['ESPACIO DIÁFANO', 'MURAL DE CONCIERTO', 'CONFORT ACÚSTICO'],
      specs: [
        { label: 'CAPACIDAD', value: 'Hasta 50 personas modulables' },
        { label: 'EQUIPAMIENTO', value: 'Barra propia y sonido adaptado' },
        { label: 'USOS', value: 'Cuadrillas, cumpleaños y eventos' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/interior/grafit-salon-mesas-11.jpg',
      caption: 'Mesas corridas dispuestas frente al gran mural de concierto en el salón.',
      stamp: 'CONFORT & REUNIÓN',
      tagline: 'FOTOGRAFÍA REAL // SALÓN INTERIOR',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'volkswagen-icon',
    spreadNumber: '05 — 06',
    category: 'PATRIMONIO // ICONO GRAFIT',
    themeColor: '#b91c1c',
    leftPage: {
      vol: 'VOL. 03 // IDENTIDAD VISUAL',
      headline: 'LA VOLKSWAGEN DECORATIVA',
      subhead: 'La media furgoneta clásica que preside el salón',
      editorialText:
        'No es una furgoneta completa: es una pieza decorativa frontal artesanal que rinde tributo a la era dorada de las giras de rock and roll. Integrada en el muro del salón, es el punto focal donde se sacan las fotos de cuadrilla y los brindis de celebración.',
      quote: '"El símbolo rodante de los viajes musicales aparcado en Bilbao."',
      quoteAuthor: 'Historia de Grafit',
      tags: ['T1 VINTAGE', 'ESCENOGRAFÍA REAL', 'PUNTO FOTO', 'ICONO'],
      specs: [
        { label: 'ORIGEN', value: 'Instalación decorativa propia' },
        { label: 'COLORES', value: 'Rojo carmín y blanco marfil' },
        { label: 'UBICACIÓN', value: 'Frontal del Salón Multiusos' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/instagram/volkswagen.jpg',
      caption: 'La media Volkswagen clásica del salón con faros cromados y matrícula Grafit.',
      stamp: 'ICONO REAL',
      tagline: 'FOTOGRAFÍA REAL // INSTALACIÓN SALÓN',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'athletic-barrio',
    spreadNumber: '07 — 08',
    category: 'COMUNIDAD // SENTIMIENTO ATHLETIC',
    themeColor: '#b91c1c',
    leftPage: {
      vol: 'VOL. 03 // CULTURA DE BARRIO',
      headline: 'LA PREVIA EN INDAUTXU',
      subhead: 'A 10 minutos de la Catedral con cerveza de tanque',
      editorialText:
        'Cada jornada de partido en San Mamés, Grafit se transforma en el punto de encuentro natural de cuadrillas zurigorris. Dos tanques presenciales de cerveza helada a -2°C, poteo con rock y la bajada conjunta hacia el estadio.',
      quote: '"El partido se juega en San Mamés, pero la previa se hace en Grafit."',
      quoteAuthor: 'Cuadrillas de Indautxu',
      tags: ['CERVEZA DE TANQUE', '-2°C GLACIAR', 'SAN MAMÉS 10 MIN'],
      specs: [
        { label: 'DISTANCIA', value: '10 min a pie a San Mamés' },
        { label: 'CERVEZA', value: 'Tanques sin pasteurizar a -2°C' },
        { label: 'RITUAL', value: 'Previa y Tercer Tiempo' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/interior/grafit-barra-01.jpg',
      caption: 'Cañeros de tanque y barra viva durante la previa del partido.',
      stamp: 'ATMÓSFERA ZURIGORRI',
      tagline: 'FOTOGRAFÍA REAL // BARRA DE GRIFOS',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'musica-y-copas',
    spreadNumber: '09 — 10',
    category: 'NOCHE // COCTELERÍA & ROCK',
    themeColor: '#e2c044',
    leftPage: {
      vol: 'VOL. 03 // VIBRACIÓN NOCTURNA',
      headline: 'NOCHES DE ROCK & COPAS',
      subhead: 'Copas cuidadas, buena cristalería y selección musical sin concesiones',
      editorialText:
        'Al caer la tarde, las luces bajan y Grafit adopta su vertiente más club. Desde combinados clásicos hasta destilados premium servidos con hielo macizo y cítricos frescos, todo al ritmo de una selección musical que recorre el rock and roll.',
      quote: '"La buena música no acompaña la conversación: la inspira."',
      quoteAuthor: 'Grafit Club Sessions',
      tags: ['COCTELERÍA', 'ROCK SESSIONS', 'BUEN HIELO', 'AFTERWORK'],
      specs: [
        { label: 'HORARIO', value: 'Tarde y noche de jueves a domingo' },
        { label: 'BANDA SONORA', value: 'Classic, Grunge & Alternative Rock' },
        { label: 'SERVICIO', value: 'Cristalería fina y destilados premium' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/instagram/copas.webp',
      caption: 'Copas preparadas con mimo en la barra de Grafit durante el turno de noche.',
      stamp: 'AFTERWORK & NIGHT',
      tagline: 'FOTOGRAFÍA REAL // NOCHE EN INDAUTXU',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'sandwich-barra',
    spreadNumber: '11 — 12',
    category: 'TRADICIÓN // BARRA BILBAÍNA',
    themeColor: '#0a0a0a',
    leftPage: {
      vol: 'VOL. 03 // EL BOCADO RÁPIDO',
      headline: 'SÁNDWICHES Y PINTXOS CALIENTES',
      subhead: 'La barra de Indautxu que nunca te deja sin bocado',
      editorialText:
        'El formato perfecto para el descanso del mediodía o el picoteo entre cañas. Pan crujiente recién pasado por plancha, rellenos generosos de calidad y servicio ágil para quienes viven el ritmo dinámico de Bilbao.',
      quote: '"La barra debe estar siempre viva, caliente y dispuesta."',
      quoteAuthor: 'Cultura de Bar en Bilbao',
      tags: ['SÁNDWICH PLANCHA', 'PINTXOS', 'PICA-PICA', 'BARRA RÁPIDA'],
      specs: [
        { label: 'SERVICIO', value: 'Non-stop durante todo el día' },
        { label: 'MARIDAJE', value: 'Cañón de tanque o crianza' },
        { label: 'FORMATO', value: 'Para tomar o compartir' },
      ],
    },
    rightPage: {
      photo: '/assets/grafit/instagram/sandwich.webp',
      caption: 'Sándwich tostado al momento con ingredientes seleccionados.',
      stamp: 'CLÁSICO DE BARRA',
      tagline: 'FOTOGRAFÍA REAL // COCINA CONTINUA',
      aspectRatio: 'aspect-[4/5]',
    },
  },
];

export const EditorialMagazineGallery: React.FC = () => {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [isInspecting, setIsInspecting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const spread = MAGAZINE_SPREADS[currentSpreadIndex];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 3D Perspective Tilt on Mouse Movement (Inspired by WebGL Magazine)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Smooth rotational angles (max 10 deg)
    const rx = -y * 14;
    const ry = x * 18;

    setMousePos({ x, y, rx, ry });
  }, [isReducedMotion]);

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  const nextSpread = () => {
    setCurrentSpreadIndex((prev) => (prev + 1) % MAGAZINE_SPREADS.length);
  };

  const prevSpread = () => {
    setCurrentSpreadIndex((prev) => (prev - 1 + MAGAZINE_SPREADS.length) % MAGAZINE_SPREADS.length);
  };

  return (
    <section
      id="magazine-gallery-section"
      className="relative py-16 sm:py-24 border-b-8 border-black overflow-hidden bg-[#100f0e] text-[#f5efe1] select-none"
    >
      {/* 1. BACKGROUND NEWSPRINT & AMBIENT DEPTH */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/grafit/fanzine-wall-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#100f0e]/80 to-[#100f0e] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* ================================================================= */}
        {/* MAGAZINE FOLIO HEADER                                             */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-neutral-800 mb-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono-code text-[11px] px-3 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[2px_2px_0_#000]">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>GRAFIT ZINE // ARCHIVO EDITORIAL</span>
              </span>
              <span className="font-mono-code text-[11px] text-[#e2c044] bg-black px-2.5 py-1 border border-neutral-700">
                PÁGINAS {spread.spreadNumber} DE 12
              </span>
            </div>

            <h2 className="font-anton text-4xl sm:text-6xl text-[#f5efe1] uppercase tracking-wider leading-none">
              MEMORIA EDITORIAL & VIDA EN GRAFIT
            </h2>
            <p className="font-sans text-neutral-400 text-sm max-w-2xl leading-relaxed">
              Exploración interactiva tridimensional inspirada en la cultura de los fanzines musicales. Fotografías reales capturadas en el local de Indautxu.
            </p>
          </div>

          {/* SPREAD NAVIGATION PILLS */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prevSpread}
              className="p-3 bg-black hover:bg-[#b91c1c] text-white border-2 border-neutral-700 hover:border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono-code text-xs px-3 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300">
              {currentSpreadIndex + 1} / {MAGAZINE_SPREADS.length}
            </span>
            <button
              onClick={nextSpread}
              className="p-3 bg-black hover:bg-[#b91c1c] text-white border-2 border-neutral-700 hover:border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SPREAD TABS QUICK ACCESS (DIRECT THEME SELECTOR)                  */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {MAGAZINE_SPREADS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSpreadIndex(idx)}
              className={`shrink-0 px-3 py-1.5 font-mono-code text-xs border transition-all cursor-pointer ${
                idx === currentSpreadIndex
                  ? 'bg-[#b91c1c] text-white border-black font-bold shadow-[3px_3px_0_#000]'
                  : 'bg-black/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
              }`}
            >
              <span className="text-amber-300 mr-1.5 font-bold">[{s.spreadNumber}]</span>
              <span>{s.category.split('//')[0]}</span>
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* 3D INTERACTIVE MAGAZINE STAGE (WEBGL-MAGAZINE PERSPECTIVE)         */}
        {/* ================================================================= */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-6xl mx-auto py-6 sm:py-10 [perspective:1400px]"
        >
          {/* 3D ROTATING MAGAZINE BOOK CONTAINER */}
          <div
            className="relative w-full bg-[#f6f2e8] text-black border-4 border-black shadow-[16px_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              transform: isReducedMotion
                ? 'none'
                : `rotateX(${mousePos.rx}deg) rotateY(${mousePos.ry}deg)`,
            }}
          >
            {/* DYNAMIC SPECULAR LIGHT GRADIENT */}
            {!isReducedMotion && (
              <div
                className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`,
                }}
              />
            )}

            {/* MAGAZINE SPINE CREASE (CENTER BINDING FOLD) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-black/25 via-black/40 to-black/25 pointer-events-none z-30 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-neutral-900">
              
              {/* =========================================================== */}
              {/* LEFT PAGE: TYPOGRAPHIC EDITORIAL SPREAD                     */}
              {/* =========================================================== */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative bg-[#f7f3ea]">
                <div className="masking-tape tape-corner-tl" />

                {/* PAGE FOLIO HEADER */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <span className="font-mono-code text-[11px] font-bold text-neutral-700 uppercase tracking-widest">
                    {spread.leftPage.vol}
                  </span>
                  <span className="font-mono-code text-xs font-bold text-[#b91c1c] bg-white px-2 py-0.5 border border-black">
                    PAG. {spread.spreadNumber.split('—')[0].trim()}
                  </span>
                </div>

                {/* MAIN HEADLINE */}
                <div className="space-y-3">
                  <span
                    className="inline-block text-[10px] font-mono-code font-bold px-2 py-0.5 border border-black uppercase text-white shadow-xs"
                    style={{ backgroundColor: spread.themeColor }}
                  >
                    {spread.category}
                  </span>
                  <h3 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide leading-[0.95] text-black">
                    {spread.leftPage.headline}
                  </h3>
                  <p className="font-mono-code text-xs text-neutral-800 font-bold uppercase">
                    {spread.leftPage.subhead}
                  </p>
                </div>

                {/* BODY STORY */}
                <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed">
                  {spread.leftPage.editorialText}
                </p>

                {/* PULL QUOTE */}
                <blockquote className="p-4 bg-white border-l-4 border-[#b91c1c] shadow-[3px_3px_0_#000] space-y-1">
                  <p className="font-sans italic text-xs sm:text-sm text-neutral-900 font-semibold leading-snug">
                    {spread.leftPage.quote}
                  </p>
                  <footer className="font-mono-code text-[10px] text-neutral-500 uppercase tracking-wider">
                    — {spread.leftPage.quoteAuthor}
                  </footer>
                </blockquote>

                {/* SPECS AND TAGS */}
                <div className="space-y-3 pt-3 border-t-2 border-black">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {spread.leftPage.specs.map((spec, i) => (
                      <div key={i} className="font-mono-code text-[10px]">
                        <span className="text-neutral-500 block">{spec.label}</span>
                        <span className="font-bold text-black">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spread.leftPage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-black text-[#f5efe1] font-mono-code text-[9px] px-2 py-0.5 border border-black uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* =========================================================== */}
              {/* RIGHT PAGE: PHOTOGRAPHIC PLATE & VISUAL ESSAY               */}
              {/* =========================================================== */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative bg-[#fdfbf7]">
                <div className="masking-tape tape-corner-tr" />

                {/* PAGE FOLIO HEADER */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <span className="font-mono-code text-[11px] font-bold text-neutral-700 uppercase tracking-widest">
                    {spread.rightPage.tagline}
                  </span>
                  <span className="font-mono-code text-xs font-bold text-black bg-[#e2c044] px-2 py-0.5 border border-black">
                    PAG. {spread.spreadNumber.split('—')[1].trim()}
                  </span>
                </div>

                {/* PHOTOGRAPHIC CANVAS WITH DEPTH */}
                <div className="relative group cursor-pointer" onClick={() => setIsInspecting(true)}>
                  <div className="relative aspect-[4/3] bg-black border-4 border-black overflow-hidden shadow-[8px_8px_0_#000]">
                    <img
                      src={spread.rightPage.photo}
                      alt={spread.rightPage.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* STAMP BADGE */}
                    <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono-code text-[10px] font-bold px-2.5 py-0.5 border border-black uppercase shadow-[2px_2px_0_#000] rot-neg-2">
                      {spread.rightPage.stamp}
                    </div>

                    {/* EXPAND BUTTON OVERLAY */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-anton text-sm uppercase tracking-wider">
                      <Maximize2 className="w-5 h-5 text-amber-300" />
                      <span>AMPLIAR DETALLE</span>
                    </div>
                  </div>

                  <p className="font-mono-code text-[11px] text-neutral-700 mt-3 text-center italic">
                    {spread.rightPage.caption}
                  </p>
                </div>

                {/* BOTTOM SPREAD CONTROLS */}
                <div className="pt-4 border-t-2 border-black flex items-center justify-between">
                  <span className="font-mono-code text-[11px] text-neutral-600 font-bold uppercase">
                    ★ GRAFIT ROCK CAFÉ • URRUTIA 1
                  </span>

                  <button
                    onClick={() => setIsInspecting(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-[#b91c1c] text-white font-mono-code text-[11px] uppercase border border-black transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECCIONAR PLIEGO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* MODAL LIGHTBOX INSPECTION                                         */}
        {/* ================================================================= */}
        {isInspecting && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsInspecting(false)}
          >
            <div
              className="relative w-full max-w-4xl bg-[#f4eedd] text-black border-4 border-black p-6 sm:p-10 shadow-[16px_16px_0px_#b91c1c] space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b-3 border-black">
                <div>
                  <span className="font-mono-code text-xs font-bold text-[#b91c1c] uppercase">
                    INSPECCIÓN EDITORIAL // PLIEGO {spread.spreadNumber}
                  </span>
                  <h3 className="font-anton text-3xl sm:text-5xl text-black uppercase">
                    {spread.leftPage.headline}
                  </h3>
                </div>
                <button
                  onClick={() => setIsInspecting(false)}
                  className="p-2 bg-black text-white border-2 border-black hover:bg-[#b91c1c] transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black border-3 border-black overflow-hidden shadow-[6px_6px_0_#000]">
                <img
                  src={spread.rightPage.photo}
                  alt={spread.rightPage.caption}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <p className="font-sans text-neutral-900 text-base leading-relaxed">
                  {spread.leftPage.editorialText}
                </p>
                <p className="font-mono-code text-xs text-neutral-600 italic">
                  {spread.rightPage.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-neutral-300">
                <button
                  onClick={prevSpread}
                  className="px-4 py-2 bg-black text-white font-anton text-sm uppercase hover:bg-[#b91c1c] transition-colors cursor-pointer"
                >
                  ← PLIEGO ANTERIOR
                </button>
                <button
                  onClick={nextSpread}
                  className="px-4 py-2 bg-black text-white font-anton text-sm uppercase hover:bg-[#b91c1c] transition-colors cursor-pointer"
                >
                  PLIEGO SIGUIENTE →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
