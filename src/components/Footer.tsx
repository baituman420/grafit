import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-12 border-t-8 border-black relative overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 relative z-10">
        
        {/* TOP HUGE BRANDING - FULL VIEWPORT SPREAD */}
        <div className="pb-12 border-b-2 border-neutral-800 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
                EST. 2017
              </span>
              <span className="font-mono-code text-xs text-neutral-400 font-bold">
                INDAUTXU • BILBAO
              </span>
            </div>
            <h2 className="font-ransom text-7xl sm:text-9xl lg:text-[11vw] text-white tracking-tighter leading-none">
              GRAFIT
            </h2>
            <p className="font-mono-code text-sm sm:text-base text-[#e2c044] tracking-widest uppercase font-bold mt-2">
              ROCK CAFÉ • COCINA NON-STOP • CONCIERTOS
            </p>
          </div>

          {/* REAL FACADE PHOTO */}
          <div className="w-full lg:w-80 polaroid-frame rot-pos-2 text-black p-3 bg-[#fdfbf7] shrink-0">
            <div className="aspect-[16/10] bg-black overflow-hidden border-2 border-black">
              <img
                src="/assets/grafit/exterior/grafit-fachada-01.jpg"
                alt="Fachada del Grafit Café"
                className="w-full h-full object-cover contrast-110"
                loading="lazy"
              />
            </div>
            <p className="mt-2 font-typewriter text-xs font-bold text-center text-neutral-900">
              Fachada Urrutia Kalea 1
            </p>
          </div>
        </div>

        {/* MIDDLE GRID: INFO + NAV + HOURS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b-2 border-neutral-800 font-mono-code text-xs">
          
          {/* COL 1: CONTACT & ADDRESS */}
          <div className="space-y-4">
            <h3 className="font-ransom text-2xl text-[#e2c044] uppercase tracking-wider">
              // DÓNDE ESTAMOS
            </h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#b91c1c] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white text-base">{GRAFIT_DATA.info.address}</p>
                <p className="text-neutral-400">{GRAFIT_DATA.info.neighborhood} • {GRAFIT_DATA.info.city}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(GRAFIT_DATA.info.address + ' ' + GRAFIT_DATA.info.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 underline text-[#e2c044] hover:text-white font-bold"
                >
                  Abrir en Google Maps &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5 text-[#b91c1c] shrink-0" />
              <a href={`tel:${GRAFIT_DATA.info.phone}`} className="font-bold text-white text-base hover:underline">
                {GRAFIT_DATA.info.phone}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#b91c1c] shrink-0" />
              <a href={`mailto:${GRAFIT_DATA.info.email}`} className="text-neutral-300 hover:underline">
                {GRAFIT_DATA.info.email}
              </a>
            </div>
          </div>

          {/* COL 2: HOURS & KITCHEN */}
          <div className="space-y-4">
            <h3 className="font-ransom text-2xl text-[#e2c044] uppercase tracking-wider">
              // HORARIOS DE APERTURA
            </h3>

            <div className="space-y-2 text-neutral-300 text-xs">
              {GRAFIT_DATA.info.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="font-bold text-white">{h.days}:</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-neutral-900 border-2 border-neutral-700 text-[#e2c044] font-bold">
              ⚡ {GRAFIT_DATA.info.kitchenHours}
            </div>
          </div>

          {/* COL 3: NAVIGATION & SOCIALS */}
          <div className="space-y-4">
            <h3 className="font-ransom text-2xl text-[#e2c044] uppercase tracking-wider">
              // NAVEGACIÓN DEMO
            </h3>

            <ul className="space-y-2.5 text-sm">
              {GRAFIT_DATA.navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="hover:text-[#b91c1c] hover:underline font-bold text-neutral-200 uppercase font-ransom tracking-wider text-xl"
                  >
                    &gt; {link.label} {link.badge ? `(${link.badge})` : ''}
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-neutral-800 flex items-center gap-4">
              <a
                href={GRAFIT_DATA.info.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-800 text-white hover:bg-[#b91c1c] transition-colors border border-neutral-700"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={GRAFIT_DATA.info.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-800 text-white hover:bg-[#b91c1c] transition-colors border border-neutral-700"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Grafit Rock Café • Indautxu, Bilbao. Todos los derechos reservados.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 border-2 border-neutral-700 hover:bg-[#b91c1c] transition-colors font-bold"
          >
            <span>SUBIR ARRIBA</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
