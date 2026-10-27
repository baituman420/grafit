import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Users, Calendar, ArrowRight, Utensils, CheckCircle2, Info, Sparkles } from 'lucide-react';

interface EventosPageProps {
  onNavigate: (path: string) => void;
}

export const EventosPage: React.FC<EventosPageProps> = ({ onNavigate }) => {
  const { eventos } = GRAFIT_DATA;

  return (
    <div className="relative w-full bg-[#0c0b0a] text-[#f5efe1] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 space-y-16 max-w-6xl mx-auto overflow-hidden">
      {/* AUTHENTIC PUNK WALLPAPER SUBSTRATE */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/grafit/punk-wall-bg.jpg')` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(12,11,10,0.95) 0%, rgba(16,14,12,0.80) 50%, rgba(12,11,10,0.95) 100%)',
        }}
      />
      <div className="relative z-10 space-y-16">
      {/* 1. HEADER SECTION */}
      <div className="space-y-4">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0_#000]">
          // EL ESPACIO PARA TUS CELEBRACIONES
        </div>
        <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-wider text-[#f5efe1] leading-tight">
          Eventos y Comidas de Grupo con Identidad en Indautxu
        </h1>
        <p className="font-['Space_Grotesk'] text-base sm:text-lg text-[#ded8cb] max-w-3xl leading-relaxed">
          Reúne a tu cuadrilla, celebra un cumpleaños o planifica un encuentro de empresa en un salón diáfano y versátil con barra propia y opciones de picoteo y menús adaptados para grupos.
        </p>

        {/* CTA RAPIDO HEADER */}
        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-6 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>SOLICITAR DISPONIBILIDAD DE FECHA</span>
          </button>
          <button
            onClick={() => onNavigate('/espacio')}
            className="px-6 py-3.5 bg-[#181615] hover:bg-[#222] text-[#e2c044] font-mono text-xs font-bold uppercase border border-[#e2c044] shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>CONOCE EL SALÓN Y LA VOLKSWAGEN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#181615] border-2 border-[#33302c] shadow-[6px_6px_0_#000] relative space-y-3">
          <span className="font-mono text-xs font-bold text-[#e2c044] bg-black/80 px-2 py-0.5 border border-[#33302c]">
            01 • VERSATILIDAD
          </span>
          <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
            Distribución Sin Rigideces
          </h3>
          <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
            Mesas largas configurables para sentarse a comer o espacios abiertos estilo cóctel para moverse libremente.
          </p>
        </div>

        <div className="p-6 bg-[#181615] border-2 border-[#33302c] shadow-[6px_6px_0_#000] relative space-y-3">
          <span className="font-mono text-xs font-bold text-[#b91c1c] bg-black/80 px-2 py-0.5 border border-[#33302c]">
            02 • PROPUESTAS A MEDIDA
          </span>
          <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
            Gastronomía y Picoteo
          </h3>
          <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
            Hamburguesas 100% buey, sándwiches artesanos, tablas de picoteo y cañas bien tiradas adaptadas al formato de tu grupo.
          </p>
        </div>

        <div className="p-6 bg-[#181615] border-2 border-[#33302c] shadow-[6px_6px_0_#000] relative space-y-3">
          <span className="font-mono text-xs font-bold text-[#16a34a] bg-black/80 px-2 py-0.5 border border-[#33302c]">
            03 • UBICACIÓN
          </span>
          <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
            El Centro de Indautxu
          </h3>
          <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
            Urrutia Kalea 1, a 3 minutos del metro y en el corazón social de Bilbao. Máxima facilidad de acceso para tus invitados.
          </p>
        </div>
      </div>

      {/* 3. TIPOLOGÍAS DE EVENTOS */}
      <div className="space-y-8">
        <div className="border-b-2 border-[#33302c] pb-3">
          <div className="font-mono text-xs font-bold text-[#e2c044] uppercase tracking-widest">
            // FORMATOS HABITUALES
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
            ¿Qué Tipo de Encuentro Estás Organizando?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventos.tipologias.map((tipo) => (
            <div
              key={tipo.id}
              className="bg-[#181615] border-3 border-[#33302c] shadow-[8px_8px_0_#000] flex flex-col justify-between overflow-hidden"
            >
              <div className="relative h-60 overflow-hidden bg-black border-b border-[#2b2724]">
                <img
                  src={tipo.image}
                  alt={tipo.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[11px] font-bold px-2.5 py-0.5 border border-black uppercase shadow">
                  {tipo.badge}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-['Anton'] text-2xl uppercase tracking-wider text-[#f5efe1]">
                    {tipo.title}
                  </h3>
                  <p className="font-mono text-xs font-bold text-[#e2c044] uppercase">
                    {tipo.subtitle}
                  </p>
                  <p className="font-['Space_Grotesk'] text-sm text-[#ded8cb] leading-relaxed">
                    {tipo.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2a2623] space-y-3">
                  <div className="font-mono text-xs text-[#9c9488]">
                    <span className="font-bold text-[#ded8cb] uppercase">Ideal para: </span>
                    {tipo.idealFor}
                  </div>

                  <button
                    onClick={() => onNavigate(`/contacto?tipo=${tipo.id}`)}
                    className="w-full py-2.5 bg-[#1f1d1b] hover:bg-[#b91c1c] text-white border border-[#444] font-['Anton'] text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
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

      {/* 4. GASTRONOMÍA ASOCIADA A EVENTOS */}
      <div className="bg-[#141312] border-3 border-[#e2c044] p-6 sm:p-10 shadow-[8px_8px_0_#000] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2b2724] pb-4">
          <div>
            <div className="font-mono text-xs font-bold text-[#b91c1c] uppercase tracking-wider">
              // GASTRONOMÍA & FORMATOS COMPARTIDOS
            </div>
            <h2 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wider text-[#f5efe1]">
              Una Propuesta Gastronómica Real
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/carta')}
            className="px-5 py-2.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-xs sm:text-sm uppercase tracking-wider border border-black shadow-[3px_3px_0_#000] transition-colors cursor-pointer self-start md:self-auto"
          >
            VER CARTA COMPLETA
          </button>
        </div>

        <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
          {GRAFIT_DATA.gastronomia.gruposNota}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#1a1816] border border-[#33302c]">
            <h4 className="font-['Anton'] text-base uppercase text-[#f5efe1] mb-1">Picoteo y Barra</h4>
            <p className="font-mono text-xs text-[#a39b8e] leading-relaxed">
              Barra de pintxos artesanos, raciones calientes de plancha y tablas para compartir de pie o sentado.
            </p>
          </div>
          <div className="p-4 bg-[#1a1816] border border-[#33302c]">
            <h4 className="font-['Anton'] text-base uppercase text-[#f5efe1] mb-1">Burger 100% Buey & Plancha</h4>
            <p className="font-mono text-xs text-[#a39b8e] leading-relaxed">
              Carne seleccionada de primera calidad, queso fundido, bacon crujiente y pan rústico con caña fría.
            </p>
          </div>
          <div className="p-4 bg-[#1a1816] border border-[#33302c]">
            <h4 className="font-['Anton'] text-base uppercase text-[#f5efe1] mb-1">Menús a Medida</h4>
            <p className="font-mono text-xs text-[#a39b8e] leading-relaxed">
              Opciones acordadas previamente para cuadrillas y empresas según preferencias y necesidades concretas.
            </p>
          </div>
        </div>
      </div>

      {/* 5. AVISO DE TRANSPARENCIA */}
      <div className="p-5 bg-[#181615] border-2 border-amber-600/70 text-amber-200 font-mono text-xs flex items-start gap-3 shadow-[4px_4px_0_#000]">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block uppercase mb-1">Compromiso de Honestidad y Reserva:</strong>
          La solicitud enviada a través de la web no constituye una reserva confirmada de forma inmediata. Nuestro equipo revisará la disponibilidad de la fecha y contactará directamente contigo para detallar las opciones de distribución y menú del salón sin compromisos.
        </div>
      </div>

      {/* 6. CIERRE COMERCIAL DIRECTO */}
      <div className="p-8 sm:p-10 bg-[#181615] border-4 border-[#b91c1c] shadow-[10px_10px_0_#000] text-center space-y-4">
        <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
          ¿Hablamos de Fechas para tu Grupo?
        </h2>
        <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] max-w-2xl mx-auto leading-relaxed">
          Cuéntanos el número aproximado de personas y qué formato tenéis en mente. Te orientamos sobre disponibilidad y configuramos el salón a vuestra medida.
        </p>

        <div className="pt-3 flex justify-center">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-8 py-4 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-base uppercase tracking-wider border-2 border-black shadow-[5px_5px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <Calendar className="w-5 h-5" />
            <span>SOLICITAR DISPONIBILIDAD SIN COMPROMISO</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
