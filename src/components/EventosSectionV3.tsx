import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Calendar, ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, MapPin } from 'lucide-react';

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
      'Sin prisas ni rotaciones forzadas de turno',
      'Ambiente rockero y acústica cuidada para conversar',
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
      'Posibilidad de ambientación y música a vuestra medida',
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
  const slicesBgRef = useRef<HTMLDivElement>(null);
  const band0Ref = useRef<HTMLDivElement>(null);
  const band1Ref = useRef<HTMLDivElement>(null);
  const band2Ref = useRef<HTMLDivElement>(null);
  const band3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const xFactor = isMobile ? 24 : 55;
      const skewFactor = isMobile ? 1.2 : 2.5;

      // INITIAL SLICED POSITIONS (STAGGERED OPPOSING SHIFTS)
      gsap.set(band0Ref.current, {
        x: -xFactor * 1.1,
        skewX: -skewFactor,
        opacity: 0.25,
      });

      gsap.set(band1Ref.current, {
        x: xFactor * 1.15,
        skewX: skewFactor,
        opacity: 0.25,
      });

      gsap.set(band2Ref.current, {
        x: -xFactor * 0.9,
        skewX: -skewFactor * 0.8,
        opacity: 0.3,
      });

      gsap.set(band3Ref.current, {
        x: xFactor * 0.9,
        y: 20,
        opacity: 0.3,
      });

      // BACKDROP SLICES INITIAL DRIFT
      const bgSlices = slicesBgRef.current?.querySelectorAll('.bg-slice-layer');
      if (bgSlices && bgSlices.length > 0) {
        bgSlices.forEach((slice, idx) => {
          const dir = idx % 2 === 0 ? -1 : 1;
          gsap.set(slice, {
            x: dir * (isMobile ? 18 : 36),
            scale: 1.04,
          });
        });
      }

      // WHOLE-BLOCK SLICED ASSEMBLY TIMELINE (REVERSIBLE ON SCROLL)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // CONVERGE BACKGROUND SLICES
      if (bgSlices && bgSlices.length > 0) {
        tl.to(
          bgSlices,
          {
            x: 0,
            scale: 1,
            ease: 'power1.out',
            stagger: 0.05,
          },
          0
        );
      }

      // CONVERGE CONTENT BANDS
      tl.to(
        [band0Ref.current, band1Ref.current, band2Ref.current, band3Ref.current],
        {
          x: 0,
          y: 0,
          skewX: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.08,
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="eventos"
      ref={sectionRef}
      className="relative z-30 py-16 sm:py-24 border-b-8 border-black overflow-hidden select-none text-[#f5efe1]"
      style={{ backgroundColor: '#141210' }}
    >
      {/* =================================================================== */}
      {/* 1. SLICED PUNK WALLPAPER BACKDROP (COLOR VERSION WITH VEIL)        */}
      {/* =================================================================== */}
      <div ref={slicesBgRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* SLICE TOP: 0% - 35% */}
        <div
          className="bg-slice-layer absolute inset-0 w-full h-full will-change-transform"
          style={{
            backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 10%',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 36%, 0% 36%)',
            opacity: 0.82,
          }}
        />

        {/* SLICE MID: 34% - 70% */}
        <div
          className="bg-slice-layer absolute inset-0 w-full h-full will-change-transform"
          style={{
            backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            clipPath: 'polygon(0% 34%, 100% 34%, 100% 71%, 0% 71%)',
            opacity: 0.82,
          }}
        />

        {/* SLICE BOTTOM: 69% - 100% */}
        <div
          className="bg-slice-layer absolute inset-0 w-full h-full will-change-transform"
          style={{
            backgroundImage: 'url(./assets/grafit/punk-wall-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 85%',
            clipPath: 'polygon(0% 69%, 100% 69%, 100% 100%, 0% 100%)',
            opacity: 0.82,
          }}
        />

        {/* ATMOSPHERIC DESCANSO VISUAL VEIL (UNIFIES CONTRAST WITHOUT BOXING IN CARDS) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,11,10,0.85) 0%, rgba(20,18,16,0.62) 18%, rgba(20,18,16,0.68) 82%, rgba(12,11,10,0.88) 100%)',
          }}
        />

        {/* TOP SEAMLESS FADE FROM PRECEDING DARK SECTION */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #0c0b0a 0%, rgba(12,11,10,0) 100%)',
          }}
        />

        {/* BOTTOM SEAMLESS FADE TO NEXT SECTION */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #0c0b0a 0%, rgba(12,11,10,0) 100%)',
          }}
        />
      </div>

      {/* =================================================================== */}
      {/* 2. MAIN COMPOSITION CONTENT (SLICED MULTI-LAYER ASSEMBLY)          */}
      {/* =================================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ================================================================= */}
        {/* BAND 0: HEADER THRESHOLD, BRANDING & TITLE SLICE                  */}
        {/* ================================================================= */}
        <div ref={band0Ref} className="will-change-transform space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#b91c1c] text-white font-mono text-[11px] font-bold px-3 py-1 border border-black uppercase shadow-[3px_3px_0_#000]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>SALÓN MULTIUSOS & CELEBRACIONES // INDAUTXU</span>
            </span>
            <span className="font-mono text-xs font-bold text-[#e2c044] bg-black/75 px-3 py-1 border border-[#33302c] shadow-[2px_2px_0_#000]">
              ★ CAPACIDAD MODULAR HASTA 50 PERSONAS ★
            </span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl uppercase tracking-wider text-[#f5efe1] leading-[0.94] drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
            EL ESPACIO INDEPENDIENTE
            <span className="block text-[#e2c044]">PARA TUS REUNIONES Y CELEBRACIONES</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#ded8cb] max-w-3xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            En pleno centro de Indautxu, Grafit dispone de una sala independiente, diáfana y con personalidad genuina.
            Cocina ininterrumpida, barra propia, acústica cuidada y total libertad para celebrar sin prisas de rotación.
          </p>
        </div>

        {/* ================================================================= */}
        {/* BAND 1: COMMERCIAL FORMAT SELECTOR TABS SLICE                     */}
        {/* ================================================================= */}
        <div ref={band1Ref} className="will-change-transform">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {FORMATOS.map((f) => {
              const isActive = f.id === selectedId;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedId(f.id)}
                  className={`p-3.5 sm:p-4 text-left border-2 transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-black/90 text-white border-[#e2c044] shadow-[4px_4px_0_#b91c1c] -translate-y-1'
                      : 'bg-black/60 text-[#ded8cb] border-neutral-700 hover:border-neutral-400 hover:bg-black/80 shadow-[3px_3px_0_#000]'
                  }`}
                >
                  <span
                    className="inline-block text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 border border-black mb-1.5 uppercase"
                    style={{
                      backgroundColor: isActive ? '#b91c1c' : f.badgeColor,
                      color: '#ffffff',
                    }}
                  >
                    {f.badge}
                  </span>
                  <h3 className="font-anton text-base sm:text-lg uppercase leading-tight text-white">
                    {f.title}
                  </h3>
                  <span className="font-mono text-[10px] block mt-1 text-[#e2c044]">
                    {f.capacity}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* BAND 2: ACTIVE FORMAT SHOWCASE & VISUAL ESSAY SLICE               */}
        {/* ================================================================= */}
        <div
          ref={band2Ref}
          className="will-change-transform p-5 sm:p-8 bg-black/75 border-3 border-neutral-700 shadow-[8px_8px_0_#000] relative backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* PHOTO PLATE WITH POLAROID BORDER & BADGES */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="relative aspect-[4/3] bg-black border-3 border-black overflow-hidden shadow-[6px_6px_0_#000]">
                <img
                  src={activeFormat.photo}
                  alt={activeFormat.photoCaption}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2.5 py-0.5 border border-black uppercase shadow">
                  FOTOGRAFÍA REAL DEL SALÓN
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/90 text-[#e2c044] font-mono text-[10px] font-bold px-2.5 py-0.5 border border-[#e2c044] uppercase">
                  CAPACIDAD: {activeFormat.capacity}
                </div>
              </div>
              <p className="font-mono text-[11px] text-[#ded8cb]/80 text-center italic">
                {activeFormat.photoCaption}
              </p>
            </div>

            {/* EDITORIAL DESCRIPTION & OPERATIONAL ADVANTAGES */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="inline-block bg-[#b91c1c] text-white font-mono text-xs font-bold px-2.5 py-0.5 border border-black uppercase shadow-[2px_2px_0_#000] mb-2">
                  {activeFormat.badge}
                </span>
                <h4 className="font-anton text-3xl sm:text-4xl text-white uppercase tracking-wide leading-tight drop-shadow-sm">
                  {activeFormat.title}
                </h4>
                <p className="font-mono text-xs text-[#e2c044] font-bold uppercase mt-1">
                  {activeFormat.subtitle}
                </p>
              </div>

              <p className="font-sans text-neutral-200 text-sm sm:text-base leading-relaxed">
                {activeFormat.description}
              </p>

              {/* HIGHLIGHT PILLARS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
                {activeFormat.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e2c044] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-[#ded8cb] font-medium leading-tight">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* BAND 3: DIRECT ACTION CONVERSION & VENUE METRICS SLICE            */}
        {/* ================================================================= */}
        <div ref={band3Ref} className="will-change-transform pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate(`/contacto?tipo=${activeFormat.tipoParam}`)}
              className="w-full sm:w-auto px-7 py-4 bg-[#b91c1c] hover:bg-red-700 text-white font-anton text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>★ CONSULTAR DISPONIBILIDAD ★</span>
            </button>

            <button
              onClick={() => onNavigate('/espacio')}
              className="w-full sm:w-auto px-6 py-4 bg-[#f5efe1] hover:bg-white text-black font-anton text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <span>CONOCER EL SALÓN Y LA VOLKSWAGEN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#ded8cb]/80">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#e2c044]" />
              <span>Indautxu, Bilbao</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span>Sin coste de alquiler de sala</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
