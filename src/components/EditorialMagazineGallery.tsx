import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Eye, Maximize2, X, Sparkles, Layers, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EditorialCard {
  id: string;
  cardNum: string;
  category: string;
  themeColor: string;
  badge: string;
  headline: string;
  subhead: string;
  story: string;
  photo: string;
  caption: string;
  realDocLabel: string;
  tags: string[];
  specs: { label: string; value: string }[];
  isArchiveDoc?: boolean;
}

const EDITORIAL_CARDS: EditorialCard[] = [
  {
    id: 'burger-rock',
    cardNum: '01 / 05',
    category: 'GASTRONOMÍA // ROCK FOOD',
    themeColor: '#b91c1c',
    badge: 'PLATO INSIGNIA',
    headline: 'BURGER 100% BUEY & SABOR ROCK',
    subhead: 'Carne seleccionada, pan artesano tostado y receta propia en Indautxu',
    story:
      'Elaboradas con carne 100% buey seleccionada, queso fundido, bacon crujiente y pan brioche artesano tostado al momento. Una propuesta contundente y sincera pensada tanto para picoteo rápido en barra como para comidas largas de cuadrilla.',
    photo: './assets/grafit/instagram/burguer.webp',
    caption: 'Hamburguesa 100% buey servida en la barra de Grafit Café.',
    realDocLabel: 'FOTOGRAFÍA REAL // BARRA DE GRAFIT',
    tags: ['100% BUEY', 'PAN ARTESANO', 'SABOR ROTUNDO', 'INDAUTXU'],
    specs: [
      { label: 'PRODUCTO', value: 'Carne 100% buey' },
      { label: 'SERVICIO', value: 'Barra y Salón' },
      { label: 'ELABORACIÓN', value: 'Al momento' },
    ],
  },
  {
    id: 'barra-pintxos',
    cardNum: '02 / 05',
    category: 'RITUAL // LA BARRA VIVA',
    themeColor: '#e2c044',
    badge: 'PULSO DE BARRIO',
    headline: 'PINTXOS, TORTILLAS & CAÑAS AL DÍA',
    subhead: 'El latido cotidiano de Urrutia 1 desde primera hora',
    story:
      'Mostrador con tortillas jugosas recién preparadas, gildas clásicas y variedad de raciones para acompañar el poteo diario. El punto de reunión de Indautxu donde se cruzan el café matinal y el ambiente previo al partido en San Mamés.',
    photo: './assets/grafit/instagram/619354530_18068635448548618_8267537641264067155_n.webp',
    caption: 'Mostrador de pintxos y tortillas al día en la barra de Urrutia 1.',
    realDocLabel: 'FOTOGRAFÍA REAL // MOSTRADOR DE PINTXOS',
    tags: ['TORTILLAS JUGOSAS', 'GILDAS', 'CAÑAS BIEN TIRADAS', 'PREVIAS'],
    specs: [
      { label: 'BARRA', value: 'Pintxos al día' },
      { label: 'ACCESO', value: 'Libre sin reserva' },
      { label: 'UBICACIÓN', value: 'Urrutia Kalea 1' },
    ],
  },
  {
    id: 'volkswagen-salon',
    cardNum: '03 / 05',
    category: 'EL ESPACIO // SALÓN MULTIUSOS',
    themeColor: '#b91c1c',
    badge: 'PIEZA EMBLEMÁTICA',
    headline: 'EL MÍTICO FRONTAL VOLKSWAGEN EN EL SALÓN',
    subhead: 'Icono de libertad y punto focal del espacio multiusos',
    story:
      'El frontal real de la furgoneta Volkswagen T1 integrado en la pared de ladrillo visto del salón interior. Un elemento arquitectónico singular que preside las reuniones de grupo y refuerza la identidad underground de Grafit.',
    photo: './assets/grafit/instagram/599139401_17934885522129317_243501184606504542_n.jpg',
    caption: 'Vista del frontal Volkswagen y murales artísticos en el salón interior.',
    realDocLabel: 'FOTOGRAFÍA REAL // SALÓN DE GRAFIT',
    tags: ['VOLKSWAGEN T1', 'LADRILLO VISTO', 'ESPACIO SINGULAR', 'GRUPOS'],
    specs: [
      { label: 'SALÓN', value: 'Hasta 50 personas' },
      { label: 'ELEMENTO', value: 'Frontal VW T1 real' },
      { label: 'AMBIENTE', value: 'Polivalente y diáfano' },
    ],
  },
  {
    id: 'catering-eventos',
    cardNum: '04 / 05',
    category: 'GRUPOS // CELEBRACIONES PRIVADAS',
    themeColor: '#e2c044',
    badge: 'EVENTOS A MEDIDA',
    headline: 'CATERING ARTESANO & BANDEJAS PARA GRUPOS',
    subhead: 'Celebraciones privadas y encuentros sin turnos forzados',
    story:
      'Bandejas preparadas con bocaditos artesanales, raciones de picoteo y servicio personalizado para celebraciones de cuadrilla, cumpleaños, aniversarios o reuniones de empresa en el salón interior de Grafit.',
    photo: './assets/grafit/instagram/pintxos_eventos.webp',
    caption: 'Bandejas de catering y raciones dispuestas para eventos de grupo.',
    realDocLabel: 'FOTOGRAFÍA REAL // CATERING PARA GRUPOS',
    tags: ['BANDEJAS GRUPOS', 'CELEBRACIONES', 'SIN ALQUILER DE SALA', 'A MEDIDA'],
    specs: [
      { label: 'CAPACIDAD', value: '10 a 50 comensales' },
      { label: 'FORMATO', value: 'Picoteo o menú sentado' },
      { label: 'RESERVA', value: 'Personalizada' },
    ],
  },
  {
    id: 'concierto-historico',
    cardNum: '05 / 05',
    category: 'CULTURA // ARCHIVO DOCUMENTAL',
    themeColor: '#b91c1c',
    badge: 'ARCHIVO DOCUMENTAL • HISTÓRICO 2018',
    headline: 'DIRECTOS ÍNTIMOS: LA MEMORIA DEL ESCENARIO',
    subhead: 'Registro histórico de actuaciones acústicas que marcaron época',
    story:
      'Por el escenario de Grafit han pasado voces emblemáticas como Mikel Bizar en recitales acústicos íntimos a escasos centímetros del público. Este registro forma parte de nuestro archivo documental histórico, testigo del compromiso de Grafit con la música.',
    photo: './assets/grafit/events/grafit-concierto-mikel-bizar-10.jpg',
    caption: 'Mikel Bizar en actuación acústica íntima en Grafit Café (Archivo histórico 2018).',
    realDocLabel: 'ARCHIVO DOCUMENTAL // CONCIERTO HISTÓRICO 2018',
    tags: ['ARCHIVO 2018', 'MIKEL BIZAR', 'MEMORIA MUSICAL', 'DIRECTO CERCANO'],
    specs: [
      { label: 'REGISTRO', value: 'Concierto histórico 2018' },
      { label: 'ARTISTA', value: 'Mikel Bizar (Acústico)' },
      { label: 'CARÁCTER', value: 'Archivo documental' },
    ],
    isArchiveDoc: true,
  },
];

