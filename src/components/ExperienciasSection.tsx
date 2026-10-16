import React, { useState } from 'react';
import { Users, Calendar, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExperienciasSectionProps {
  onNavigate: (path: string) => void;
}

interface FormatoEvento {
  id: string;
  tipoParam: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  photo: string;
  photoCaption: string;
  highlights: string[];
}

const FORMATOS: FormatoEvento[] = [
  {
    id: 'cuadrillas',
    tipoParam: 'comida-cuadrilla',
    badge: 'CUADRILLAS & AMIGOS',
    badgeColor: '#b91c1c',
    title: 'Comidas y Cenas de Cuadrilla',
    subtitle: 'Mesas largas, cocina continua y ambiente distendido',
    description:
      'El salón multiusos permite reunir a grupos grandes en mesas corridas sin las limitaciones de un comedor tradicional. Disfruta de nuestras hamburguesas 100% buey, sándwiches calientes, raciones y cañón de cerveza helada a -2°C con total comodidad.',
    photo: '/assets/grafit/interior/grafit-salon-mesas-11.jpg',
    photoCaption: 'Mesas preparadas frente al mural de concierto en el salón',
    highlights: [
      'Mesas modulares para grupos de diferentes tamaños',
      'Servicio continuo de cocina y barra propia',
      'Sin prisas de rotación de turno',
    ],
  },
  {
    id: 'cumpleanos',
    tipoParam: 'cumpleanos',
    badge: 'CELEBRACIONES PRIVADAS',
    badgeColor: '#e2c044',
    title: 'Cumpleaños y Aniversarios',
    subtitle: 'Tu fiesta con personalidad rock en el corazón de Indautxu',
    description:
      'Celebra tu fecha especial con un espacio singular presidido por la media Volkswagen y paredes llenas de cultura musical. Un entorno acogedor y desenfadado donde compartir picoteo, copas y buena música.',
    photo: '/assets/grafit/interior/grafit-salon-mesas-27.jpg',
    photoCaption: 'Distribución espaciosa y ambiente cálido para celebraciones',
    highlights: [
      'Espacio diáfano y versátil con identidad propia',
      'Picoteo variado de barra y carta adaptada',
      'Ubicación inmejorable a 3 minutos del metro Indautxu',
    ],
  },
  {
    id: 'empresas',
    tipoParam: 'empresa',
    badge: 'AFTERWORK & EQUIPO',
    badgeColor: '#16a34a',
    title: 'Encuentros de Empresa y Afterworks',
    subtitle: 'Reuniones informales de equipo y despedidas de año',
    description:
      'Huye de los comedores protocolarios. Grafit ofrece un marco dinámico para comidas de departamento, reuniones informales de networking y celebraciones de fin de año con ambiente auténtico.',
    photo: '/assets/grafit/interior/grafit-salon-mesas-03.jpg',
    photoCaption: 'Área versátil preparada para presentaciones y distensión',
    highlights: [
      'Entorno distendido para conectar fuera de la oficina',
      'Formatos cóctel o banquete según necesidades',
      'Atención directa y flexible en la organización',
    ],
  },
  {
    id: 'personalizados',
    tipoParam: 'evento-medida',
    badge: 'A MEDIDA',
    badgeColor: '#0a0a0a',
    title: 'Celebraciones Personalizadas',
    subtitle: 'Cuéntanos tu idea y adaptamos el salón',
    description:
      'Desde despedidas hasta reuniones de asociaciones o encuentros generacionales. Explícanos lo que buscas y te orientamos sobre disponibilidad y opciones del espacio sin compromisos.',
    photo: '/assets/grafit/interior/grafit-salon-mesas-31.jpg',
    photoCaption: 'Configuración modulable para proyectos y reuniones',
    highlights: [
      'Distribución adaptable según el tipo de encuentro',
      'Flexibilidad horaria previa consulta',
      'Sin condiciones rígidas de contratación',
    ],
  },
];

export const ExperienciasSection: React.FC<ExperienciasSectionProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState<string>('cuadrillas');
  const activeFormat = FORMATOS.find((f) => f.id === selectedId) || FORMATOS[0];

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 bg-[#121110] text-[#f5efe1] border-b-8 border-black">
      {/* SECTION HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#e2c044]">
          <span className="w-2.5 h-2.5 bg-[#b91c1c] rounded-full animate-ping" />
          <span>// EXPERIENCIAS & EVENTOS DE GRUPO</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase tracking-wider text-[#f5efe1] leading-tight">
              Celebra en el Salón Multiusos
            </h2>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#b8b0a2] max-w-2xl mt-1.5">
              Un espacio amplio, diáfano y con personalidad propia en Indautxu. Adaptamos la distribución a tu grupo sin inventar normas rígidas.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/eventos')}
            className="px-5 py-2.5 bg-[#e2c044] hover:bg-yellow-400 text-black border-2 border-black font-['Anton'] text-sm sm:text-base uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5 cursor-pointer self-start md:self-auto"
          >
            <span>VER GUÍA COMPLETA DE EVENTOS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EDITORIAL FORMAT SPREAD */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: INTERACTIVE FORMAT PILLS (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#9c9488] mb-1">
            ELIGE EL FORMATO QUE NECESITAS:
          </span>
          {FORMATOS.map((f) => {
            const isSelected = f.id === selectedId;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedId(f.id)}
                className={`text-left p-4 border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#1e1c1a] border-[#e2c044] shadow-[5px_5px_0_#000] -translate-x-1'
                    : 'bg-[#161413] border-[#33302c] hover:border-[#888] text-[#9c9488] hover:text-[#f5efe1]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 uppercase border shadow-sm"
                    style={{
                      backgroundColor: isSelected ? f.badgeColor : '#0c0b0a',
                      color: isSelected && f.badgeColor === '#e2c044' ? '#000' : '#fff',
                      borderColor: isSelected ? '#000' : '#444',
                    }}
                  >
                    {f.badge}
                  </span>
                  {isSelected && <span className="font-mono text-xs text-[#e2c044] font-bold">● ACTIVO</span>}
                </div>
                <h3 className="font-['Anton'] text-lg sm:text-xl uppercase tracking-wide text-[#f5efe1]">
                  {f.title}
                </h3>
                <p className="font-['Space_Grotesk'] text-xs text-[#a39b8e] mt-1 line-clamp-2">
                  {f.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* RIGHT COLUMN: FOCUSED REAL PHOTOGRAPHY & CONTEXTUAL DETAILS (8 COLS) */}
        <div className="lg:col-span-8 bg-[#181615] border-3 border-[#33302c] p-5 sm:p-7 shadow-[8px_8px_0_#000] flex flex-col gap-6">
          {/* LARGE PHOTO WITH POLAROID / ZINE FRAME */}
          <div className="relative aspect-[16/9] sm:aspect-[21/10] overflow-hidden bg-black border-2 border-[#2b2724]">
            <img
              src={activeFormat.photo}
              alt={activeFormat.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* BADGE ON PHOTO */}
            <div className="absolute top-3 left-3 bg-[#b91c1c] text-white font-mono text-[11px] font-bold px-3 py-1 uppercase border border-black shadow-[3px_3px_0_#000]">
              FOTOGRAFÍA REAL DEL SALÓN GRAFIT
            </div>
            <div className="absolute bottom-2 right-2 bg-black/85 text-[#ded8cb] font-mono text-[10px] px-2.5 py-1 border border-[#33302c]">
              {activeFormat.photoCaption}
            </div>
          </div>

          {/* CONTENT BREAKDOWN */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#e2c044] font-bold uppercase">
                  {activeFormat.subtitle}
                </span>
              </div>
              <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase tracking-wider text-[#f5efe1]">
                {activeFormat.title}
              </h3>
              <p className="font-['Space_Grotesk'] text-sm sm:text-base text-[#ded8cb] mt-2 leading-relaxed">
                {activeFormat.description}
              </p>
            </div>

            {/* HIGHLIGHT CHECKPOINTS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#2a2623]">
              {activeFormat.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-mono text-[#ded8cb]">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS WITH CONTEXT PRESERVATION */}
            <div className="pt-4 border-t border-[#2a2623] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onNavigate(`/contacto?tipo=${activeFormat.tipoParam}`)}
                className="w-full sm:w-auto px-6 py-3 bg-[#b91c1c] hover:bg-red-700 text-white font-['Anton'] text-sm tracking-wider uppercase border-2 border-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>★ CONSULTAR PARA {activeFormat.badge} ★</span>
              </button>

              <button
                onClick={() => onNavigate('/eventos')}
                className="w-full sm:w-auto px-5 py-3 bg-[#1e1c1a] hover:bg-[#2b2724] text-[#ded8cb] hover:text-white font-mono text-xs font-bold uppercase border border-[#444] transition-colors cursor-pointer"
              >
                VER CÓMO ORGANIZAR EL EVENTO →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
