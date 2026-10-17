import React from 'react';
import { Coffee, Users, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

interface AmbientesSectionProps {
  onNavigate: (path: string) => void;
}

export const AmbientesSection: React.FC<AmbientesSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-[#100e0d] text-[#f5efe1] border-b-8 border-black overflow-hidden">
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

        {/* DUAL COMPOSITION SPREAD (DIPTYCH) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* LADO A: LA BARRA DE INDAUTXU */}
          <div className="relative bg-[#181615] border-3 border-[#33302c] shadow-[8px_8px_0_#000] flex flex-col justify-between overflow-hidden group">
            {/* PHOTO WITH VIGNETTE */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-black border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/interior/grafit-barra-01.jpg"
                alt="La Barra del Grafit Café"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-black/90 text-[#e2c044] font-mono text-[11px] font-bold px-3 py-1 uppercase border border-[#e2c044] shadow-[3px_3px_0_#000]">
                LADO A • LA BARRA
              </div>
              <div className="absolute bottom-2 left-3 right-3 bg-black/85 text-[#f5efe1] font-mono text-[10px] p-2 border border-[#33302c]">
                ★ MURAL DE DISCOS DE VINILO • CAÑÓN DE CERVEZA A -2°C • PINTXOS AL DÍA
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#e2c044]">
                  <Coffee className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    PULSO DE BARRIO & ATHLETIC
                  </span>
                </div>
                <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#f5efe1]">
                  El Encuentro Espontáneo
                </h3>
                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
                  Cercana, luminosa y con acceso directo a Urrutia Kalea. El punto neurálgico del cortado matinal, el picoteo de mediodía, las cañas heladas de cerveza de tanque y el ambiente zurigorri en las previas de partido hacia San Mamés.
                </p>
              </div>

              <div className="pt-4 border-t border-[#262320] flex items-center justify-between text-xs font-mono">
                <span className="text-[#9c9488]">Sin reserva previa</span>
                <span className="text-[#e2c044] font-bold">Servicio continuo</span>
              </div>
            </div>
          </div>

          {/* LADO B: EL SALÓN MULTIUSOS */}
          <div className="relative bg-[#181615] border-3 border-neutral-800 hover:border-[#b91c1c] transition-colors shadow-[8px_8px_0_#000] flex flex-col justify-between overflow-hidden group">
            {/* PHOTO WITH VIGNETTE */}
            <div className="relative h-64 sm:h-72 overflow-hidden bg-black border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/interior/grafit-salon-mesas-11.jpg"
                alt="El Salón Multiusos para Grupos"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[11px] font-bold px-3 py-1 uppercase border border-black shadow-[3px_3px_0_#000]">
                LADO B • EL SALÓN
              </div>
              <div className="absolute bottom-2 left-3 right-3 bg-black/85 text-[#f5efe1] font-mono text-[10px] p-2 border border-[#33302c]">
                ★ MEDIA VOLKSWAGEN • MURAL DE CONCIERTO • MESAS MODULARES PARA GRUPOS
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#b91c1c]">
                  <Users className="w-5 h-5 shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    GRUPOS, EVENTOS & SOBREMESAS
                  </span>
                </div>
                <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wide text-[#f5efe1]">
                  La Celebración Privada
                </h3>
                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
                  Un salón amplio y diáfano para disfrutar a vuestro propio ritmo sin prisas ni rotación forzada de mesas. Diseñado para acoger comidas de cuadrilla, aniversarios, presentaciones o encuentros familiares en un entorno singular.
                </p>
              </div>

              <div className="pt-4 border-t border-[#262320] flex items-center justify-between">
                <button
                  onClick={() => onNavigate('/contacto?tipo=evento')}
                  className="px-4 py-2 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-xs uppercase tracking-wider border border-black shadow-[3px_3px_0_#000] cursor-pointer transition-transform hover:-translate-y-0.5"
                >
                  ★ RESERVAR SALÓN ★
                </button>
                <button
                  onClick={() => onNavigate('/espacio')}
                  className="font-mono text-xs font-bold text-[#f5efe1] hover:text-[#b91c1c] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>MÁS DETALLES</span>
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
