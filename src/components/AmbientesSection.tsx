import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Coffee, Users, ArrowRight } from 'lucide-react';

interface AmbientesSectionProps {
  onNavigate: (path: string) => void;
}

export const AmbientesSection: React.FC<AmbientesSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b-4 border-black">
      <div className="space-y-4 mb-8">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono-code text-xs uppercase tracking-widest rot-neg-1 border border-black">
          // DOS ESPACIOS CONECTADOS
        </div>
        <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wider text-black">
          DOS AMBIENTES, UNA MISMA ESENCIA
        </h2>
        <p className="font-sans text-neutral-800 text-sm sm:text-base max-w-2xl leading-relaxed">
          En Grafit conviven el pulso diario de Indautxu con la tranquilidad que requieren las celebraciones grupales. Dos espacios complementarios sin etiquetas ni barreras de edad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AMBIENTE 1: LA BARRA */}
        <div className="bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden">
          <div className="h-56 border-b-3 border-black overflow-hidden bg-neutral-900">
            <img
              src="./assets/grafit/interior/grafit-barra-01.jpg"
              alt="La Barra de Grafit Café"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#b91c1c]" />
                <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                  LA BARRA & ZONA DE ENTRADA
                </h3>
              </div>
              <div className="inline-block bg-black text-white font-mono-code text-xs px-2 py-0.5 uppercase">
                Encuentro casual, tapeo y bienvenida
              </div>
              <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                Dinámica, cercana y con acceso directo a Urrutia Kalea. El punto para el cortado de primera hora, los pintxos recién salidos y las cañas heladas de cerveza de tanque en ambiente distendido.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black/20 font-mono-code text-xs text-neutral-700">
              Ideal para paradas espontáneas, previas de partido y vermús de fin de semana.
            </div>
          </div>
        </div>

        {/* AMBIENTE 2: EL GRAN SALÓN MULTIUSOS */}
        <div className="bg-[#f4eedd] border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-hidden">
          <div className="h-56 border-b-3 border-black overflow-hidden bg-neutral-900">
            <img
              src="./assets/grafit/interior/grafit-salon-mesas-03.jpg"
              alt="Salón Multiusos de Grafit Café"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#b91c1c]" />
                <h3 className="font-anton text-2xl uppercase tracking-wider text-black">
                  EL GRAN SALÓN MULTIUSOS
                </h3>
              </div>
              <div className="inline-block bg-black text-white font-mono-code text-xs px-2 py-0.5 uppercase">
                Eventos, grupos amplios y sobremesas
              </div>
              <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                Un espacio amplio y resguardado para disfrutar sin interrupciones. Diseñado para acoger desde mesas largas para comidas de cuadrilla hasta formatos cóctel con la furgoneta Volkswagen como icono.
              </p>
            </div>

            <div className="pt-3 border-t-2 border-black/20 flex items-center justify-between">
              <span className="font-mono-code text-xs text-neutral-700">
                Reserva adaptable para grupos.
              </span>
              <button
                onClick={() => onNavigate('/espacio')}
                className="font-mono-code text-xs font-bold text-[#b91c1c] uppercase hover:underline flex items-center gap-1"
              >
                <span>VER ESPACIO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
