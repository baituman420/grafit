import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, BookOpen, Maximize2, X, Sparkles, Volume2, Bookmark, Eye, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
      photo: './assets/grafit/instagram/burguer.webp',
      caption: 'Hamburguesa 100% buey con queso fundido, bacon crujiente y salsa especial.',
      stamp: 'PLATO INSIGNIA',
      tagline: 'FOTOGRAFÍA REAL // BARRA DE GRAFIT',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'salon-multiusos',
    spreadNumber: '03 — 04',
    category: 'EL ESPACIO // SALÓN INDAUTXU',
    themeColor: '#e2c044',
    leftPage: {
      vol: 'VOL. 02 // ARQUITECTURA INTERIOR',
      headline: 'EL REFUGIO DEL SALÓN MULTIUSOS',
      subhead: 'Un espacio diáfano con historia propia para grupos y cuadrillas',
      editorialText:
        'El salón interior de Grafit no es un comedor encorsetado. Es un espacio polivalente presidido por la mítica media furgoneta Volkswagen y decorado con guitarras, vinilos y carteles históricos. Mesas corridas que se adaptan a cumpleaños, cenas de cuadrilla o reuniones de empresa.',
      quote: '"Un lugar donde las sobremesas no tienen prisa ni turnos forzados."',
      quoteAuthor: 'Grafit Rock Café — Crónica de Sala',
      tags: ['HASTA 50 PAX', 'BARRA PROPIA', 'SIN ALQUILER DE SALA', 'FLEXIBILIDAD'],
      specs: [
        { label: 'CAPACIDAD', value: '10 a 50 comensales' },
        { label: 'ELEMENTO CENTRAL', value: 'Furgoneta Volkswagen T1' },
        { label: 'SONIDO', value: 'Rock & Acústica cuidada' },
      ],
    },
    rightPage: {
      photo: './assets/grafit/interior/grafit-salon-mesas-27.jpg',
      caption: 'Vista del salón multiusos con mesas largas y murales decorativos.',
      stamp: 'ESPACIO SINGULAR',
      tagline: 'FOTOGRAFÍA REAL // SALÓN DE EVENTOS',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'musica-directo',
    spreadNumber: '05 — 06',
    category: 'CULTURA // MÚSICA EN VIVO',
    themeColor: '#b91c1c',
    leftPage: {
      vol: 'VOL. 01 // MEMORIA MUSICAL',
      headline: 'CONCIERTOS, DIRECTOS & CULTURA ROCK',
      subhead: 'El escenario íntimo de Mikel Bizar, Cuarto Traste y el directo bilbaíno',
      editorialText:
        'Por el escenario de Grafit han pasado voces emblemáticas de la escena vasca y estatal. Conciertos en acústico de Mikel Bizar (Idi Bihotz), la energía vibrante de Cuarto Traste y noches de música sincera a escasos centímetros del público. La música en vivo forma parte de nuestra historia.',
      quote: '"El rock no es decoración: es la banda sonora con la que abrimos cada mañana."',
      quoteAuthor: 'Grafit Rock Café — Archivo de Directos',
      tags: ['ACÚSTICOS', 'BANDAS LOCALES', 'SONIDO DIRECTO', 'BILBAO ROCK'],
      specs: [
        { label: 'HISTÓRICOS', value: 'Mikel Bizar, Cuarto Traste' },
        { label: 'FORMATO', value: 'Acústico & Eléctrico de sala' },
        { label: 'ACCESO', value: 'Entrada libre según aforo' },
      ],
    },
    rightPage: {
      photo: './assets/grafit/events/grafit-concierto-mikel-bizar-10.jpg',
      caption: 'Mikel Bizar en actuación acústica íntima en el escenario de Grafit.',
      stamp: 'DIRECTO HISTÓRICO',
      tagline: 'FOTOGRAFÍA REAL // ARCHIVO DE CONCIERTOS',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'barra-cerveza',
    spreadNumber: '07 — 08',
    category: 'BARRA // CAÑÓN GLACIAR',
    themeColor: '#e2c044',
    leftPage: {
      vol: 'VOL. 04 // EL RITUAL DE LA BARRA',
      headline: 'CERVEZA DE TANQUE A -2°C & PINTXOS',
      subhead: 'El tiro perfecto, la espuma densa y el picoteo sin interrupciones',
      editorialText:
        'Dos imponentes tanques presenciales alimentan los grifos de cerveza sin pasteurizar directamente servida a copa fría. Acompañada de una barra de pintxos clásicos, gildas selectas y raciones recién preparadas. El punto de encuentro cotidiano en Urrutia Kalea 1.',
      quote: '"La caña perfecta no admite atajos: temperatura exacta y servicio honesto."',
      quoteAuthor: 'Grafit Rock Café — Filosofía de Barra',
      tags: ['CERVEZA TANQUE', '-2°C GLACIAR', 'PINTXOS DE BARRA', 'INDAUTXU'],
      specs: [
        { label: 'TEMPERATURA', value: '-2°C servicio continuo' },
        { label: 'SISTEMA', value: 'Tanques presenciales de bodega' },
        { label: 'HORARIO', value: 'Desde la mañana hasta la noche' },
      ],
    },
    rightPage: {
      photo: './assets/grafit/drinks/grafit-cerveza-canero-01.jpg',
      caption: 'Tiro de caña helada con espuma cremosa desde los cañeros de tanque.',
      stamp: 'RITUAL GRAFIT',
      tagline: 'FOTOGRAFÍA REAL // BARRA DE INDAUTXU',
      aspectRatio: 'aspect-[4/5]',
    },
  },
  {
    id: 'sandwich-barra',
    spreadNumber: '09 — 10',
    category: 'COCINA // SÁNDWICHES DE AUTOR',
    themeColor: '#b91c1c',
    leftPage: {
      vol: 'VOL. 05 // ARCHIVO DE BOCADOS',
      headline: 'EL ARTE DEL SÁNDWICH PLANCHA',
      subhead: 'Tostado crujiente al momento y recetas con personalidad',
      editorialText:
        'Sándwiches calientes con panes seleccionados, fundidos intensos y combinaciones sabrosas para reponer fuerzas a cualquier hora del día. Desde el clásico club hasta creaciones con toque rockero para disfrutar de pie en barra o sentado en el salón.',
      quote: '"Rápido no significa industrial: cuidamos cada planchado como el primer día."',
      quoteAuthor: 'Grafit Rock Café — Plancha Non-Stop',
      tags: ['PLANCHA VIVA', 'PAN ARTESANO', 'QUESOS FUNDIDOS', 'NON-STOP'],
      specs: [
        { label: 'ELABORACIÓN', value: 'Al momento bajo pedido' },
        { label: 'SERVICIO', value: 'Para tomar o para llevar' },
        { label: 'ACOMPAÑAMIENTO', value: 'Caña o refresco de autor' },
      ],
    },
    rightPage: {
      photo: './assets/grafit/instagram/sandwich-barra.jpg',
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

  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionStageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);
  const spineCreaseRef = useRef<HTMLDivElement>(null);

  const spread = MAGAZINE_SPREADS[currentSpreadIndex];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // GSAP SCROLL-DRIVEN ACCORDION UNFOLD EFFECT (WEBGL-MAGAZINE ACCORDION OPENING)
  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // DESKTOP: 3D ACCORDION BOOK UNFOLDING FROM SPINE
        gsap.set(leftPageRef.current, {
          transformOrigin: 'right center',
          rotateY: -55,
          z: -80,
          scale: 0.94,
        });

        gsap.set(rightPageRef.current, {
          transformOrigin: 'left center',
          rotateY: 55,
          z: -80,
          scale: 0.94,
        });

        gsap.set(spineCreaseRef.current, {
          opacity: 0.85,
        });

        gsap.set(bookRef.current, {
          scale: 0.90,
          y: 40,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 25%',
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          [leftPageRef.current, rightPageRef.current],
          {
            rotateY: 0,
            z: 0,
            scale: 1,
            ease: 'power2.out',
          },
          0
        )
          .to(
            bookRef.current,
            {
              scale: 1,
              y: 0,
              ease: 'power2.out',
            },
            0
          )
          .to(
            spineCreaseRef.current,
            {
              opacity: 0.35,
              ease: 'power1.out',
            },
            0
          );
      } else {
        // MOBILE: PROGRESSIVE ACCORDION REVEAL WITHOUT CLIPPING
        gsap.set(bookRef.current, {
          scale: 0.92,
          y: 35,
          rotateX: -12,
          transformOrigin: 'center top',
        });

        gsap.to(bookRef.current, {
          scale: 1,
          y: 0,
          rotateX: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // 3D Perspective Tilt on Mouse Movement (Once Unfolded)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || !accordionStageRef.current || window.innerWidth < 768) return;
      const rect = accordionStageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rx = -y * 10;
      const ry = x * 14;

      setMousePos({ x, y, rx, ry });
    },
    [isReducedMotion]
  );

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
      ref={sectionRef}
      className="relative py-16 sm:py-26 border-b-8 border-black overflow-hidden bg-[#0c0b0a] text-[#f5efe1] select-none"
    >
      {/* =================================================================== */}
      {/* 1. AUTHENTIC PUNK WALLPAPER (DARK VERSION WITH AMBIENT DEPTH)       */}
      {/* =================================================================== */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-luminosity bg-cover bg-center"
        style={{
          backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
        }}
      />
      {/* ATMOSPHERIC DARK RADIAL VIGNETTE FOR 3D MAGAZINE STAGE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(24,20,18,0.2) 0%, rgba(12,11,10,0.85) 60%, #0c0b0a 100%)',
        }}
      />

      {/* TOP & BOTTOM SEAMLESS FADES */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0c0a09 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0c0b0a 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ================================================================= */}
        {/* MAGAZINE FOLIO HEADER                                             */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-neutral-700">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-[11px] px-3 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[2px_2px_0_#000]">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>GRAFIT ZINE // ARCHIVO EDITORIAL DESPLEGABLE</span>
              </span>
              <span className="font-mono text-[11px] text-[#e2c044] bg-black px-2.5 py-1 border border-neutral-700">
                PÁGINAS {spread.spreadNumber} DE 10
              </span>
            </div>

            <h2 className="font-anton text-4xl sm:text-6xl text-white uppercase tracking-wider leading-none drop-shadow-md">
              MEMORIA EDITORIAL & VIDA EN GRAFIT
            </h2>
            <p className="font-sans text-neutral-300 text-sm max-w-2xl leading-relaxed drop-shadow-sm">
              Revista interactiva desplegable con efecto acordeón 3D inspirada en la cultura fanzine musical.
              Fotografías reales capturadas en el local de Urrutia 1, Indautxu.
            </p>
          </div>

          {/* SPREAD NAVIGATION CONTROLS */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={prevSpread}
              className="p-3 bg-black hover:bg-[#b91c1c] text-white border-2 border-neutral-700 hover:border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-200 font-bold">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {MAGAZINE_SPREADS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSpreadIndex(idx)}
              className={`shrink-0 px-3 py-1.5 font-mono text-xs border transition-all cursor-pointer ${
                idx === currentSpreadIndex
                  ? 'bg-[#b91c1c] text-white border-black font-bold shadow-[3px_3px_0_#000]'
                  : 'bg-black/75 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-600'
              }`}
            >
              <span className="text-amber-300 mr-1.5 font-bold">[{s.spreadNumber}]</span>
              <span>{s.category.split('//')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* 3D ACCORDION MAGAZINE STAGE (GSAP UNFOLD & PERSPECTIVE SPREAD)    */}
        {/* ================================================================= */}
        <div
          ref={accordionStageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-6xl mx-auto py-4 [perspective:1800px]"
        >
          {/* ACCORDION 3D SPREAD CONTAINER */}
          <div
            ref={bookRef}
            className="relative w-full bg-[#f6f2e8] text-black border-4 border-black shadow-[20px_25px_50px_rgba(0,0,0,0.95)] will-change-transform"
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
                  background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0) 65%)`,
                }}
              />
            )}

            {/* MAGAZINE SPINE CREASE (CENTER ACCORDION FOLD) */}
            <div
              ref={spineCreaseRef}
              className="absolute top-0 bottom-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-black/35 via-black/50 to-black/35 pointer-events-none z-30 hidden md:block"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-neutral-900">
              
              {/* =========================================================== */}
              {/* LEFT PAGE: ACCORDION PANEL 1 (TYPOGRAPHIC EDITORIAL SPREAD) */}
              {/* =========================================================== */}
              <div
                ref={leftPageRef}
                className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative bg-[#f7f3ea] will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="masking-tape tape-corner-tl" />

                {/* PAGE FOLIO HEADER */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <span className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-widest">
                    {spread.leftPage.vol}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#b91c1c] bg-white px-2 py-0.5 border border-black">
                    PAG. {spread.spreadNumber.split('—')[0].trim()}
                  </span>
                </div>

                {/* MAIN HEADLINE */}
                <div className="space-y-3">
                  <span
                    className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase text-white shadow-xs"
                    style={{ backgroundColor: spread.themeColor }}
                  >
                    {spread.category}
                  </span>
                  <h3 className="font-anton text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide leading-[0.95] text-black">
                    {spread.leftPage.headline}
                  </h3>
                  <p className="font-mono text-xs text-neutral-800 font-bold uppercase">
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
                  <footer className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                    — {spread.leftPage.quoteAuthor}
                  </footer>
                </blockquote>

                {/* SPECS AND TAGS */}
                <div className="space-y-3 pt-3 border-t-2 border-black">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {spread.leftPage.specs.map((spec, i) => (
                      <div key={i} className="font-mono text-[10px]">
                        <span className="text-neutral-500 block">{spec.label}</span>
                        <span className="font-bold text-black">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {spread.leftPage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-black text-[#f5efe1] font-mono text-[9px] px-2 py-0.5 border border-black uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* =========================================================== */}
              {/* RIGHT PAGE: ACCORDION PANEL 2 (PHOTOGRAPHIC ESSAY)          */}
              {/* =========================================================== */}
              <div
                ref={rightPageRef}
                className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative bg-[#fdfbf7] will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="masking-tape tape-corner-tr" />

                {/* PAGE FOLIO HEADER */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <span className="font-mono text-[11px] font-bold text-neutral-700 uppercase tracking-widest">
                    {spread.rightPage.tagline}
                  </span>
                  <span className="font-mono text-xs font-bold text-black bg-[#e2c044] px-2 py-0.5 border border-black">
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
                    <div className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-black uppercase shadow">
                      {spread.rightPage.stamp}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold uppercase">
                      <Maximize2 className="w-5 h-5 text-[#e2c044]" />
                      <span>AMPLIAR DETALLE</span>
                    </div>
                  </div>

                  <p className="font-mono text-xs text-neutral-800 mt-2 italic leading-relaxed text-center">
                    "{spread.rightPage.caption}"
                  </p>
                </div>

                {/* BOTTOM METADATA BAR */}
                <div className="pt-3 border-t-2 border-black flex items-center justify-between font-mono text-[10px] text-neutral-600">
                  <span>DOCUMENTO REAL // INDAUTXU BILBAO</span>
                  <button
                    onClick={() => setIsInspecting(true)}
                    className="inline-flex items-center gap-1 text-[#b91c1c] hover:text-black font-bold uppercase cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>MODO INSPECCIÓN</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* HIGH-RES IMAGE INSPECTOR MODAL                                      */}
      {/* =================================================================== */}
      {isInspecting && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsInspecting(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181615] border-4 border-black p-4 sm:p-6 shadow-[16px_16px_0_#b91c1c] text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="font-mono text-xs font-bold text-[#e2c044] uppercase">
                INSPECTOR DE ARCHIVO REAL // {spread.rightPage.stamp}
              </span>
              <button
                onClick={() => setIsInspecting(false)}
                className="p-1 bg-black hover:bg-[#b91c1c] text-white border border-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black border-2 border-neutral-800 overflow-hidden">
              <img
                src={spread.rightPage.photo}
                alt={spread.rightPage.caption}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-mono text-xs text-neutral-300 text-center">
              {spread.rightPage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
