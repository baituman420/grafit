import React, { useState } from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Menu } from 'lucide-react';
import { ZineNavModal } from './ZineNavModal';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-40 bg-[#ebe5d8]/90 backdrop-blur-xs border-b-8 border-black">
        {/* TOP PRINTER CROP MARKS & META DATELINE */}
        <div className="bg-black text-white px-4 md:px-8 py-1.5 flex flex-wrap items-center justify-between font-mono-code text-[10px] md:text-xs uppercase tracking-wider font-bold border-b-2 border-white/20">
          <div className="flex items-center gap-2">
            <div className="crosshair shrink-0 border-white"><div className="crosshair-circle border-white"></div></div>
            <span>★ HOJA VOLANDERA N° 35 // MEMORIA COLECTIVA DEL ROCK VIZCAÍNO ★</span>
          </div>

          <div className="hidden lg:block text-[#e2c044]">
            URRUTIA KALEA 1 — INDAUTXU (BILBAO)
          </div>

          <div className="text-[#b91c1c] font-bold">
            DISTRIBUCIÓN GRATUITA EN TARIMA Y BARRIL
          </div>
        </div>

        {/* MAIN WOODBLOCK RANSOM TITLE HEADER - FLUID FULL WIDTH */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-6 relative">
          
          {/* TOP TAPE STRIPS */}
          <div className="masking-tape tape-corner-tl hidden sm:block"></div>
          <div className="masking-tape tape-corner-tr hidden sm:block"></div>
          <div className="masking-tape tape-top-center hidden sm:block"></div>

          {/* WOODBLOCK RANSOM LETTERS & FLUID JUSTIFIED LAYOUT */}
          <div className="flex items-center justify-between gap-6">
            
            {/* WOODBLOCK 'GRAFIT' RANSOM LETTERS */}
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2 md:gap-4 group focus:outline-none text-left"
            >
              {/* G */}
              <div className="w-11 h-16 sm:w-18 sm:h-24 md:w-24 md:h-32 bg-[#0a0a0a] text-[#ebe5d8] flex items-center justify-center font-ransom text-4xl sm:text-6xl md:text-8xl transform -rotate-4 pasteup-shadow border-3 sm:border-4 border-white group-hover:rotate-0 transition-transform">
                G
              </div>
              {/* R */}
              <div className="w-11 h-16 sm:w-18 sm:h-24 md:w-24 md:h-32 bg-[#b91c1c] text-white flex items-center justify-center font-woodblock text-3xl sm:text-5xl md:text-7xl transform rotate-3 pasteup-shadow border-3 sm:border-4 border-black group-hover:rotate-0 transition-transform">
                R
              </div>
              {/* A */}
              <div className="w-11 h-16 sm:w-18 sm:h-24 md:w-24 md:h-32 bg-[#fdfbf7] text-[#0a0a0a] flex items-center justify-center font-ransom text-4xl sm:text-6xl md:text-8xl transform -rotate-2 pasteup-shadow border-3 sm:border-4 border-black group-hover:rotate-0 transition-transform">
                A
              </div>
              {/* F */}
              <div className="w-11 h-16 sm:w-18 sm:h-24 md:w-24 md:h-32 bg-[#0a0a0a] text-white flex items-center justify-center font-condensed-giant text-4xl sm:text-6xl md:text-8xl transform rotate-5 pasteup-shadow border-3 sm:border-4 border-white group-hover:rotate-0 transition-transform">
                F
              </div>
              {/* I */}
              <div className="w-8 h-16 sm:w-14 sm:h-24 md:w-16 md:h-32 bg-[#e2c044] text-black flex items-center justify-center font-woodblock text-3xl sm:text-5xl md:text-7xl transform -rotate-1 pasteup-shadow border-3 sm:border-4 border-black group-hover:rotate-0 transition-transform">
                I
              </div>
              {/* T */}
              <div className="w-11 h-16 sm:w-18 sm:h-24 md:w-24 md:h-32 bg-[#0a0a0a] text-white flex items-center justify-center font-ransom text-4xl sm:text-6xl md:text-8xl transform rotate-3 pasteup-shadow border-3 sm:border-4 border-black group-hover:rotate-0 transition-transform">
                T
              </div>
            </button>

            {/* DESKTOP NAV LINKS - JUSTIFIED RIGHT SPREAD */}
            <nav className="hidden lg:flex items-center gap-3">
              {GRAFIT_DATA.navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => onNavigate(link.path)}
                    className={`relative px-5 py-2.5 font-ransom text-2xl uppercase tracking-wider transition-all border-4 border-black ${
                      isActive
                        ? 'bg-black text-white shadow-[5px_5px_0px_#b91c1c] -translate-y-1'
                        : 'bg-[#fdfbf7] text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="absolute -top-3 -right-2 bg-[#b91c1c] text-white text-[10px] font-mono-code font-bold px-2 py-0.5 border border-black transform rotate-6 shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3.5 bg-black text-white border-4 border-black shadow-[4px_4px_0px_#b91c1c] active:translate-y-0.5 shrink-0"
              aria-label="Abrir menú"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>

          {/* SUB-BANNER STRIP: ROCK CAFÉ /// INDAUTXU /// BILBAO */}
          <div className="w-full mt-6">
            <div className="torn-strip-black py-3 px-4 sm:px-8 text-center transform -rotate-1 pasteup-shadow">
              <span className="font-ransom text-2xl sm:text-4xl md:text-6xl tracking-widest text-[#ebe5d8] uppercase">
                ROCK CAFÉ <span className="text-[#b91c1c]">///</span> INDAUTXU <span className="text-[#e2c044]">///</span> BILBAO
              </span>
            </div>
          </div>

          {/* RUBBER STAMP */}
          <div className="absolute top-2 right-12 transform rotate-12 z-30 pointer-events-none hidden xl:block">
            <div className="stamped-badge px-5 py-2.5 border-4 rounded-sm font-typewriter text-xs text-center leading-tight shadow-md bg-white/95">
              <div className="text-[10px] text-[#0a0a0a] font-mono-code">SELLO REGISTRO MUNICIPAL</div>
              <div className="text-xl font-bold tracking-tight text-[#b91c1c]">35+ AÑOS DE ROCK</div>
              <div className="text-xs font-bold text-[#0a0a0a]">100% AUTÉNTICO INDAUTXU</div>
            </div>
          </div>

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
