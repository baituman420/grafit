import React, { useRef, useState, useEffect } from 'react';
import { Move, Grid, Touchpad, Info, ArrowRight, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  image: string;
  description: string;
  eraBadge?: string;
  isHistoricArchive?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'salon-principal',
    title: 'El Gran Salón Multiusos',
    category: 'INSTALACIONES // SALÓN',
    categoryColor: '#b91c1c',
    image: './assets/grafit/instagram/621137527_18159238840410802_2351787220592329803_n.jpg',
    description: 'Diáfano, modular y con capacidad para grupos de hasta 50 personas. El corazón de las comidas de cuadrilla y eventos privados en Indautxu.',
    eraBadge: 'INSTALACIONES REALES • GRUPOS',
  },
  {
    id: 'barra-indautxu',
    title: 'La Barra de Urrutia Kalea',
    category: 'INSTALACIONES // BARRA',
    categoryColor: '#16a34a',
    image: './assets/grafit/instagram/ambiente_barra.webp',
    description: 'Ambiente cercano, cañas bien tiradas, mostrador de pintxos y punto neurálgico de las previas zurigorris.',
    eraBadge: 'PULSO DE BARRIO EN INDAUTXU',
  },
  {
    id: 'fachada-negra',
    title: 'Fachada Negra en Urrutia 1',
    category: 'ARQUITECTURA // EXTERIOR',
    categoryColor: '#0a0a0a',
    image: './assets/grafit/exterior/grafit-fachada-negra.jpg',
    description: 'La presencia sobria y elegante de la fachada negra de Grafit en el corazón social de Indautxu, a 3 minutos del metro.',
    eraBadge: 'EXTERIOR • URRUTIA 1',
  },
  {
    id: 'vw-van',
    title: 'La Media Volkswagen T1',
    category: 'IDENTIDAD // ELEMENTO ARTÍSTICO',
    categoryColor: '#e2c044',
    image: './assets/grafit/instagram/599139401_17934885522129317_243501184606504542_n.jpg',
    description: 'Estructura decorativa frontal real integrada en la pared de ladrillo visto del salón interior. Elemento singular de la sala.',
    eraBadge: 'ELEMENTO DISTINTIVO DEL SALÓN',
  },
  {
    id: 'catering-grupos',
    title: 'Bandejas y Catering para Grupos',
    category: 'GASTRONOMÍA // CELEBRACIONES',
    categoryColor: '#b91c1c',
    image: './assets/grafit/instagram/pintxos_eventos.webp',
    description: 'Surtido de bocaditos artesanales y raciones calientes dispuestas para comidas de cuadrilla y eventos privados.',
    eraBadge: 'CATERING PARA EVENTOS',
  },
  {
    id: 'fiestas-celebracion',
    title: 'Celebraciones y Fiestas Privadas',
    category: 'EVENTOS // AMBIENTE REAL',
    categoryColor: '#e2c044',
    image: './assets/grafit/instagram/650038313_18016798205818470_3726701705553018311_n.jpg',
    description: 'Encuentros reales en el salón: celebraciones distendidas, copas y amigos disfrutando sin turnos forzados.',
    eraBadge: 'CELEBRACIONES REALES',
  },
  {
    id: 'archivo-concierto-1',
    title: 'Noches de Música en Directo (2018)',
    category: 'ARCHIVO DOCUMENTAL HISTÓRICO',
    categoryColor: '#71717a',
    image: './assets/grafit/events/grafit-concierto-mikel-bizar-12.jpg',
    description: 'Memoria gráfica de los conciertos acústicos íntimos celebrados en 2018. Archivo documental histórico sin conciertos vigentes.',
    eraBadge: 'ARCHIVO HISTÓRICO • SIN CONCIERTOS ACTUALES',
    isHistoricArchive: true,
  },
  {
    id: 'archivo-concierto-2',
    title: 'Actuación Cuarto Traste (2018)',
    category: 'ARCHIVO DOCUMENTAL HISTÓRICO',
    categoryColor: '#71717a',
    image: './assets/grafit/events/grafit-concierto-cuarto-traste-07.jpg',
    description: 'Documento fotográfico del directo de Cuarto Traste en 2018. Testimonio del archivo cultural de Grafit.',
    eraBadge: 'ARCHIVO HISTÓRICO • SIN CONCIERTOS ACTUALES',
    isHistoricArchive: true,
  },
];

