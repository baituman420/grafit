import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Calendar, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface CierreComercialSectionProps {
  onNavigate: (path: string) => void;
}

export const CierreComercialSection: React.FC<CierreComercialSectionProps> = ({ onNavigate }) => {
  const { info } = GRAFIT_DATA;

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#0c0b0a] text-[#f5efe1] border-b-8 border-black">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#181615] border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0_#000] text-center space-y-6 relative overflow-hidden">
          
          <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0_#000]">
            // PLANIFICA TU CELEBRACIÓN EN INDAUTXU
          </div>

          <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wider text-[#f5efe1] leading-tight">
            ¿Preparando una Comida de Grupo o Celebración?
          </h2>

          <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] max-w-2xl mx-auto leading-relaxed">
            El salón multiusos de Grafit y nuestra cocina continua están a vuestra disposición. Explícanos qué tipo de encuentro tenéis en mente, la fecha aproximada y el número estimado de asistentes: te responderemos con opciones y disponibilidad.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => onNavigate('/contacto?tipo=evento')}
              className="w-full sm:w-auto px-8 py-4 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              <span>★ SOLICITAR DISPONIBILIDAD ★</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('/eventos')}
              className="w-full sm:w-auto px-6 py-4 bg-[#f5efe1] hover:bg-white text-black font-['Anton'] text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <span>VER GUÍA DE EVENTOS</span>
            </button>
          </div>

          <div className="pt-6 border-t border-[#2b2724] flex flex-wrap justify-center items-center gap-6 font-mono text-xs text-[#9c9488]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#e2c044]" />
              <span className="text-[#ded8cb]">{info.address} • {info.neighborhood} ({info.city})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
              <span>A 3 min de Metro Indautxu</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
