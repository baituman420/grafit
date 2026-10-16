import React, { useState } from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Menu, ArrowLeft, Calendar } from 'lucide-react';
import { ZineNavModal } from './ZineNavModal';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = currentPath === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-[#ebe5d8]/95 backdrop-blur-md border-b-4 border-black transition-transform duration-300 ${
          isHome && !isScrolled ? 'max-lg:translate-y-0 lg:-translate-y-full lg:opacity-0 lg:pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* INTERNAL PAGES ONLY: MINIMAL SUB-LINE & BREADCRUMB */}
        {!isHome && (
          <div className="bg-black text-white px-4 py-1.5 flex items-center justify-between font-mono-code text-[10px] sm:text-xs uppercase tracking-wider font-bold border-b border-white/20">
            <button
              onClick={() => onNavigate('/')}
              className="text-[#e2c044] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>VOLVER A LA PORTADA</span>
            </button>
            <span className="hidden md:inline text-neutral-300">
              URRUTIA KALEA 1 • INDAUTXU • BILBAO
            </span>
            <span className="text-[#b91c1c] font-bold">
              GRAFIT ROCK CAFÉ
            </span>
          </div>
        )}

        {/* MAIN NAV BAR - CLEAN, STREAMLINED & LIGHTWEIGHT */}
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          
          {/* COMPACT BRAND BADGE - NO COMPETITION WITH HERO */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left cursor-pointer"
            aria-label="Grafit Rock Café Inicio"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-black text-white flex items-center justify-center font-anton text-2xl sm:text-3xl border-2 border-black shadow-[2px_2px_0px_#b91c1c] group-hover:bg-[#b91c1c] transition-colors shrink-0">
              G
            </div>
            <div className="flex flex-col">
              <span className="font-anton text-2xl sm:text-3xl text-black tracking-wider uppercase leading-none group-hover:text-[#b91c1c] transition-colors">
                GRAFIT
              </span>
              <span className="font-mono-code text-[10px] sm:text-[11px] font-bold text-neutral-700 tracking-wider uppercase mt-0.5">
                ROCK CAFÉ <span className="text-[#b91c1c]">//</span> INDAUTXU
              </span>
            </div>
          </button>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {GRAFIT_DATA.navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`relative px-4 py-2 font-anton text-lg xl:text-xl uppercase tracking-wider transition-all border-2 border-black cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-[3px_3px_0px_#b91c1c] -translate-y-0.5'
                      : 'bg-[#fdfbf7] text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="absolute -top-2.5 -right-2 bg-[#b91c1c] text-white text-[9px] font-mono-code font-bold px-1.5 py-0.2 border border-black transform rotate-3 shadow-xs">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* QUICK COMMERCIAL CTA */}
            <button
              onClick={() => onNavigate('/contacto?tipo=evento')}
              className="ml-2 px-4 py-2 bg-[#b91c1c] text-white font-anton text-lg xl:text-xl uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-black transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>RESERVAR GRUPO</span>
            </button>
          </nav>

          {/* MOBILE MENU TRIGGER */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2.5 bg-black text-white border-2 border-black shadow-[3px_3px_0px_#b91c1c] active:translate-y-0.5 shrink-0 cursor-pointer"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE NAV MODAL */}
      <ZineNavModal
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={currentPath}
        onNavigate={(path) => {
          onNavigate(path);
          setIsMobileMenuOpen(false);
        }}
      />
    </>
  );
};
