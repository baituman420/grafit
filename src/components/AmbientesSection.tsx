import React from 'react';
import { Coffee, Users, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface AmbientesSectionProps {
  onNavigate: (path: string) => void;
}

export const AmbientesSection: React.FC<AmbientesSectionProps> = ({ onNavigate }) => {
  return (
    <section id="ambientes-section" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#100e0d] text-[#f5efe1] border-b-8 border-black overflow-hidden">
      {/* AUTHENTIC PUNK WALLPAPER SUBSTRATE (DARK TREATMENT) */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/grafit/punk-wall-bg.jpg')` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(12,11,10,0.95) 0%, rgba(16,14,12,0.75) 50%, rgba(12,11,10,0.95) 100%)',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs uppercase tracking-widest mb-3 shadow-[3px_3px_0_#000]">
            // DOS ESPACIOS CONECTADOS
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wider text-[#f5efe1] leading-tight">
            Dos Ambientes, Una Misma Esencia
          </h2>
          <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] mt-2 leading-relaxed">
            En Grafit conviven el latido cotidiano del barrio y la privacidad que exigen las celebraciones de grupo. Dos espacios complementarios sin rigideces ni barreras generacionales.
          </p>
        </div>

        {/* DUAL COMPOSITION SPREAD (DIPTYCH - LARGE PHOTOGRAPHIC FORMAT) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* LADO A: LA BARRA DE INDAUTXU */}
          <div className="relative bg-[#181615] border-3 border-[#33302c] hover:border-[#e2c044] transition-colors shadow-[8px_8px_0_#000] flex flex-col justify-between overflow-hidden group">
            {/* LARGE FORMAT PHOTOGRAPHIC CANVAS */}
            <div className="relative h-72 sm:h-88 md:h-96 overflow-hidden bg-black border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/instagram/ambiente_barra.webp"
                alt="Ambiente real en la barra de Grafit Café"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-black/90 text-[#e2c044] font-mono text-xs font-bold px-3 py-1 uppercase border border-[#e2c044] shadow-[3px_3px_0_#000]">
                LADO A • LA BARRA
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-[#f5efe1]">
                <p className="font-mono text-xs text-[#e2c044] font-bold tracking-wider uppercase drop-shadow">
                  URRUTIA KALEA 1 • INDAUTXU
                </p>
                <p className="font-['Anton'] text-xl sm:text-2xl uppercase tracking-wide drop-shadow-md">
                  El Pulso Cotidiano & Encuentro
                </p>
              </div>
            </div>

            {/* EDITORIAL DETAILS */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#e2c044]">
                  <Coffee className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    CAFÉ, PINTXOS & PREVIAS DEL ATHLETIC
                  </span>
                </div>
                <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#f5efe1]">
                  La Barra de Siempre
                </h3>
                <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] leading-relaxed">
                  Cercana, luminosa y con acceso directo a Urrutia Kalea. El punto neurálgico para el café matinal, el picoteo de mediodía, las cañas bien tiradas y el ambiente zurigorri en las previas de partido rumbo a San Mamés.
                </p>
              </div>

              <div className="pt-4 border-t border-[#262320] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#9c9488]">Acceso libre • Sin reserva</span>
                <span className="text-[#e2c044] font-bold">Pintxos, gildas y raciones al día</span>
              </div>
            </div>
          </div>

          {/* LADO B: EL SALÓN MULTIUSOS */}
          <div className="relative bg-[#181615] border-3 border-[#33302c] hover:border-[#b91c1c] transition-colors shadow-[8px_8px_0_#000] flex flex-col justify-between overflow-hidden group">
            {/* LARGE FORMAT PHOTOGRAPHIC CANVAS */}
            <div className="relative h-72 sm:h-88 md:h-96 overflow-hidden bg-black border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/instagram/621137527_18159238840410802_2351787220592329803_n.jpg"
                alt="Cuadrillas y celebraciones reales en el salón de Grafit Café"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
              
              <div className="absolute top-4 left-4 bg-[#b91c1c] text-white font-mono text-xs font-bold px-3 py-1 uppercase border border-black shadow-[3px_3px_0_#000]">
                LADO B • EL SALÓN
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-[#f5efe1]">
                <p className="font-mono text-xs text-[#e2c044] font-bold tracking-wider uppercase drop-shadow">
                  ESPACIO DIÁFANO • HASTA 50 PERSONAS
                </p>
                <p className="font-['Anton'] text-xl sm:text-2xl uppercase tracking-wide drop-shadow-md">
                  Celebraciones de Grupo & Privacidad
                </p>
              </div>
            </div>

            {/* EDITORIAL DETAILS */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#b91c1c]">
                  <Users className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    CUADRILLAS, ANIVERSARIOS & EMPRESAS
                  </span>
                </div>
                <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#f5efe1]">
                  El Salón para Grupos
                </h3>
                <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] leading-relaxed">
                  Un salón amplio y versátil para disfrutar a vuestro ritmo sin prisas ni rotación forzada de mesas. Diseñado para acoger comidas de cuadrilla, cumpleaños, presentaciones y encuentros familiares con menús y raciones a medida.
                </p>
              </div>

              <div className="pt-4 border-t border-[#262320] flex items-center justify-between gap-4">
                <button
                  onClick={() => onNavigate('/contacto?tipo=evento')}
                  className="px-4 py-2.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-xs uppercase tracking-wider border border-black shadow-[3px_3px_0_#000] cursor-pointer transition-transform hover:-translate-y-0.5"
                >
                  ★ RESERVAR SALÓN ★
                </button>
                <button
                  onClick={() => onNavigate('/espacio')}
                  className="font-mono text-xs font-bold text-[#f5efe1] hover:text-[#e2c044] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>VER DETALLES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
