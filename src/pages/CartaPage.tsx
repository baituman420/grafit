import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GRAFIT_DATA, CartaItem } from '../data/grafit';
import {
  Utensils,
  ArrowRight,
  ArrowLeft,
  Eye,
  X,
  Flame,
  Sparkles,
  Wheat,
  Pizza,
  Salad,
  Sandwich,
  Beef,
  Search,
  ChevronUp,
  Filter,
  Leaf,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CartaPageProps {
  onNavigate: (path: string) => void;
}

type CategoryKey =
  | 'todos'
  | 'hamburguesas'
  | 'sandwiches'
  | 'bocatas'
  | 'pizzas'
  | 'ensaladas'
  | 'picoteo'
  | 'platosCombinados';

type DietaryFilter = 'all' | 'veggie' | 'especiales';

export const CartaPage: React.FC<CartaPageProps> = ({ onNavigate }) => {
  const { gastronomia, info } = GRAFIT_DATA;
  const { carta } = gastronomia;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDietary, setActiveDietary] = useState<DietaryFilter>('all');
  const [inspectModal, setInspectModal] = useState<{ src: string; title: string; desc?: string } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const categoryContentRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Show / Hide Floating Back-to-Top Button on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for Modal (ESC key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectModal) {
        setInspectModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectModal]);

  // GSAP: Animate Entrance of Modal Box
  useGSAP(() => {
    if (inspectModal && modalBoxRef.current && !isReducedMotion) {
      gsap.fromTo(
        modalBoxRef.current,
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, { dependencies: [inspectModal], revertOnUpdate: true });

  // GSAP: Stagger dish cards on category / filter / search change
  useGSAP(() => {
    if (isReducedMotion || !categoryContentRef.current) return;

    const cards = categoryContentRef.current.querySelectorAll('.dish-menu-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: {
            amount: 0.2,
            from: 'start',
          },
          ease: 'power2.out',
        }
      );
    }
  }, { dependencies: [activeCategory, searchQuery, activeDietary], scope: categoryContentRef, revertOnUpdate: true });

  // GSAP: ScrollTrigger for category section banners
  useGSAP(() => {
    if (isReducedMotion || !pageContainerRef.current) return;

    const banners = pageContainerRef.current.querySelectorAll('.carta-section-banner');
    banners.forEach((banner) => {
      gsap.fromTo(
        banner,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: banner,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });
  }, { dependencies: [activeCategory, searchQuery, activeDietary], scope: pageContainerRef });

  const categories: { key: CategoryKey; label: string; icon: React.ReactNode; count: number }[] = [
    {
      key: 'todos',
      label: 'CARTA COMPLETA',
      icon: <Utensils className="w-4 h-4" />,
      count:
        carta.hamburguesas.especiales.length +
        carta.hamburguesas.clasicas.length +
        carta.sandwiches.length +
        carta.bocatas.frios.length +
        carta.bocatas.calientes.length +
        carta.pizzas.length +
        carta.ensaladas.length +
        carta.picoteo.length +
        carta.platosCombinados.length,
    },
    {
      key: 'hamburguesas',
      label: 'HAMBURGUESAS',
      icon: <Beef className="w-4 h-4 text-[#e2c044]" />,
      count: carta.hamburguesas.especiales.length + carta.hamburguesas.clasicas.length,
    },
    {
      key: 'sandwiches',
      label: 'SÁNDWICHES',
      icon: <Sandwich className="w-4 h-4" />,
      count: carta.sandwiches.length,
    },
    {
      key: 'bocatas',
      label: 'BOCATAS',
      icon: <Utensils className="w-4 h-4" />,
      count: carta.bocatas.frios.length + carta.bocatas.calientes.length,
    },
    {
      key: 'pizzas',
      label: 'PIZZAS',
      icon: <Pizza className="w-4 h-4" />,
      count: carta.pizzas.length,
    },
    {
      key: 'ensaladas',
      label: 'ENSALADAS',
      icon: <Salad className="w-4 h-4" />,
      count: carta.ensaladas.length,
    },
    {
      key: 'picoteo',
      label: 'PICOTEO & RACIONES',
      icon: <Flame className="w-4 h-4 text-[#b91c1c]" />,
      count: carta.picoteo.length,
    },
    {
      key: 'platosCombinados',
      label: 'PLATOS COMBINADOS',
      icon: <Utensils className="w-4 h-4" />,
      count: carta.platosCombinados.length,
    },
  ];

  // Filter helper
  const filterItems = (items: CartaItem[]): CartaItem[] => {
    return items.filter((item) => {
      // 1. Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchBadge = item.badge?.toLowerCase().includes(query) ?? false;
        const matchBread = item.bread?.toLowerCase().includes(query) ?? false;
        if (!matchName && !matchDesc && !matchBadge && !matchBread) return false;
      }

      // 2. Dietary filter
      if (activeDietary === 'veggie') {
        const text = `${item.name} ${item.description} ${item.badge ?? ''}`.toLowerCase();
        const isVeg = text.includes('vegan') || text.includes('veggie') || text.includes('vegetal') || text.includes('vegetariana');
        if (!isVeg) return false;
      } else if (activeDietary === 'especiales') {
        const text = `${item.badge ?? ''} ${item.name}`.toLowerCase();
        const isEsp =
          item.isSpecial ||
          text.includes('especial') ||
          text.includes('gourmet') ||
          text.includes('insignia') ||
          text.includes('favorito') ||
          text.includes('top');
        if (!isEsp) return false;
      }

      return true;
    });
  };

  const filteredHambEspeciales = filterItems(carta.hamburguesas.especiales);
  const filteredHambClasicas = filterItems(carta.hamburguesas.clasicas);
  const filteredSandwiches = filterItems(carta.sandwiches);
  const filteredBocatasFrios = filterItems(carta.bocatas.frios);
  const filteredBocatasCalientes = filterItems(carta.bocatas.calientes);
  const filteredPizzas = filterItems(carta.pizzas);
  const filteredEnsaladas = filterItems(carta.ensaladas);
  const filteredPicoteo = filterItems(carta.picoteo);
  const filteredCombinados = filterItems(carta.platosCombinados);

  const totalFilteredCount =
    filteredHambEspeciales.length +
    filteredHambClasicas.length +
    filteredSandwiches.length +
    filteredBocatasFrios.length +
    filteredBocatasCalientes.length +
    filteredPizzas.length +
    filteredEnsaladas.length +
    filteredPicoteo.length +
    filteredCombinados.length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={pageContainerRef} className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10 sm:space-y-12">
      {/* NAVEGACIÓN SUPERIOR */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-black text-white font-mono-code text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER A LA PORTADA</span>
        </button>

        <div className="bg-white px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hidden sm:flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] inline-block animate-pulse" />
          <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-black">
            Urrutia Kalea 1 • Indautxu • Bilbao
          </span>
        </div>
      </div>

      {/* CABECERA ROCK FANZINE */}
      <div className="p-6 sm:p-10 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative tape-top space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block bg-[#b91c1c] text-white font-mono-code font-bold text-xs px-3 py-1 border-2 border-black rot-neg-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            GASTRONOMÍA ROCK // BILBAO
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-900 bg-white px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {info.kitchenHours}
          </span>
          <span className="font-mono-code text-xs font-bold text-[#b91c1c] bg-white px-2.5 py-1 border-2 border-black flex items-center gap-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <Wheat className="w-3.5 h-3.5" />
            <span>OPCIÓN PAN SIN GLUTEN</span>
          </span>
        </div>

        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-black uppercase tracking-wider leading-[0.95]">
          LA CARTA DEL GRAFIT
        </h1>
        <p className="font-sans text-neutral-950 font-medium text-base sm:text-lg max-w-3xl leading-relaxed">
          Platos elaborados al momento con ingredientes de calidad para compartir en cuadrilla o disfrutar en la barra de Urrutia. Con especial protagonismo a nuestras <strong>hamburguesas de autor</strong>, sándwiches tostados, bocatas y raciones de picoteo.
        </p>

        {/* AVISO IMPORTANTE SIN GLUTEN */}
        <div className="p-3.5 bg-[#fff8db] border-2 border-black flex items-center gap-2.5 text-xs sm:text-sm font-mono font-bold text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          <Sparkles className="w-4 h-4 text-[#b91c1c] shrink-0" />
          <span>{carta.glutenFreeNotice}</span>
        </div>

        {/* BUSCADOR Y FILTROS RÁPIDOS */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-t-2 border-black/15">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plato o ingrediente (trufa, pollo, ibérico...)"
              className="w-full pl-9 pr-8 py-2 bg-white text-black font-sans text-xs sm:text-sm font-medium border-2 border-black shadow-[2px_2px_0px_#000] focus:outline-none focus:border-[#b91c1c]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-500 hover:text-black cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-mono text-[10px] font-bold text-neutral-700 uppercase flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" />
              Filtro:
            </span>
            <button
              onClick={() => setActiveDietary('all')}
              className={`px-2.5 py-1 text-xs font-mono font-bold border border-black cursor-pointer transition-colors shrink-0 ${
                activeDietary === 'all' ? 'bg-black text-white shadow-[1px_1px_0px_#000]' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              TODOS
            </button>
            <button
              onClick={() => setActiveDietary('veggie')}
              className={`px-2.5 py-1 text-xs font-mono font-bold border border-black cursor-pointer transition-colors flex items-center gap-1 shrink-0 ${
                activeDietary === 'veggie' ? 'bg-[#16a34a] text-white shadow-[1px_1px_0px_#000]' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Leaf className="w-3 h-3" />
              VEGGIE / VEGAN
            </button>
            <button
              onClick={() => setActiveDietary('especiales')}
              className={`px-2.5 py-1 text-xs font-mono font-bold border border-black cursor-pointer transition-colors flex items-center gap-1 shrink-0 ${
                activeDietary === 'especiales' ? 'bg-[#b91c1c] text-white shadow-[1px_1px_0px_#000]' : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              ESPECIALES
            </button>
          </div>
        </div>
      </div>

      {/* SELECTOR DE CATEGORÍAS STICKY */}
      <div className="sticky top-20 z-30 bg-[#0c0b0a]/95 backdrop-blur-md p-3 sm:p-4 border-4 border-black shadow-[6px_6px_0px_#b91c1c]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                }}
                className={`px-3.5 py-2 font-mono text-xs font-bold whitespace-nowrap transition-all border-2 border-black flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#b91c1c] text-white shadow-[3px_3px_0px_#000] -translate-y-0.5'
                    : 'bg-[#1a1816] text-[#f5efe1] border-neutral-700 hover:border-white hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isSelected ? 'bg-black text-[#e2c044]' : 'bg-[#2a2624] text-amber-200 border border-neutral-700'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* INDICADOR DE BÚSQUEDA ACTIVA */}
      {(searchQuery.trim() !== '' || activeDietary !== 'all') && (
        <div className="p-3 bg-[#fff8db] border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-between">
          <div className="text-xs sm:text-sm font-mono font-bold text-black flex items-center gap-2">
            <span>★</span>
            <span>
              Mostrando <strong>{totalFilteredCount}</strong> platos coincidentes
              {searchQuery && <> con &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
              {activeDietary !== 'all' && <> (Filtro: <strong>{activeDietary.toUpperCase()}</strong>)</>}
            </span>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveDietary('all');
            }}
            className="text-xs font-mono font-bold text-[#b91c1c] underline hover:no-underline cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* CONTENEDOR DE SECCIONES CON TRANSICIONES GSAP */}
      <div ref={categoryContentRef} className="space-y-12">
        {/* ========================================================================= */}
        {/* 1. SECCIÓN PRINCIPAL: HAMBURGUESAS */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'hamburguesas') &&
          (filteredHambEspeciales.length > 0 || filteredHambClasicas.length > 0) && (
            <section id="sec-hamburguesas" className="space-y-8">
              {/* HEADER HAMBURGUESAS */}
              <div className="carta-section-banner p-6 sm:p-8 bg-[#0c0b0a] text-white border-4 border-black shadow-[8px_8px_0px_#e2c044] relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#b91c1c]/20 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 font-bold rot-neg-1 border border-black shadow">
                      <Flame className="w-3.5 h-3.5" />
                      <span>PLATO ESTRELLA DE LA CASA</span>
                    </div>
                    <h2 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-white">
                      HAMBURGUESAS
                    </h2>
                    <p className="font-sans text-neutral-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                      {carta.hamburguesas.subtitle}. Carnes seleccionadas, combinaciones gourmet de autor y panes artesanos.
                    </p>
                  </div>

                  <div className="bg-[#181615] p-3 border border-neutral-700 text-xs font-mono text-[#e2c044] font-bold flex items-center gap-2 shrink-0">
                    <Wheat className="w-4 h-4 text-amber-400" />
                    <span>Pan sin gluten disponible</span>
                  </div>
                </div>
              </div>

              {/* HAMBURGUESAS ESPECIALES (CARDS GRANDES CON FOTOS REALES) */}
              {filteredHambEspeciales.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-[#f4eedd] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-black flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-[#b91c1c]" />
                      <span>HAMBURGUESAS ESPECIALES DE AUTOR</span>
                    </h3>
                    <span className="bg-black text-[#e2c044] font-mono text-xs font-bold px-2.5 py-1 uppercase border border-black shadow inline-block">
                      ★ Fotografías reales de la cocina de Grafit
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {filteredHambEspeciales.map((burger) => (
                      <div
                        key={burger.id}
                        className="dish-menu-card bg-[#fbf8f1] border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[8px_8px_0px_#b91c1c] hover:border-[#b91c1c] transition-all hover:-translate-y-1 flex flex-col overflow-hidden group will-change-transform"
                      >
                        {burger.image && (
                          <div
                            className="relative h-64 sm:h-72 w-full bg-black overflow-hidden cursor-pointer border-b-4 border-black"
                            onClick={() =>
                              setInspectModal({
                                src: burger.image!,
                                title: burger.name,
                                desc: burger.description,
                              })
                            }
                          >
                            <img
                              src={burger.image}
                              alt={burger.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                              loading="lazy"
                            />
                            <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-xs font-bold px-2.5 py-1 uppercase border border-black shadow-[2px_2px_0px_#000]">
                              {burger.badge}
                            </div>
                            {burger.bread && (
                              <div className="absolute bottom-3 left-3 bg-black/90 text-[#e2c044] font-mono text-xs font-bold px-2.5 py-1 border border-neutral-700 backdrop-blur-sm">
                                🍞 {burger.bread}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                              <Eye className="w-5 h-5 text-[#e2c044]" />
                              <span>AMPLIAR FOTOGRAFÍA</span>
                            </div>
                          </div>
                        )}

                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-black group-hover:text-[#b91c1c] transition-colors leading-tight">
                              {burger.name}
                            </h4>
                            <p className="font-sans text-sm sm:text-base text-neutral-950 font-normal leading-relaxed">
                              {burger.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HAMBURGUESAS CLÁSICAS */}
              {filteredHambClasicas.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="bg-[#f4eedd] border-3 border-black p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
                    <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                      HAMBURGUESAS CLÁSICAS DE LA CARTA
                    </h3>
                    <span className="bg-black text-white font-mono text-xs font-bold px-2.5 py-1 uppercase">
                      6 variedades de siempre
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredHambClasicas.map((burger) => (
                      <div
                        key={burger.id}
                        className="dish-menu-card bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] hover:border-[#b91c1c] hover:shadow-[4px_4px_0px_#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-3 will-change-transform"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
                              Hamburguesa Clásica
                            </span>
                            {burger.badge && (
                              <span className="bg-black text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                                {burger.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-anton text-xl uppercase tracking-wide text-black">
                            {burger.name}
                          </h4>
                          <p className="font-sans text-sm text-neutral-950 font-normal leading-relaxed">
                            {burger.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

        {/* ========================================================================= */}
        {/* 2. SECCIÓN: SÁNDWICHES */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'sandwiches') && filteredSandwiches.length > 0 && (
          <section id="sec-sandwiches" className="space-y-6 pt-4">
            <div className="carta-section-banner bg-[#141210] text-white border-4 border-black shadow-[6px_6px_0px_#b91c1c] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 font-bold rot-neg-1 border border-black shadow">
                      // TOSTADOS A LA PLANCHA
                    </div>
                    <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
                      SÁNDWICHES
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-neutral-100 max-w-xl leading-relaxed">
                      Pan crujiente tostado al momento con rellenos generosos, quesos fundentes y combinaciones caseras.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono font-bold">
                    <span className="bg-[#24201d] text-[#e2c044] px-3 py-1.5 border border-neutral-700">
                      {carta.sandwiches.length} VARIEDADES
                    </span>
                    <span className="bg-black/60 text-white px-3 py-1.5 border border-neutral-700">
                      Pan crujiente a la plancha
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                  <div
                    className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setInspectModal({
                        src: './assets/grafit/instagram/sandwich-carta.webp',
                        title: 'Sándwich Tostado a la Plancha',
                        desc: 'Referencia visual del tipo de plato: pan crujiente tostado al momento con abundantes capas de relleno.',
                      })
                    }
                  >
                    <img
                      src="./assets/grafit/instagram/sandwich-carta.webp"
                      alt="Referencia de sándwiches tostados en Grafit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                      FOTO REFERENCIA // SÁNDWICH
                    </div>
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                      <Eye className="w-4 h-4 text-[#e2c044]" />
                      <span>AMPLIAR REFERENCIA</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#181615] border-t-2 border-neutral-800">
                    <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                      ★ <strong>Referencia visual:</strong> Presentación de sándwich tostado artesano con guarnición.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSandwiches.map((item) => (
                <div
                  key={item.id}
                  className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:border-[#b91c1c] hover:shadow-[4px_4px_0px_#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-3 group will-change-transform"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-neutral-900 uppercase tracking-wide">
                        Sándwich Tostado
                      </span>
                      {item.badge && (
                        <span className="bg-[#b91c1c] text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-anton text-xl uppercase tracking-wide text-black group-hover:text-[#b91c1c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. SECCIÓN: BOCATAS */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'bocatas') &&
          (filteredBocatasFrios.length > 0 || filteredBocatasCalientes.length > 0) && (
            <section id="sec-bocatas" className="space-y-6 pt-4">
              <div className="carta-section-banner bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block bg-[#b91c1c] text-white font-mono text-xs font-bold px-3 py-1 uppercase rot-neg-1 border border-black shadow">
                        ¡¡ TAMBIÉN TUS MENÚS PARA LLEVAR !!
                      </span>
                      <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
                        BOCATAS
                      </h2>
                      <p className="font-sans text-sm sm:text-base text-neutral-950 font-medium max-w-xl leading-relaxed">
                        Pan crujiente de obrador, embutidos ibéricos al corte y carnes a la plancha preparadas al momento.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs font-bold">
                      <span className="bg-black text-white px-3 py-1.5 border border-black">
                        Fríos & Calientes de Plancha
                      </span>
                      <span className="bg-white text-black px-3 py-1.5 border border-black">
                        {carta.bocatas.frios.length + carta.bocatas.calientes.length} Variedades
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                    <div
                      className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                      onClick={() =>
                        setInspectModal({
                          src: './assets/grafit/instagram/bocadillos2.webp',
                          title: 'Bocadillo Caliente de Plancha',
                          desc: 'Referencia visual del tipo de plato: pan crujiente de panadería con carnes a la plancha y paleta ibérica.',
                        })
                      }
                    >
                      <img
                        src="./assets/grafit/instagram/bocadillos2.webp"
                        alt="Referencia de bocadillos en Grafit"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                        FOTO REFERENCIA // BOCATAS
                      </div>
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                        <Eye className="w-4 h-4 text-[#e2c044]" />
                        <span>AMPLIAR REFERENCIA</span>
                      </div>
                    </div>
                    <div className="p-3 bg-[#181615] text-white border-t-2 border-neutral-800">
                      <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                        ★ <strong>Referencia visual:</strong> Presentación de bocadillo recién hecho en pan de panadería.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOCATAS FRÍOS */}
              {filteredBocatasFrios.length > 0 && (
                <div className="space-y-3">
                  <div className="bg-[#f4eedd] border-3 border-black px-4 py-2.5 shadow-[3px_3px_0px_#000] flex items-center justify-between">
                    <h3 className="font-anton text-xl uppercase tracking-wider text-black flex items-center gap-2">
                      <span className="w-3 h-3 bg-[#b91c1c] inline-block border border-black" />
                      <span>BOCATAS FRÍOS</span>
                    </h3>
                    <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
                      Embutidos ibéricos al corte
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {filteredBocatasFrios.map((item) => (
                      <div
                        key={item.id}
                        className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[3px_3px_0px_#000] hover:border-[#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                              Bocata Frío
                            </span>
                            {item.badge && (
                              <span className="bg-[#b91c1c] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase border border-black">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-anton text-lg uppercase tracking-wide text-black">
                            {item.name}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BOCATAS CALIENTES */}
              {filteredBocatasCalientes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="bg-[#f4eedd] border-3 border-black px-4 py-2.5 shadow-[3px_3px_0px_#000] flex items-center justify-between">
                    <h3 className="font-anton text-xl uppercase tracking-wider text-black flex items-center gap-2">
                      <span className="w-3 h-3 bg-[#e2c044] inline-block border border-black" />
                      <span>BOCATAS CALIENTES DE PLANCHA</span>
                    </h3>
                    <span className="font-mono text-xs font-bold text-neutral-900 uppercase">
                      Plancha al momento
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBocatasCalientes.map((item) => (
                      <div
                        key={item.id}
                        className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[3px_3px_0px_#000] hover:border-[#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                              Bocata Caliente
                            </span>
                            {item.badge && (
                              <span className="bg-neutral-900 text-[#e2c044] font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase border border-black">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-anton text-lg uppercase tracking-wide text-black group-hover:text-[#b91c1c] transition-colors">
                            {item.name}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

        {/* ========================================================================= */}
        {/* 4. SECCIÓN: PIZZAS */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'pizzas') && filteredPizzas.length > 0 && (
          <section id="sec-pizzas" className="space-y-6 pt-4">
            <div className="carta-section-banner bg-[#141210] text-white border-4 border-black shadow-[6px_6px_0px_#b91c1c] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block bg-[#e2c044] text-black font-mono-code text-xs px-3 py-1 font-bold rot-neg-1 border border-black shadow">
                      // MASA HORNEADA AL MOMENTO
                    </div>
                    <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
                      PIZZAS
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-neutral-100 max-w-xl leading-relaxed">
                      Mozzarella fundente, base crujiente y recetas clásicas y especiales de 32 cm horneadas al momento.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs font-bold">
                    <span className="bg-[#24201d] text-[#e2c044] px-3 py-1.5 border border-neutral-700">
                      {carta.pizzas.length} VARIEDADES (32 CM)
                    </span>
                    <span className="bg-black/60 text-white px-3 py-1.5 border border-neutral-700">
                      Masa crujiente horneada
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                  <div
                    className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setInspectModal({
                        src: './assets/grafit/instagram/pizza.webp',
                        title: 'Pizza Artesanal al Horno (32 cm)',
                        desc: 'Referencia visual del tipo de plato: masa horneada al momento con abundante mozzarella fundente.',
                      })
                    }
                  >
                    <img
                      src="./assets/grafit/instagram/pizza.webp"
                      alt="Referencia de pizzas en Grafit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                      FOTO REFERENCIA // PIZZAS
                    </div>
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                      <Eye className="w-4 h-4 text-[#e2c044]" />
                      <span>AMPLIAR REFERENCIA</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#181615] border-t-2 border-neutral-800">
                    <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                      ★ <strong>Referencia visual:</strong> Pizza recién horneada con mozzarella y masa crujiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPizzas.map((item) => (
                <div
                  key={item.id}
                  className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:border-[#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                        Pizza 32 cm
                      </span>
                      {item.badge && (
                        <span className="bg-[#b91c1c] text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-anton text-xl uppercase tracking-wide text-black group-hover:text-[#b91c1c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. SECCIÓN: ENSALADAS */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'ensaladas') && filteredEnsaladas.length > 0 && (
          <section id="sec-ensaladas" className="space-y-6 pt-4">
            <div className="carta-section-banner bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#16a34a] text-white font-mono text-xs font-bold px-3 py-1 uppercase rot-neg-1 border border-black shadow">
                      // FRESCURA & HUERTA
                    </span>
                    <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
                      ENSALADAS
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-neutral-950 font-medium max-w-xl leading-relaxed">
                      Bouquets variados con producto fresco de huerta, pescados seleccionados, quesos templados y aliños de autor.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs font-bold">
                    <span className="bg-black text-white px-3 py-1.5 border border-black">
                      {carta.ensaladas.length} Variedades Frescas
                    </span>
                    <span className="bg-white text-black px-3 py-1.5 border border-black">
                      Aliñadas al momento
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                  <div
                    className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setInspectModal({
                        src: './assets/grafit/instagram/ensalada-euskaldun.jpeg',
                        title: 'Ensalada Euskaldun',
                        desc: 'Referencia visual del tipo de plato: Ensalada Euskaldun preparada con bouquet de lechugas, tomate cherry, maíz, zanahoria, huevo cocido y espárrago.',
                      })
                    }
                  >
                    <img
                      src="./assets/grafit/instagram/ensalada-euskaldun.jpeg"
                      alt="Ensalada Euskaldun en Grafit Café"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#16a34a] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                      FOTO REFERENCIA // ENSALADAS
                    </div>
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                      <Eye className="w-4 h-4 text-[#e2c044]" />
                      <span>AMPLIAR REFERENCIA</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#181615] text-white border-t-2 border-neutral-800">
                    <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                      ★ <strong>Referencia visual:</strong> Ensalada Euskaldun con producto fresco de huerta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredEnsaladas.map((item) => (
                <div
                  key={item.id}
                  className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:border-[#16a34a] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                        Ensalada de Huerta
                      </span>
                      {item.badge && (
                        <span className="bg-[#16a34a] text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-anton text-lg uppercase tracking-wide text-black group-hover:text-[#16a34a] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 6. SECCIÓN: PICOTEO & RACIONES */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'picoteo') && filteredPicoteo.length > 0 && (
          <section id="sec-picoteo" className="space-y-6 pt-4">
            <div className="carta-section-banner bg-[#141210] text-white border-4 border-black shadow-[6px_6px_0px_#b91c1c] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block bg-[#b91c1c] text-white font-mono text-xs font-bold px-3 py-1 uppercase rot-neg-1 border border-black shadow">
                      // PARA COMPARTIR AL CENTRO
                    </div>
                    <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
                      PICOTEO & RACIONES
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-neutral-100 max-w-xl leading-relaxed">
                      Sartenekos calientes, patatas crujientes 6 salsas, croquetas artesanas, natxos gratinados y tablas ibéricas.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs font-bold">
                    <span className="bg-[#24201d] text-[#e2c044] px-3 py-1.5 border border-neutral-700">
                      {carta.picoteo.length} VARIEDADES
                    </span>
                    <span className="bg-black/60 text-white px-3 py-1.5 border border-neutral-700">
                      Raciones para compartir
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                  <div
                    className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setInspectModal({
                        src: './assets/grafit/instagram/picoteo.webp',
                        title: 'Sarteneko de Gulas con Gambas al Ajillo',
                        desc: 'Referencia visual del tipo de plato: sarteneko de gulas con gambas al ajillo servido caliente.',
                      })
                    }
                  >
                    <img
                      src="./assets/grafit/instagram/picoteo.webp"
                      alt="Sarteneko de gulas con gambas al ajillo en Grafit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                      FOTO REFERENCIA // PICOTEO
                    </div>
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                      <Eye className="w-4 h-4 text-[#e2c044]" />
                      <span>AMPLIAR REFERENCIA</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#181615] border-t-2 border-neutral-800">
                    <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                      ★ <strong>Referencia visual:</strong> Sarteneko de gulas con gambas al ajillo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPicoteo.map((item) => (
                <div
                  key={item.id}
                  className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:border-[#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                        Ración al Centro
                      </span>
                      {item.badge && (
                        <span className="bg-[#b91c1c] text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-anton text-xl uppercase tracking-wide text-black group-hover:text-[#b91c1c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 7. SECCIÓN: PLATOS COMBINADOS */}
        {/* ========================================================================= */}
        {(activeCategory === 'todos' || activeCategory === 'platosCombinados') && filteredCombinados.length > 0 && (
          <section id="sec-combinados" className="space-y-6 pt-4">
            <div className="carta-section-banner bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block bg-[#b91c1c] text-white font-mono text-xs font-bold px-3 py-1 uppercase rot-neg-1 border border-black shadow">
                      // COMPLETOS & CONTUNDENTES
                    </span>
                    <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
                      PLATOS COMBINADOS
                    </h2>
                    <p className="font-sans text-sm sm:text-base text-neutral-950 font-medium max-w-xl leading-relaxed">
                      Combinaciones tradicionales de carnes a la plancha, huevos de caserío, croquetas artesanas y patatas.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs font-bold">
                    <span className="bg-black text-white px-3 py-1.5 border border-black">
                      Platos del 1 al 8
                    </span>
                    <span className="bg-white text-black px-3 py-1.5 border border-black">
                      {carta.platosCombinados.length} Variedades
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-black border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between group">
                  <div
                    className="relative h-48 sm:h-52 lg:h-full min-h-[190px] w-full bg-black overflow-hidden cursor-pointer"
                    onClick={() =>
                      setInspectModal({
                        src: './assets/grafit/instagram/plato-combinado.webp',
                        title: 'Plato Combinado Tradicional',
                        desc: 'Referencia visual del tipo de plato: combinaciones completas preparadas al momento con carnes, huevos de caserío y patatas.',
                      })
                    }
                  >
                    <img
                      src="./assets/grafit/instagram/plato-combinado.webp"
                      alt="Referencia de platos combinados en Grafit"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 uppercase border border-black shadow">
                      FOTO REFERENCIA // COMBINADOS
                    </div>
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
                      <Eye className="w-4 h-4 text-[#e2c044]" />
                      <span>AMPLIAR REFERENCIA</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[#181615] text-white border-t-2 border-neutral-800">
                    <p className="font-sans text-[11px] text-neutral-300 leading-snug">
                      ★ <strong>Referencia visual:</strong> Plato combinado completo con pechuga empanada, ensaladilla, huevo y patatas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCombinados.map((item) => (
                <div
                  key={item.id}
                  className="dish-menu-card bg-white border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] hover:border-[#b91c1c] transition-all hover:-translate-y-0.5 flex flex-col justify-between space-y-2.5 will-change-transform"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-neutral-900 uppercase">
                        Combinado Tradicional
                      </span>
                      {item.badge && (
                        <span className="bg-black text-white font-mono text-[9px] font-bold px-2 py-0.5 uppercase border border-black">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-anton text-xl uppercase tracking-wide text-black group-hover:text-[#b91c1c] transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-neutral-950 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MENSAJE CUANDO NINGÚN PLATO COINCIDE CON LA BÚSQUEDA */}
        {totalFilteredCount === 0 && (
          <div className="p-10 bg-white border-4 border-black shadow-[8px_8px_0px_#000] text-center space-y-4">
            <span className="inline-block p-3 bg-neutral-100 border-2 border-black">
              <Search className="w-8 h-8 text-neutral-600" />
            </span>
            <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
              No hemos encontrado platos con esos criterios
            </h3>
            <p className="font-sans text-sm text-neutral-700 max-w-md mx-auto">
              Prueba a buscar con otra palabra clave (por ejemplo: &ldquo;pollo&rdquo;, &ldquo;trufa&rdquo;, &ldquo;ibérico&rdquo;) o limpia los filtros para ver la carta completa.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary('all');
                setActiveCategory('todos');
              }}
              className="px-5 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase border-2 border-black hover:bg-[#b91c1c] transition-colors cursor-pointer"
            >
              Restablecer carta completa
            </button>
          </div>
        )}
      </div>

      {/* CATERING & PROPUESTAS PARA GRUPOS EN EL SALÓN MULTIUSOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
        <div className="lg:col-span-7 p-6 sm:p-8 bg-black text-white border-4 border-black shadow-[8px_8px_0px_#b91c1c] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 font-bold rot-neg-1">
              CATERING & GRUPOS // SALÓN MULTIUSOS
            </div>
            <h3 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
              BANDEJAS Y MENÚS A MEDIDA PARA CELEBRACIONES
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-100 leading-relaxed font-normal">
              En Grafit preparamos bandejas de catering artesanales con hamburguesas gourmet cortadas, mini bocaditos, tablas ibéricas y raciones calientes para tus comidas de cuadrilla, cumpleaños o eventos en nuestro salón interior con la mítica furgoneta Volkswagen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-neutral-800">
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">01. BANDEJAS</span>
              <span className="text-xs font-sans text-neutral-200 font-medium">Canapés, sándwiches y picoteo variado servido al centro.</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">02. HAMBURGUESAS</span>
              <span className="text-xs font-sans text-neutral-200 font-medium">Degustación de nuestras carnes 100% y recetas especiales.</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">03. SIN ALQUILER</span>
              <span className="text-xs font-sans text-neutral-200 font-medium">Uso del salón adaptado sin suplementos ni costes ocultos.</span>
            </div>
          </div>
        </div>

        {/* FOTOGRAFÍA REAL DE CATERING EN EL SALÓN */}
        <div className="lg:col-span-5 bg-[#181615] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between group">
          <div
            className="relative aspect-[4/3] bg-black overflow-hidden cursor-pointer"
            onClick={() =>
              setInspectModal({
                src: './assets/grafit/catering/catering-volkswagen-01.jpg',
                title: 'Catering para Eventos y Celebraciones',
                desc: 'Montaje real de bandejas de catering en el salón multiusos con la furgoneta Volkswagen al fondo.',
              })
            }
          >
            <img
              src="./assets/grafit/catering/catering-volkswagen-01.jpg"
              alt="Catering para eventos en Grafit Café con furgoneta Volkswagen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2.5 py-1 uppercase border border-black shadow">
              FOTOGRAFÍA REAL // EVENTOS GRAFIT
            </div>
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
              <Eye className="w-4 h-4 text-[#e2c044]" />
              <span>AMPLIAR FOTO REAL</span>
            </div>
          </div>

          <div className="p-4 bg-[#1f1d1b] border-t-2 border-[#2b2724] space-y-1">
            <span className="font-mono text-xs font-bold text-[#e2c044] uppercase block">
              ★ SALÓN MULTIUSOS CON CATERING Y VOLKSWAGEN
            </span>
            <p className="font-sans text-xs text-neutral-200 font-medium leading-snug">
              Mesas dispuestas con bandejas surtidas para grupos grandes y celebraciones privadas en Indautxu.
            </p>
          </div>
        </div>
      </div>

      {/* CIERRE Y CONTACTO */}
      <div className="p-8 sm:p-12 bg-[#fbf8f1] border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] text-center space-y-6">
        <div className="inline-block bg-black text-white font-mono-code text-xs px-3 py-1 font-bold uppercase">
          RESERVAS DE GRUPO & PERSONALIZACIÓN
        </div>
        <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black max-w-3xl mx-auto">
          ¿TIENES UNA FECHA EN MENTE PARA TU CELEBRACIÓN?
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-950 font-medium max-w-2xl mx-auto leading-relaxed">
          Cuéntanos el número aproximado de asistentes y el estilo de comida que prefieres (hamburguesas, raciones para compartir o catering de barra). Te preparamos una propuesta sin compromiso.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=comida-grupo')}
            className="px-8 py-4 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
          >
            <span>SOLICITAR PROPUESTA DE GRUPO</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
          <button
            onClick={() => onNavigate('/espacio')}
            className="px-8 py-4 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
          >
            <span>VER EL SALÓN MULTIUSOS</span>
          </button>
        </div>
      </div>

      {/* BOTÓN FLOTANTE "SUBIR AL MENÚ" */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-black text-white border-2 border-[#e2c044] shadow-[4px_4px_0px_#000] hover:bg-[#b91c1c] transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-2 font-mono text-xs font-bold"
          aria-label="Subir al inicio de la carta"
        >
          <ChevronUp className="w-4 h-4 text-[#e2c044]" />
          <span className="hidden sm:inline">SUBIR AL MENÚ</span>
        </button>
      )}

      {/* MODAL INSPECTOR DE IMÁGENES */}
      {inspectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setInspectModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalBoxRef}
            className="relative max-w-4xl w-full bg-[#181615] border-4 border-black p-4 sm:p-6 shadow-[16px_16px_0_#b91c1c] text-white space-y-4 will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2724]">
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-[#e2c044] uppercase block">
                  DETALLE // GASTRONOMÍA REAL DE GRAFIT
                </span>
                <span className="font-anton text-xl text-white tracking-wide uppercase">
                  {inspectModal.title}
                </span>
              </div>
              <button
                onClick={() => setInspectModal(null)}
                className="p-1.5 bg-black hover:bg-[#b91c1c] text-white border border-neutral-700 cursor-pointer transition-colors"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black border-2 border-[#2b2724] overflow-hidden flex items-center justify-center">
              <img
                src={inspectModal.src}
                alt={inspectModal.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {inspectModal.desc && (
              <p className="font-sans text-xs sm:text-sm text-white font-medium leading-relaxed pt-1">
                {inspectModal.desc}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
