import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Calendar, Phone, ArrowRight, MessageSquare, MapPin } from 'lucide-react';

interface CierreComercialSectionProps {
  onNavigate: (path: string) => void;
}

export const CierreComercialSection: React.FC<CierreComercialSectionProps> = ({ onNavigate }) => {
  const { info } = GRAFIT_DATA;

  return (
    <section className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#f4eedd] border-4 border-black p-8 sm:p-12 shadow-[10px_10px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1 border border-black">
            // RESERVAS & GRUPOS INDAUTXU
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl uppercase tracking-wider text-black">
            ¿PLANIFICANDO UNA CELEBRACIÓN O REUNIÓN?
          </h2>

          <p className="font-sans text-neutral-800 text-base sm:text-lg leading-relaxed">
            El salón multiusos de Grafit y nuestra cocina non-stop están a tu disposición. Dinos cuántos sois y qué formato tienes en mente: te orientamos sin compromiso sobre la mejor distribución.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('/contacto')}
              className="px-8 py-4 bg-black text-white hover:bg-[#b91c1c] border-2 border-black font-anton text-xl uppercase tracking-wider flex items-center gap-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>CONSULTAR DISPONIBILIDAD</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={`tel:${info.phone}`}
              className="px-6 py-4 bg-white text-black hover:bg-neutral-100 border-2 border-black font-anton text-lg uppercase tracking-wider flex items-center gap-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#b91c1c]" />
              <span>{info.phone}</span>
            </a>
          </div>

          <div className="pt-6 border-t-2 border-black/20 flex flex-wrap justify-center items-center gap-6 font-mono-code text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b91c1c]" />
              <span>{info.address} • {info.neighborhood} ({info.city})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{info.kitchenHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