export const EditorialMagazineGallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInspecting, setIsInspecting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const deckContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const currentCard = EDITORIAL_CARDS[activeIndex];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // GSAP INTRO FAN-OUT ANIMATION
  useEffect(() => {
    if (!sectionRef.current || !deckContainerRef.current || isReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = deckContainerRef.current?.querySelectorAll('.editorial-deck-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            scale: 0.9,
            y: 40,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  // KEYBOARD NAVIGATION
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + EDITORIAL_CARDS.length) % EDITORIAL_CARDS.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % EDITORIAL_CARDS.length);
      } else if (e.key === 'Escape' && isInspecting) {
        setIsInspecting(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInspecting]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EDITORIAL_CARDS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + EDITORIAL_CARDS.length) % EDITORIAL_CARDS.length);
  };

  // TOUCH SWIPE HANDLERS FOR MOBILE
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="magazine-gallery-section"
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-24 border-b-8 border-black overflow-hidden bg-[#0c0b0a] text-[#f5efe1] select-none"
    >
      {/* PUNK WALLPAPER SUBSTRATE */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)' }}
      />
      {/* RADIAL VIGNETTE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(26,22,20,0.2) 0%, rgba(12,11,10,0.9) 65%, #0c0b0a 100%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-[#2b2724]">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-[11px] px-3 py-1 border border-black uppercase font-bold shadow-[2px_2px_0_#000]">
                <Layers className="w-3.5 h-3.5 text-[#e2c044]" />
                <span>GRAFIT ZINE // DESPLIEGUE EN ABANICO</span>
              </span>
              <span className="font-mono text-[11px] text-[#e2c044] bg-black px-2.5 py-1 border border-[#33302c]">
                CARTA {currentCard.cardNum}
              </span>
            </div>

            <h2 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-wider leading-none drop-shadow-md">
              MEMORIA EDITORIAL & VIDA EN GRAFIT
            </h2>
            <p className="font-['Space_Grotesk'] text-[#b8b0a2] text-sm sm:text-base max-w-2xl leading-relaxed drop-shadow-sm">
              Instantáneas reales capturadas en el local de Urrutia 1, Indautxu. Explora el abanico interactivo tocando o deslizando las cartas.
            </p>
          </div>

          {/* ARROW CONTROLS */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrev}
              className="p-3 bg-black hover:bg-[#b91c1c] text-white border-2 border-[#33302c] hover:border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer"
              aria-label="Carta anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs px-3.5 py-2.5 bg-[#181615] border border-[#33302c] text-[#f5efe1] font-bold">
              {activeIndex + 1} / {EDITORIAL_CARDS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-black hover:bg-[#b91c1c] text-white border-2 border-[#33302c] hover:border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer"
              aria-label="Carta siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PILL SELECTOR FOR DIRECT NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {EDITORIAL_CARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setActiveIndex(idx)}
              className={`shrink-0 px-3.5 py-2 font-mono text-xs border transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'bg-[#b91c1c] text-white border-black font-bold shadow-[3px_3px_0_#000]'
                  : 'bg-black/80 text-[#9c9488] border-[#2b2724] hover:text-white hover:border-neutral-500'
              }`}
            >
              <span className="text-[#e2c044] mr-1.5 font-bold">[{card.cardNum.split('/')[0].trim()}]</span>
              <span>{card.category.split('//')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* ================================================================= */}
        {/* FAN-OUT CARD DECK STAGE                                           */}
        {/* ================================================================= */}
        <div
          ref={deckContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-5xl mx-auto py-4"
        >
          {/* DESKTOP FAN-OUT STACK VISUAL PREVIEW BAR (5 PEEKING TABS) */}
          <div className="hidden lg:grid grid-cols-5 gap-3 mb-6">
            {EDITORIAL_CARDS.map((card, idx) => {
              const isActive = idx === activeIndex;
              const rotationDeg = (idx - 2) * 3;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    transform: isReducedMotion ? 'none' : `rotate(${rotationDeg}deg)`,
                  }}
                  className={`relative cursor-pointer transition-all duration-300 rounded overflow-hidden border-2 p-2 ${
                    isActive
                      ? 'bg-[#181615] border-[#e2c044] shadow-[6px_6px_0_#b91c1c] scale-105 z-20'
                      : 'bg-black/70 border-[#2b2724] hover:border-neutral-400 opacity-60 hover:opacity-100 z-10'
                  }`}
                >
                  <div className="relative aspect-[4/3] bg-black overflow-hidden mb-2">
                    <img
                      src={card.photo}
                      alt={card.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/90 text-white font-mono text-[9px] px-1.5 py-0.5 border border-neutral-700">
                      {card.cardNum}
                    </div>
                  </div>
                  <p className="font-['Anton'] text-xs uppercase tracking-wide truncate text-[#f5efe1]">
                    {card.headline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* MAIN PROTAGONIST CARD (EXPANDED EDITORIAL PRESENTATION) */}
          <div className="editorial-deck-card relative bg-[#181615] border-4 border-black shadow-[12px_12px_0_#000] overflow-hidden transition-all duration-500">
            {/* TOP ACCENT STRIP */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: currentCard.themeColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* LEFT/TOP: LARGE PHOTOGRAPHIC CANVAS (7 COLS ON DESKTOP) */}
              <div className="lg:col-span-7 relative bg-black min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-black group">
                <img
                  src={currentCard.photo}
                  alt={currentCard.caption}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* GRADIENTS FOR TEXT READABILITY OVER REAL PHOTO */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                {/* TOP BADGES */}
                <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between gap-3">
                  <span
                    className="inline-block font-mono text-xs font-bold text-white px-3 py-1 border border-black shadow-[3px_3px_0_#000] uppercase"
                    style={{ backgroundColor: currentCard.themeColor }}
                  >
                    {currentCard.badge}
                  </span>

                  <button
                    onClick={() => setIsInspecting(true)}
                    className="inline-flex items-center gap-1.5 bg-black/90 hover:bg-[#b91c1c] text-[#f5efe1] font-mono text-xs font-bold px-3 py-1.5 border border-white/30 hover:border-black shadow transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#e2c044]" />
                    <span>AMPLIAR FOTO</span>
                  </button>
                </div>

                {/* BOTTOM CAPTION OVER PHOTO */}
                <div className="relative z-10 p-4 sm:p-6 text-white space-y-1">
                  <span className="font-mono text-[10px] sm:text-xs text-[#e2c044] font-bold tracking-widest uppercase block drop-shadow">
                    ★ {currentCard.realDocLabel}
                  </span>
                  <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-neutral-200 italic drop-shadow-md">
                    "{currentCard.caption}"
                  </p>
                </div>
              </div>

              {/* RIGHT/BOTTOM: TYPOGRAPHIC EDITORIAL ESSAY (5 COLS ON DESKTOP) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#181615] text-[#f5efe1]">
                
                <div className="space-y-4">
                  {/* CATEGORY & INDEX */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#2b2724]">
                    <span className="font-mono text-xs font-bold text-[#e2c044] uppercase tracking-wider">
                      {currentCard.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-white bg-black px-2 py-0.5 border border-[#33302c]">
                      {currentCard.cardNum}
                    </span>
                  </div>

                  {/* HEADLINE */}
                  <h3 className="font-['Anton'] text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide text-[#f5efe1] leading-tight">
                    {currentCard.headline}
                  </h3>

                  <p className="font-mono text-xs text-[#e2c044] uppercase font-bold">
                    {currentCard.subhead}
                  </p>

                  {/* EDITORIAL STORY */}
                  <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] leading-relaxed">
                    {currentCard.story}
                  </p>

                  {/* ARCHIVE NOTICE IF DOCUMENTARY CONCERT */}
                  {currentCard.isArchiveDoc && (
                    <div className="p-3 bg-black/80 border-l-4 border-[#b91c1c] text-[#e2c044] font-mono text-xs space-y-1">
                      <p className="font-bold uppercase tracking-wider">
                        ★ ARCHIVO DOCUMENTAL • REGISTRO HISTÓRICO
                      </p>
                      <p className="text-neutral-300 text-[11px] leading-tight">
                        Este registro pertenece al histórico de eventos musicales de Grafit (2018). No constituye programación vigente ni música en vivo activa.
                      </p>
                    </div>
                  )}
                </div>

                {/* SPECS & TAGS */}
                <div className="space-y-4 pt-4 border-t border-[#262320]">
                  <div className="grid grid-cols-3 gap-2 text-left">
                    {currentCard.specs.map((spec, i) => (
                      <div key={i} className="font-mono text-[11px]">
                        <span className="text-[#9c9488] block text-[10px]">{spec.label}</span>
                        <span className="font-bold text-[#f5efe1]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentCard.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-black text-[#e2c044] font-mono text-[10px] px-2.5 py-1 border border-[#33302c] uppercase font-bold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* QUICK PREV / NEXT IN CARD */}
                <div className="pt-2 flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={handlePrev}
                    className="text-[#9c9488] hover:text-[#e2c044] flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>ANTERIOR</span>
                  </button>
                  <span className="text-[#9c9488]">
                    DESLIZA O TOCA PARA NAVEGAR
                  </span>
                  <button
                    onClick={handleNext}
                    className="text-[#e2c044] hover:text-white flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>SIGUIENTE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* FULL RESOLUTION INSPECTOR MODAL */}
      {isInspecting && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsInspecting(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181615] border-4 border-black p-4 sm:p-6 shadow-[16px_16px_0_#b91c1c] text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2724]">
              <span className="font-mono text-xs font-bold text-[#e2c044] uppercase">
                INSPECTOR DE ARCHIVO REAL // {currentCard.badge}
              </span>
              <button
                onClick={() => setIsInspecting(false)}
                className="p-1 bg-black hover:bg-[#b91c1c] text-white border border-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black border-2 border-[#2b2724] overflow-hidden">
              <img
                src={currentCard.photo}
                alt={currentCard.caption}
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-mono text-xs text-[#b8b0a2] text-center">
              {currentCard.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
