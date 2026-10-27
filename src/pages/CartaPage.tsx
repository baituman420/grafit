import React, { useState } from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Utensils, Clock, Users, ArrowRight, ArrowLeft, Beer, Sparkles, CheckCircle2, Eye, X } from 'lucide-react';

interface CartaPageProps {
  onNavigate: (path: string) => void;
}

export const CartaPage: React.FC<CartaPageProps> = ({ onNavigate }) => {
  const { gastronomia, info } = GRAFIT_DATA;
  const [inspectModal, setInspectModal] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* NAVIGATION BACK */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-black text-white font-mono-code text-xs font-bold border-2 border-black shadow-[3px_3px_0px_#b91c1c] hover:bg-[#b91c1c] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>VOLVER A LA PORTADA</span>
        </button>

        <span className="font-mono-code text-[11px] uppercase tracking-wider text-neutral-600 hidden sm:inline-block">
          Urrutia Kalea 1 • Indautxu
        </span>
      </div>

      {/* HEADER SECTION - ROCK FANZINE */}
      <div className="p-6 sm:p-10 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative tape-top space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block bg-[#b91c1c] text-white font-mono-code font-bold text-xs px-3 py-1 border-2 border-black rot-neg-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            GASTRONOMÍA ROCK // BILBAO
          </span>
          <span className="font-mono-code text-xs font-bold text-neutral-800 bg-white/80 px-2 py-0.5 border border-black">
            {info.kitchenHours}
          </span>
        </div>

        <h1 className="font-anton text-4xl sm:text-6xl lg:text-7xl text-black uppercase tracking-wider leading-[0.95]">
          {gastronomia.headline}
        </h1>
        <p className="font-sans text-neutral-800 text-base sm:text-lg max-w-3xl leading-relaxed">
          {gastronomia.subtext} En Grafit combinamos la tradición del bocado de barra vizcaíno con sándwiches tostados a la plancha, hamburguesas 100% buey seleccionadas y cañas bien tiradas.
        </p>
      </div>

      {/* BANNER DESTACADO PARA MENÚS DE GRUPOS */}
      <div className="p-6 sm:p-8 bg-[#fbf8f1] border-4 border-black shadow-[8px_8px_0px_#b91c1c] relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 border border-black uppercase font-bold rot-neg-1">
              <Users className="w-3.5 h-3.5" />
              <span>PROPUESTAS PARA GRUPOS Y CELEBRACIONES</span>
            </div>
            <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-wider text-black">
              ¿BUSCAS UN MENÚ CERRADO O PICOTEO COMPARTIDO?
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed">
              {gastronomia.gruposNota} Adaptamos tablas de hamburguesas cortadas, raciones calientes, pintxos y bebida según el tamaño de tu cuadrilla o encuentro de empresa en nuestro salón multiusos.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/contacto?tipo=comida-grupo')}
            className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider shrink-0 flex items-center justify-center gap-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
          >
            <span>CONSULTAR MENÚ DE GRUPO</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </div>

      {/* ESPECIALIDADES HABITUALES CON FOTOGRAFÍA REAL (EN COLOR Y MÁXIMO PROTAGONISMO) */}
      <div className="space-y-8">
        <div className="p-6 sm:p-7 bg-[#141210] border-4 border-black shadow-[6px_6px_0px_#b91c1c] text-[#f5efe1] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono-code text-xs font-bold text-[#e2c044] uppercase tracking-widest mb-1">
              // PRODUCTOS CONTRASTADOS DE NUESTRA COCINA
            </div>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
              ESPECIALIDADES DE LA CASA
            </h2>
          </div>
          <span className="font-mono-code text-xs text-[#e2c044]">
            ★ Fotografías reales tomadas en Grafit Café • Indautxu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gastronomia.dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row overflow-hidden group hover:border-[#b91c1c] transition-colors"
            >
              {dish.image && (
                <div className="sm:w-2/5 h-52 sm:h-auto border-b-4 sm:border-b-0 sm:border-r-4 border-black bg-neutral-900 shrink-0 overflow-hidden relative cursor-pointer" onClick={() => setInspectModal(dish.image ?? null)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {dish.badge && (
                    <div className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono-code text-[10px] px-2 py-0.5 border border-black uppercase font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      {dish.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-[11px] font-bold uppercase gap-1">
                    <Eye className="w-4 h-4 text-[#e2c044]" />
                    <span>AMPLIAR</span>
                  </div>
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-anton text-2xl uppercase tracking-wider text-black group-hover:text-[#b91c1c] transition-colors">
                    {dish.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between">
                  <span className="font-mono-code text-[11px] text-neutral-600 font-bold uppercase">
                    Picoteo y raciones
                  </span>
                  <button
                    onClick={() => onNavigate('/contacto?tipo=comida-grupo')}
                    className="text-xs font-mono-code font-bold text-black hover:text-[#b91c1c] inline-flex items-center gap-1 uppercase underline decoration-2 cursor-pointer"
                  >
                    Pedir para grupo →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATERING & PROPUESTAS GASTRONÓMICAS REALES DE GRAFIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 bg-black text-white border-4 border-black shadow-[8px_8px_0px_#b91c1c] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-block bg-[#b91c1c] text-white font-mono-code text-xs px-3 py-1 font-bold rot-neg-1">
              COCINA // INDAUTXU
            </div>
            <h3 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-white">
              SABOR AUTÉNTICO EN EL CORAZÓN DE BILBAO
            </h3>
            <p className="font-mono-code text-xs sm:text-sm text-neutral-300 leading-relaxed">
              En Grafit combinamos hamburguesas 100% buey seleccionadas, sándwiches tostados a la plancha, raciones para compartir y pintxos de barra. Una propuesta honesta y contundente pensada para disfrutar tanto en barra rápida como en mesas largas de cuadrilla en nuestro salón multiusos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-neutral-800">
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">01. HAMBURGUESAS</span>
              <span className="text-[11px] font-mono-code text-neutral-400">Carne 100% buey de primera calidad y pan brioche artesano.</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">02. PICOTEO Y RACIONES</span>
              <span className="text-[11px] font-mono-code text-neutral-400">Pintxos al día, sándwiches de plancha y tablas para compartir.</span>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-700">
              <span className="block font-anton text-[#e2c044] text-lg">03. GRUPOS</span>
              <span className="text-[11px] font-mono-code text-neutral-400">Bandejas y menús a medida sin rotación forzada de mesas.</span>
            </div>
          </div>
        </div>

        {/* FOTOGRAFÍA REAL DE BANDEJAS DE GRUPO (PROTAGONISTA) */}
        <div className="lg:col-span-5 bg-[#181615] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between group">
          <div className="relative aspect-[4/3] bg-black overflow-hidden cursor-pointer" onClick={() => setInspectModal('./assets/grafit/instagram/pintxos_eventos.webp')}>
            <img
              src="./assets/grafit/instagram/pintxos_eventos.webp"
              alt="Bandejas de catering y eventos en Grafit Café"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2.5 py-1 uppercase border border-black shadow">
              FOTOGRAFÍA REAL // BANDEJAS DE CATERING
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold uppercase gap-1.5">
              <Eye className="w-4 h-4 text-[#e2c044]" />
              <span>AMPLIAR FOTO REAL</span>
            </div>
          </div>

          <div className="p-4 bg-[#1f1d1b] border-t-2 border-[#2b2724] space-y-1">
            <span className="font-mono text-xs font-bold text-[#e2c044] uppercase block">
              ★ BANDEJAS Y CAZUELITAS PARA CELEBRACIONES
            </span>
            <p className="font-sans text-xs text-[#b8b0a2] leading-snug">
              Bandejas artesanales preparadas al momento para comidas de cuadrilla, cumpleaños y reuniones en el salón.
            </p>
          </div>
        </div>
      </div>


      {/* CIERRE A EVENTOS */}
      <div className="p-8 sm:p-12 bg-[#fbf8f1] border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] text-center space-y-6">
        <div className="inline-block bg-black text-white font-mono-code text-xs px-3 py-1 font-bold uppercase">
          RESERVAS DE GRUPO & PERSONALIZACIÓN
        </div>
        <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black max-w-3xl mx-auto">
          ¿TIENES UNA FECHA EN MENTE PARA TU ENCUENTRO?
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-800 max-w-2xl mx-auto leading-relaxed">
          Cuéntanos el número aproximado de asistentes y el estilo de comida que prefieres (hamburguesas, raciones para compartir o barra informal). Te preparamos una propuesta sin compromiso.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=comida-grupo')}
            className="px-8 py-4 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
          >
            <span>SOLICITAR PROPUESTA DE GRUPO</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('/espacio')}
            className="px-8 py-4 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
          >
            <span>VER EL SALÓN MULTIUSOS</span>
          </button>
        </div>
      </div>

      {/* MODAL INSPECTOR DE IMÁGENES */}
      {inspectModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setInspectModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#181615] border-4 border-black p-4 sm:p-6 shadow-[16px_16px_0_#b91c1c] text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2b2724]">
              <span className="font-mono text-xs font-bold text-[#e2c044] uppercase">
                DETALLE DE FOTOGRAFÍA // GASTRONOMÍA REAL
              </span>
              <button
                onClick={() => setInspectModal(null)}
                className="p-1 bg-black hover:bg-[#b91c1c] text-white border border-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-black border-2 border-[#2b2724] overflow-hidden flex items-center justify-center">
              <img
                src={inspectModal}
                alt="Detalle gastronómico"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
