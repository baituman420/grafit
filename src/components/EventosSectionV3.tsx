import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventosSectionV3Props {
  onNavigate: (path: string) => void;
}

interface FormatoEvento {
  id: string;
  tipoParam: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  photo: string;
  photoCaption: string;
  capacity: string;
  highlights: string[];
}

const FORMATOS: FormatoEvento[] = [
  {
    id: 'cuadrillas',
    tipoParam: 'comida-cuadrilla',
    badge: 'CUADRILLAS & AMIGOS',
    badgeColor: '#b91c1c',
    title: 'Comidas y Cenas de Cuadrilla',
    subtitle: 'Mesas largas, cocina continua y ambiente distendido',
    description:
      'El salón multiusos permite reunir a cuadrillas y grupos grandes en mesas corridas sin las limitaciones de un comedor tradicional. Disfruta de nuestras hamburguesas 100% buey, sándwiches calientes, raciones y cañón de cerveza helada a -2°C con total comodidad y sin turnos forzados.',
    photo: './assets/grafit/interior/grafit-salon-mesas-11.jpg',
    photoCaption: 'Mesas preparadas frente al mural de concierto en el salón',
    capacity: '10 - 45 PERSONAS',
    highlights: [
      'Mesas modulares para cuadrillas de cualquier tamaño',
      'Servicio continuo de cocina y barra propia',
      'Sin prisas de rotación de turno',
      'Ambiente rockero y acústica cuidada',
    ],
  },
  {
    id: 'cumpleanos',
    tipoParam: 'cumpleanos',
    badge: 'CELEBRACIONES PRIVADAS',
    badgeColor: '#e2c044',
    title: 'Cumpleaños y Aniversarios',
    subtitle: 'Tu fiesta con personalidad rock en el corazón de Indautxu',
    description:
      'Celebra tu fecha especial en un espacio singular presidido por la media Volkswagen y paredes llenas de cultura musical. Un entorno acogedor y desenfadado donde compartir picoteo variado, copas bien servidas y buena música en pleno centro de Bilbao.',
    photo: './assets/grafit/interior/grafit-salon-mesas-27.jpg',
    photoCaption: 'Distribución espaciosa y ambiente cálido para celebraciones',
    capacity: '15 - 50 PERSONAS',
    highlights: [
      'Espacio diáfano y versátil con identidad propia',
      'Picoteo variado de barra y carta adaptada',
      'Ubicación inmejorable a 3 minutos del metro Indautxu',
      'Posibilidad de reproducir tu selección musical',
    ],
  },
  {
    id: 'empresas',
    tipoParam: 'empresa',
    badge: 'AFTERWORK & EQUIPO',
    badgeColor: '#0a0a0a',
    title: 'Encuentros de Empresa y Afterworks',
    subtitle: 'Reuniones informales de equipo y despedidas de año',
    description:
      'Huye de los comedores protocolarios y rígidos. Grafit ofrece un marco dinámico para comidas de departamento, reuniones informales de networking y celebraciones de fin de año con ambiente auténtico y atención directa.',
    photo: './assets/grafit/interior/grafit-salon-mesas-03.jpg',
    photoCaption: 'Área versátil preparada para presentaciones y distensión',
    capacity: '12 - 40 PERSONAS',
    highlights: [
      'Entorno distendido para conectar fuera de la oficina',
      'Formatos cóctel o banquete según necesidades',
      'Atención directa y flexible en la organización',
      'Facturación unificada para empresas',
    ],
  },
  {
    id: 'personalizados',
    tipoParam: 'evento-medida',
    badge: 'A MEDIDA',
    badgeColor: '#b91c1c',
    title: 'Celebraciones Personalizadas',
    subtitle: 'Cuéntanos tu idea y adaptamos el salón',
    description:
      'Desde despedidas hasta reuniones de asociaciones o encuentros generacionales. Explícanos lo que buscas y te orientamos sobre disponibilidad y opciones del espacio sin compromisos.',
    photo: './assets/grafit/interior/grafit-salon-mesas-31.jpg',
    photoCaption: 'Configuración modulable para proyectos y reuniones',
    capacity: 'ADAPTABLE',
    highlights: [
      'Distribución adaptable según el tipo de encuentro',
      'Flexibilidad horaria previa consulta',
      'Sin condiciones rígidas ni costes ocultos',
      'Respuesta en menos de 24 horas',
    ],
  },
];