export const InteractiveDraggableGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewMode, setViewMode] = useState<'draggable' | 'grid'>('draggable');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.6; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Check prefers-reduced-motion to default to accessible grid
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setViewMode('grid');
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* GALLERY TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#181615] border-2 border-[#33302c] shadow-[4px_4px_0_#000]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#ded8cb]">
          <span className="w-2.5 h-2.5 bg-[#e2c044] rounded-full animate-pulse" />
          <span className="text-[#e2c044] font-bold uppercase">// EXPLORADOR VISUAL DEL LOCAL</span>
          <span className="hidden sm:inline text-[#9c9488]">| {viewMode === 'draggable' ? 'Arrastra o desliza libremente' : 'Vista en cuadrícula'}</span>
        </div>

        {/* MODE TOGGLES */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('draggable')}
            className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'draggable'
                ? 'bg-[#e2c044] text-black border-black shadow-[2px_2px_0_#000]'
                : 'bg-black text-[#9c9488] border-[#33302c] hover:text-[#f5efe1]'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>Mover Libremente</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-[#e2c044] text-black border-black shadow-[2px_2px_0_#000]'
                : 'bg-black text-[#9c9488] border-[#33302c] hover:text-[#f5efe1]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Cuadrícula</span>
          </button>
        </div>
      </div>

      {/* VIEWPORT MODE 1: DRAGGABLE / TOUCH-SWIPE SLIDER */}
      {viewMode === 'draggable' ? (
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex gap-6 overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin scrollbar-thumb-[#e2c044] scrollbar-track-black select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {GALLERY_ITEMS.map((item, idx) => {
            const isHistoric = item.isHistoricArchive;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`relative shrink-0 w-[280px] sm:w-[340px] bg-[#181615] border-3 p-4 shadow-[6px_6px_0_#000] transition-transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                  isHistoric ? 'border-[#555] opacity-90' : 'border-[#33302c] hover:border-[#e2c044]'
                }`}
              >
                {/* CATEGORY & ERA BADGE */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 uppercase border shadow-sm"
                    style={{
                      backgroundColor: item.categoryColor,
                      color: item.categoryColor === '#e2c044' ? '#000' : '#fff',
                      borderColor: '#000',
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="font-mono text-[9px] text-[#9c9488]">
                    0{idx + 1} / 0{GALLERY_ITEMS.length}
                  </span>
                </div>

                {/* PHOTO CONTAINER */}
                <div className="relative aspect-[4/3] bg-black overflow-hidden border border-[#2b2724] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {isHistoric && (
                    <div className="absolute top-2 right-2 bg-black/90 text-[#fbbf24] font-mono text-[9px] font-bold px-2 py-0.5 border border-[#fbbf24] uppercase">
                      ARCHIVO HISTÓRICO
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                    <Eye className="w-3 h-3 text-[#e2c044]" />
                    <span>Ver detalle</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-['Anton'] text-lg sm:text-xl uppercase tracking-wider text-[#f5efe1]">
                      {item.title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-xs text-[#b8b0a2] line-clamp-2 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#262320] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#e2c044]">{item.eraBadge}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9c9488]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* VIEWPORT MODE 2: ACCESSIBLE STATIC GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-[#181615] border-3 border-[#33302c] p-4 shadow-[6px_6px_0_#000] flex flex-col justify-between cursor-pointer hover:border-[#e2c044] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 uppercase border shadow-sm"
                    style={{
                      backgroundColor: item.categoryColor,
                      color: item.categoryColor === '#e2c044' ? '#000' : '#fff',
                      borderColor: '#000',
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#9c9488]">0{idx + 1}</span>
                </div>
                <div className="relative aspect-[4/3] bg-black overflow-hidden border border-[#2b2724] mb-3">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  {item.isHistoricArchive && (
                    <div className="absolute top-2 right-2 bg-black/90 text-[#fbbf24] font-mono text-[9px] font-bold px-2 py-0.5 border border-[#fbbf24] uppercase">
                      ARCHIVO HISTÓRICO
                    </div>
                  )}
                </div>
                <h3 className="font-['Anton'] text-lg uppercase tracking-wide text-[#f5efe1]">
                  {item.title}
                </h3>
                <p className="font-['Space_Grotesk'] text-xs text-[#b8b0a2] mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#262320] mt-3 font-mono text-[10px] text-[#e2c044]">
                {item.eraBadge}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POPUP MODAL FOR FOCUSED PHOTO INSPECTION */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#181615] border-4 border-[#e2c044] p-6 max-w-2xl w-full shadow-[12px_12px_0_#000] space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#e2c044] uppercase tracking-wider">
                // {activeItem.category}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="px-2.5 py-1 bg-black text-white hover:bg-[#b91c1c] border border-[#555] font-mono text-xs cursor-pointer"
              >
                CERRAR ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black border-2 border-black overflow-hidden">
              <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-['Anton'] text-2xl uppercase tracking-wider text-[#f5efe1]">
                {activeItem.title}
              </h3>
              <p className="font-['Space_Grotesk'] text-sm text-[#ded8cb] mt-2 leading-relaxed">
                {activeItem.description}
              </p>
              {activeItem.isHistoricArchive && (
                <div className="mt-3 p-3 bg-amber-950/60 border border-amber-600 font-mono text-xs text-amber-200">
                  <strong>Nota informativa:</strong> Este registro gráfico pertenece al archivo histórico del local. Grafit Café no cuenta con programación de conciertos en directo en la actualidad, enfocando su actividad en la gastronomía de barra y salón y las celebraciones privadas de grupo en su salón multiusos.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
