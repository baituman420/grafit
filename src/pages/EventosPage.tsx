import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Users, Calendar, ArrowRight, Utensils, Sparkles, MessageSquare, Phone } from 'lucide-react';

interface EventosPageProps {
  onNavigate: (path: string) => void;
}

export const EventosPage: React.FC<EventosPageProps> = ({ onNavigate }) => {
  const { eventos, info, historiaProgression } = GRAFIT_DATA;
  const historySnippet = historiaProgression[2] || historiaProgression[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-16">
      {/* HEADER SECTION */}
      <div className="text-center md:text-left space-y-4">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1 border border-black">
          // EXPERIENCIAS & CELEBRACIONES DE GRUPO
        </div>
        <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
          {eventos.headline}
        </h1>
        <p className="font-sans text-neutral-800 text-base sm:text-lg max-w-3xl leading-relaxed">
          {eventos.subtext}
        </p>

        {/* CTA RAPIDO HEADER */}
        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-6 py-3 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>CONSULTAR DISPONIBILIDAD</span>
          </button>
          <button
            onClick={() => onNavigate('/espacio')}
            className="px-6 py-3 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>VER EL SALÓN & LA FURGONETA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventos.valueProps.map((prop, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#fbf8f1] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="absolute -top-3 left-4 bg-black text-white font-mono-code text-xs px-2 py-0.5 border border-black">
              0{idx + 1}
            </div>
            <h3 className="font-anton text-xl uppercase tracking-wider text-black mt-2 mb-2">
              {prop.title}
            </h3>
            <p className="font-sans text-sm text-neutral-700 leading-relaxed">
              {prop.desc}
            </p>
          </div>
        ))}
      </div>

      {/* TIPOLOGÍAS DE EVENTOS */}
      <div className="space-y-8">
        <div className="border-b-4 border-black pb-3">
          <div className="font-mono-code text-xs font-bold text-neutral-600 uppercase tracking-widest">
            // FORMATOS HABITUALES
          </div>
          <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
            ¿QUÉ TIPO DE ENCUENTRO ESTÁS PREPARANDO?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventos.tipologias.map((tipo) => (
            <div
              key={tipo.id}
              className="bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden"
            >
              {/* IMAGE HEADER */}
              <div className="relative h-56 sm:h-64 border-b-3 border-black overflow-hidden bg-neutral-900">
                <img
                  src={tipo.image}
                  alt={tipo.title}
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono-code text-xs px-2.5 py-0.5 border border-black font-bold">
                  {tipo.badge}
                </div>
              </div>

              {/* BODY */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                    {tipo.title}
                  </h3>
                  <p className="font-mono-code text-xs font-bold text-[#b91c1c] uppercase">
                    {tipo.subtitle}
                  </p>
                  <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                    {tipo.description}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-black/20 space-y-3">
                  <div className="font-mono-code text-xs text-neutral-700">
                    <span className="font-bold text-black uppercase">Pensado para: </span>
                    {tipo.idealFor}
                  </div>

                  <button
                    onClick={() => onNavigate('/contacto')}
                    className="w-full py-2.5 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>CONSULTAR ESTE FORMATO</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GASTRONOMÍA ASOCIADA A EVENTOS */}
      <div className="bg-[#fbf8f1] border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <div className="font-mono-code text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
              // COCINA NON-STOP & FORMATOS COMPARTIDOS
            </div>
            <h2 className="font-anton text-3xl uppercase tracking-wider text-black">
              UNA PROPUESTA CULINARIA SIN PRISAS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/carta')}
            className="px-4 py-2 bg-white text-black hover:bg-black hover:text-white border-2 border-black font-anton text-sm uppercase tracking-wider shrink-0 transition-colors"
          >
            VER CARTA COMPLETA
          </button>
        </div>

        <p className="font-sans text-neutral-800 text-base leading-relaxed">
          {GRAFIT_DATA.gastronomia.gruposNota}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white border-2 border-black">
            <h4 className="font-anton text-lg uppercase text-black mb-1">Picoteo Informal</h4>
            <p className="font-mono-code text-xs text-neutral-700">
              Pintxos de barra, tortilla jugosa recién cuajada y raciones calientes para comer de pie o en mesas altas.
            </p>
          </div>
          <div className="p-4 bg-white border-2 border-black">
            <h4 className="font-anton text-lg uppercase text-black mb-1">Burger & Caserío</h4>
            <p className="font-mono-code text-xs text-neutral-700">
              Nuestras burgers 100% buey y platos contundentes para sentarse a la mesa con cerveza de tanque fría.
            </p>
          </div>
          <div className="p-4 bg-white border-2 border-black">
            <h4 className="font-anton text-lg uppercase text-black mb-1">Menús Personalizados</h4>
            <p className="font-mono-code text-xs text-neutral-700">
              Opciones acordadas previamente para cuadrillas y empresas con necesidades o preferencias específicas.
            </p>
          </div>
        </div>
      </div>

      {/* NARRATIVA DE IDENTIDAD INTEGRADA */}
      {historySnippet && (
        <div className="bg-black text-white p-6 sm:p-8 border-4 border-black shadow-[6px_6px_0px_#b91c1c] flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 shrink-0 h-44 border-2 border-white/20 overflow-hidden">
            <img
              src={historySnippet.image || './assets/grafit/interior/grafit-barra-01.jpg'}
              alt={historySnippet.title}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="space-y-2">
            <div className="font-mono-code text-xs text-[#b91c1c] uppercase tracking-widest">
              // {historySnippet.context}
            </div>
            <h3 className="font-anton text-2xl uppercase tracking-wider text-white">
              {historySnippet.title}
            </h3>
            <blockquote className="font-serif italic text-sm text-neutral-300 border-l-2 border-[#b91c1c] pl-3 my-2">
              «{historySnippet.quote}»
            </blockquote>
            <p className="font-mono-code text-xs text-neutral-400">
              En Grafit, las generaciones conviven: la misma energía de siempre, adaptada a la comodidad que tu evento merece.
            </p>
          </div>
        </div>
      )}

      {/* CIERRE COMERCIAL DIRECTO */}
      <div className="p-8 bg-[#f4eedd] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center space-y-4">
        <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wider text-black">
          ¿HABLÁIS DE FECHAS?
        </h2>
        <p className="font-sans text-neutral-800 text-base max-w-2xl mx-auto">
          Cuéntanos el número aproximado de personas y qué idea tenéis. Te respondemos con las opciones disponibles y te orientamos sobre la mejor distribución.
        </p>

        <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={() => onNavigate('/contacto')}
            className="px-8 py-3.5 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-xl uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <span>PEDIR PRESUPUESTO & DISPONIBILIDAD</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href={`tel:${info.phone}`}
            className="px-6 py-3.5 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <Phone className="w-5 h-5 text-[#b91c1c]" />
            <span>{info.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