export const EventosSectionV3: React.FC<EventosSectionV3Props> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>('cuadrillas');
  const activeFormat = FORMATOS.find((f) => f.id === selectedId) || FORMATOS[0];

  const sectionRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const concepts = [
    { word: 'GRUPOS', subtitle: 'Cuadrillas & Celebraciones', color: '#0a0a0a', accent: '#b91c1c' },
    { word: 'EVENTOS', subtitle: 'Empresa & Cumpleaños', color: '#b91c1c', accent: '#0a0a0a' },
    { word: 'SALÓN MULTIUSOS', subtitle: 'Versatilidad & Confort Acústico', color: '#0a0a0a', accent: '#b91c1c' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Sliced Text Entrance Timeline
      const slices = transitionRef.current?.querySelectorAll('.slice-layer');
      if (slices && slices.length > 0) {
        slices.forEach((slice) => {
          const sliceIndex = parseInt(slice.getAttribute('data-slice') || '0', 10);
          const direction = sliceIndex === 0 ? -1 : sliceIndex === 1 ? 1 : -0.6;
          const offset = direction * (window.innerWidth < 768 ? 35 : 65);

          gsap.set(slice, {
            x: offset,
            opacity: 0.15,
            skewX: direction * 4,
          });
        });

        // Trigger on entering the section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: transitionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.6,
          },
        });

        tl.to(slices, {
          x: 0,
          opacity: 1,
          skewX: 0,
          stagger: 0.04,
          ease: 'power2.out',
        });
      }

      // 2. Commercial content reveals smoothly in sync
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0.4, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="eventos"
      ref={sectionRef}
      className="relative z-30 bg-[#faf7f2] text-[#121110] py-14 sm:py-20 border-b-8 border-black overflow-hidden select-none"
    >
      {/* CLEAN ARCHITECTURAL GRID BACKGROUND (DESCANSO VISUAL) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* ================================================================= */}
        {/* 1. SLICED TEXT BLOCK ENTRY TRANSITION (DESCUBRE EL SALÓN)         */}
        {/* ================================================================= */}
        <div
          id="sliced-text-transition"
          ref={transitionRef}
          className="max-w-5xl mx-auto text-center flex flex-col items-center mb-10 sm:mb-14"
        >
          {/* VISUAL THRESHOLD BADGE */}
          <div className="inline-flex items-center gap-2 bg-[#b91c1c] text-white font-mono-code text-[10px] sm:text-xs px-3 py-1 border border-black uppercase font-bold rot-neg-1 shadow-[3px_3px_0_#000] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>TRANSICIÓN A EVENTOS • ESPACIO INDEPENDIENTE</span>
          </div>

          {/* SLICED TEXT RIG (GRUPOS • EVENTOS • SALÓN MULTIUSOS) */}
          <div className="w-full flex flex-col items-center justify-center space-y-3 sm:space-y-4 my-2">
            {concepts.map((concept) => (
              <div key={concept.word} className="relative w-full flex flex-col items-center justify-center">
                <div
                  className="relative select-none leading-none tracking-wider text-center"
                  style={{ minHeight: '1.1em' }}
                >
                  {/* SLICE 0: TOP THIRD */}
                  <div
                    data-slice="0"
                    className="slice-layer font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase transition-transform will-change-transform"
                    style={{
                      color: concept.color,
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 0% 34%)',
                    }}
                  >
                    {concept.word}
                  </div>

                  {/* SLICE 1: MIDDLE THIRD */}
                  <div
                    data-slice="1"
                    className="slice-layer absolute inset-0 font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase transition-transform will-change-transform"
                    style={{
                      color: concept.color,
                      clipPath: 'polygon(0% 33%, 100% 33%, 100% 67%, 0% 67%)',
                    }}
                  >
                    {concept.word}
                  </div>

                  {/* SLICE 2: BOTTOM THIRD */}
                  <div
                    data-slice="2"
                    className="slice-layer absolute inset-0 font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase transition-transform will-change-transform"
                    style={{
                      color: concept.color,
                      clipPath: 'polygon(0% 66%, 100% 66%, 100% 100%, 0% 100%)',
                    }}
                  >
                    {concept.word}
                  </div>
                </div>

                <span className="font-mono-code text-[11px] sm:text-xs text-neutral-600 uppercase tracking-widest mt-1 font-semibold">
                  // {concept.subtitle}
                </span>
              </div>
            ))}
          </div>

          {/* DESCANSO VISUAL STATEMENT */}
          <div className="mt-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0_#000] max-w-2xl">
            <p className="font-sans text-xs sm:text-sm text-neutral-800 font-medium">
              ★ <strong>EL ESPACIO QUE SE ADAPTA A TU CELEBRACIÓN EN INDAUTXU</strong> — Un entorno con intimidad acústica, cocina ininterrumpida y barra propia para que disfrutes de tu grupo sin rotaciones obligatorias.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. COMMERCIAL EVENT FORMATS & LIVE CAPACITY SHOWCASE              */}
        {/* ================================================================= */}
        <div id="experiencias" ref={contentRef} className="max-w-6xl mx-auto space-y-8">
          
          {/* FORMAT TABS SELECTOR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {FORMATOS.map((f) => {
              const isActive = f.id === selectedId;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedId(f.id)}
                  className={`p-3 sm:p-4 text-left border-3 border-black transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-black text-white shadow-[5px_5px_0_#b91c1c] -translate-y-1'
                      : 'bg-white text-black hover:bg-neutral-100 shadow-[3px_3px_0_#000]'
                  }`}
                >
                  <span
                    className="inline-block text-[9px] sm:text-[10px] font-mono-code font-bold px-1.5 py-0.5 border border-black mb-1.5 uppercase"
                    style={{
                      backgroundColor: isActive ? '#b91c1c' : f.badgeColor,
                      color: '#ffffff',
                    }}
                  >
                    {f.badge}
                  </span>
                  <h3 className="font-anton text-base sm:text-lg uppercase leading-tight">
                    {f.title}
                  </h3>
                  <span className="font-mono-code text-[10px] block mt-1 text-neutral-400">
                    {f.capacity}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE FORMAT COMMERCIAL CARD */}
          <div className="p-6 sm:p-8 md:p-10 bg-white border-4 border-black shadow-[10px_10px_0px_#000] relative">
            <div className="masking-tape tape-corner-tl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* LEFT: REAL PHOTOGRAPHY OF THE SALÓN */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative aspect-[4/3] bg-black border-3 border-black overflow-hidden shadow-[5px_5px_0_#000]">
                  <img
                    src={activeFormat.photo}
                    alt={activeFormat.photoCaption}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono-code text-[10px] font-bold px-2 py-0.5 border border-black uppercase shadow">
                    FOTO REAL DEL SALÓN
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/90 text-[#e2c044] font-mono-code text-[10px] px-2 py-0.5 border border-[#e2c044] uppercase">
                    CAPACIDAD: {activeFormat.capacity}
                  </div>
                </div>
                <p className="font-mono-code text-[11px] text-neutral-600 text-center italic">
                  {activeFormat.photoCaption}
                </p>
              </div>

              {/* RIGHT: COMMERCIAL DETAILS, OPERATIONAL ADVANTAGES & CTA */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs font-bold px-2.5 py-0.5 border border-black uppercase rot-neg-1 mb-2">
                    {activeFormat.badge}
                  </div>
                  <h4 className="font-anton text-3xl sm:text-4xl text-black uppercase tracking-wide leading-tight">
                    {activeFormat.title}
                  </h4>
                  <p className="font-mono-code text-xs text-neutral-700 font-bold uppercase mt-1">
                    {activeFormat.subtitle}
                  </p>
                </div>

                <p className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed">
                  {activeFormat.description}
                </p>

                {/* HIGHLIGHT PILLARS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t-2 border-neutral-200">
                  {activeFormat.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b91c1c] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-neutral-800 font-medium leading-tight">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* DIRECT ACTION BUTTONS */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onNavigate(`/contacto?tipo=${activeFormat.tipoParam}`)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#b91c1c] hover:bg-black text-white font-anton text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>★ CONSULTAR DISPONIBILIDAD ★</span>
                  </button>

                  <button
                    onClick={() => onNavigate('/espacio')}
                    className="w-full sm:w-auto px-5 py-3.5 bg-[#f4eedd] hover:bg-white text-black font-anton text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <span>CONOCER EL SALÓN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
