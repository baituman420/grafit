import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { InteractiveDraggableGallery } from '../components/InteractiveDraggableGallery';
import { ArrowRight, MapPin, Sparkles, CheckCircle2, Music2, Users, Coffee } from 'lucide-react';

interface EspacioPageProps {
  onNavigate: (path: string) => void;
}

export const EspacioPage: React.FC<EspacioPageProps> = ({ onNavigate }) => {
  const { espacio } = GRAFIT_DATA;

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
      {/* 1. HEADER PAGE */}
      <div className="space-y-4">
        <div className="inline-block bg-[#b91c1c] text-white px-3 py-1 font-mono text-xs uppercase tracking-widest shadow-[3px_3px_0_#000]">
          // ARQUITECTURA, SALÓN & MEMORIA ROCK
        </div>
        <h1 className="font-['Anton'] text-4xl sm:text-6xl uppercase tracking-wider text-[#f5efe1] leading-tight">
          Descubre el Espacio de Grafit
        </h1>
        <p className="font-['Space_Grotesk'] text-base sm:text-lg text-[#ded8cb] max-w-3xl leading-relaxed">
          Un establecimiento singular en Indautxu donde conviven el dinamismo de la barra tradicional con la versatilidad de un amplio salón multiusos decorado con historia musical y la icónica media furgoneta Volkswagen.
        </p>

        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-6 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm sm:text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>RESERVAR ZONA PARA MI GRUPO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/eventos')}
            className="px-6 py-3.5 bg-[#181615] hover:bg-[#222] text-[#e2c044] font-mono text-xs font-bold uppercase border border-[#e2c044] shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>VER FORMATOS DE CELEBRACIONES</span>
          </button>
        </div>
      </div>

      {/* 2. REAL VENUE INSTALLATIONS PROTAGONIST (AMPLITUD, MESAS, BARRA & FACHADA) */}
      <div className="space-y-8">
        <div className="border-b-2 border-[#33302c] pb-3">
          <div className="font-mono text-xs font-bold text-[#b91c1c] uppercase tracking-widest">
            // INSTALACIONES REALES DEL LOCAL
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wider text-[#f5efe1]">
            Amplitud, Salón y Esencia de Barra en Indautxu
          </h2>
          <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] mt-1 max-w-3xl leading-relaxed">
            Dos zonas conectadas diseñadas para vivirse sin rigideces: la barra luminosa de acceso directo y el salón interior diáfano para celebraciones privadas y comidas de cuadrilla.
          </p>
        </div>

        {/* 3 INSTALLATION HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* CARD 1: SALÓN MULTIUSOS */}
          <div className="bg-[#181615] border-3 border-[#33302c] hover:border-[#b91c1c] transition-colors shadow-[6px_6px_0_#000] flex flex-col justify-between overflow-hidden group">
            <div className="relative aspect-[4/3] bg-black overflow-hidden border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/instagram/621137527_18159238840410802_2351787220592329803_n.jpg"
                alt="Amplitud y mesas para grupos en el salón de Grafit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#b91c1c] text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-black uppercase shadow">
                EL SALÓN MULTIUSOS
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
                  Amplitud y Mesas Modulares
                </h3>
                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
                  Espacio interior con capacidad para grupos de 10 a 50 personas. Mesas corridas que se adaptan a comidas sentadas o formato cóctel dinámico sin turnos impuestos.
                </p>
              </div>
              <div className="pt-2 border-t border-[#262320] font-mono text-[11px] text-[#e2c044] font-bold">
                Hasta 50 comensales • Sin coste de sala
              </div>
            </div>
          </div>

          {/* CARD 2: LA BARRA */}
          <div className="bg-[#181615] border-3 border-[#33302c] hover:border-[#e2c044] transition-colors shadow-[6px_6px_0_#000] flex flex-col justify-between overflow-hidden group">
            <div className="relative aspect-[4/3] bg-black overflow-hidden border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/instagram/ambiente_barra.webp"
                alt="Ambiente de barra en Urrutia Kalea 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/90 text-[#e2c044] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#e2c044] uppercase shadow">
                LA BARRA DE URRUTIA
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
                  Punto de Encuentro Cotidiano
                </h3>
                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
                  Mostrador de pintxos al día, tortillas recién preparadas y cañas bien tiradas en un entorno luminoso y cercano con pulso de barrio y ambiente Athletic.
                </p>
              </div>
              <div className="pt-2 border-t border-[#262320] font-mono text-[11px] text-[#e2c044] font-bold">
                Acceso libre • Previas de partido
              </div>
            </div>
          </div>

          {/* CARD 3: FACHADA NEGRA */}
          <div className="bg-[#181615] border-3 border-[#33302c] hover:border-neutral-400 transition-colors shadow-[6px_6px_0_#000] flex flex-col justify-between overflow-hidden group">
            <div className="relative aspect-[4/3] bg-black overflow-hidden border-b-2 border-[#2b2724]">
              <img
                src="./assets/grafit/exterior/grafit-fachada-negra.jpg"
                alt="Fachada negra de Grafit Café en Urrutia Kalea 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-neutral-700 uppercase shadow">
                FACHADA INDAUTXU
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="font-['Anton'] text-xl uppercase tracking-wider text-[#f5efe1]">
                  Identidad Exterior Sobria
                </h3>
                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-relaxed">
                  La emblemática fachada negra de Grafit en Urrutia Kalea 1. Una presencia reconocible en Indautxu, a escasos pasos de la estación de metro y la plaza.
                </p>
              </div>
              <div className="pt-2 border-t border-[#262320] font-mono text-[11px] text-[#ded8cb] font-bold">
                Urrutia Kalea 1 • Bilbao
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2B. ARTISTIC COMPLEMENTS: LA MEDIA VOLKSWAGEN & MURALES */}
      <div className="bg-[#141210] border-3 border-[#33302c] p-6 sm:p-10 shadow-[8px_8px_0_#000]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block bg-black text-[#e2c044] px-3 py-1 font-mono text-xs uppercase tracking-wider border border-[#e2c044]">
              // COMPLEMENTO ARTÍSTICO DEL SALÓN
            </div>
            <h2 className="font-['Anton'] text-2xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
              Frontal Volkswagen y Murales de Sala
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
              Integrada en la pared de ladrillo visto del salón interior, la media Volkswagen roja y blanca convive con murales de concierto y recuerdos musicales. Un elemento visual icónico que enriquece la calidez del espacio y sirve de photocall espontáneo en cada celebración.
            </p>
            <div className="p-3.5 bg-[#1b1917] border border-[#33302c] font-mono text-xs text-[#b8b0a2] space-y-1">
              <span className="text-[#e2c044] font-bold uppercase block">// IDENTIDAD VISUAL & CALIDEZ</span>
              Un detalle de personalidad que acompaña los eventos sin restar protagonismo a la amplitud y versatilidad funcional del salón.
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border-3 border-[#33302c] bg-black shadow-[6px_6px_0_#000] overflow-hidden aspect-[4/3] group">
              <img
                src="./assets/grafit/instagram/599139401_17934885522129317_243501184606504542_n.jpg"
                alt="Frontal Volkswagen integrado en el salón de Grafit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/85 text-[#f5efe1] p-2 text-center font-mono text-[11px] border-t border-[#33302c]">
                Frontal Volkswagen en pared de ladrillo visto del salón
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PALMER-INSPIRED DRAGGABLE GALLERY */}
      <div className="space-y-4">
        <div className="border-b-2 border-[#33302c] pb-3">
          <div className="font-mono text-xs font-bold text-[#e2c044] uppercase tracking-widest">
            // GALERÍA INTERACTIVA
          </div>
          <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
            Explora Cada Rincón de Grafit
          </h2>
          <p className="font-['Space_Grotesk'] text-sm text-[#b8b0a2] mt-1">
            Desliza libremente por la colección fotográfica del local: arquitectura, detalles de barra, colección de vinilos y archivo histórico.
          </p>
        </div>

        <InteractiveDraggableGallery />
      </div>

      {/* 4. HISTORIA INTEGRADA (EVOLUCIÓN ROCK INTERGENERACIONAL) */}
      <div className="p-8 sm:p-10 bg-[#141312] border-3 border-[#33302c] shadow-[8px_8px_0_#000] space-y-6">
        <div className="flex items-center gap-2 text-[#b91c1c] font-mono text-xs uppercase tracking-widest">
          <Music2 className="w-4 h-4" />
          <span>// EVOLUCIÓN HISTÓRICA & CULTURA ROCK</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
              Una Identidad que se Adapta sin Perder su Raíz
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] leading-relaxed">
              Al igual que las bandas icónicas del rock británico y clásico han evolucionado a lo largo de décadas sin perder su pulso, Grafit ha transitado desde sus orígenes vinculados a la cultura musical analógica y los directos de barrio hasta convertirse en el referente actual de encuentros y gastronomía de grupo en Indautxu.
            </p>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] leading-relaxed">
              Consolidado hoy como un espacio gastronómico y sala de celebraciones privadas, el espíritu rockero sigue vivo en cada vinilo de sus paredes, en su barra vibrante los días de partido del Athletic y en la atmósfera desenfadada de su salón.
            </p>
          </div>

          <div className="md:col-span-4 p-4 bg-[#1e1c1a] border-2 border-[#b91c1c] shadow-[4px_4px_0_#000] space-y-3 font-mono text-xs">
            <span className="text-[#e2c044] font-bold uppercase block">// COMPROMISO CON LA TRANSPARENCIA</span>
            <p className="text-[#b8b0a2] leading-relaxed">
              Las fotografías de actuaciones en directo recogidas en nuestro archivo pertenecen a épocas musicales anteriores. <strong>Actualmente, Grafit no dispone de programación de conciertos en directo</strong>, centrando su actividad en comidas de grupo, celebraciones y gastronomía con personalidad.
            </p>
          </div>
        </div>
      </div>

      {/* 5. CIERRE COMERCIAL & VISITAS */}
      <div className="p-8 sm:p-10 bg-[#181615] border-4 border-[#b91c1c] shadow-[10px_10px_0_#000] text-center space-y-4">
        <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase tracking-wider text-[#f5efe1]">
          ¿Quieres Conocer el Salón en Persona o Consultar Disponibilidad?
        </h2>
        <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] max-w-2xl mx-auto leading-relaxed">
          Pásate por Urrutia Kalea 1 (a 3 minutos de la boca de metro de Indautxu) o envíanos una solicitud a través del formulario indicando fecha y número de asistentes.
        </p>

        <div className="pt-3 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('/contacto?tipo=evento')}
            className="px-8 py-3.5 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <span>SOLICITAR DISPONIBILIDAD DEL SALÓN</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
