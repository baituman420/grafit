import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { X, MapPin, Clock, ArrowRight } from 'lucide-react';

interface ZineNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const ZineNavModal: React.FC<ZineNavModalProps> = ({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#e5dfd0] bg-grafit-texture overflow-y-auto animate-fadeIn" role="dialog" aria-modal="true" aria-label="Menú de navegación principal">
      {/* HEADER BAR */}
      <div className="p-4 border-b-4 border-black bg-black text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-anton text-2xl text-white">GRAFIT INDAUTXU</span>
          <span className="rubber-stamp text-[9px] bg-[#b91c1c] text-white border-none py-0.5 px-1.5">
            ZINE NAV
          </span>
        </div>
        <button
          onClick={onClose}
          className="min-w-[48px] min-h-[48px] p-2.5 bg-[#b91c1c] text-white border-2 border-white hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Cerrar menú de navegación"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* CONTENT BODY */}
      <div className="p-6 flex-1 flex flex-col justify-between max-w-lg mx-auto w-full">
        {/* NAV LINKS LIST */}
        <div className="space-y-4 my-4">
          <div className="font-mono-code text-xs font-bold text-neutral-600 tracking-widest uppercase border-b-2 border-black pb-1">
            // SECCIONES DE LA WEB
          </div>

          {GRAFIT_DATA.navLinks.map((link, idx) => {
            const isActive = currentPath === link.path;
            const rotationClass = idx % 2 === 0 ? 'rot-pos-1' : 'rot-neg-1';
            return (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  onClose();
                }}
                className={`w-full text-left p-4 border-3 border-black font-anton text-2xl uppercase tracking-wider flex items-center justify-between transition-transform ${rotationClass} ${
                  isActive
                    ? 'bg-black text-white shadow-[5px_5px_0px_#b91c1c]'
                    : 'bg-[#f4eedd] text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="bg-[#b91c1c] text-white text-xs font-mono-code px-2 py-0.5 border border-black">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* QUICK INFO BOX */}
        <div className="mt-8 p-5 bg-[#f4eedd] border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)] tape-top space-y-3">
          <div className="rubber-stamp text-xs bg-black text-white border-none mb-1">
            INFORMACIÓN DEL LOCAL
          </div>
          
          <div className="flex items-start gap-2 font-mono-code text-xs text-neutral-800">
            <MapPin className="w-4 h-4 text-[#b91c1c] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-black">{GRAFIT_DATA.info.address}</p>
              <p>{GRAFIT_DATA.info.neighborhood} • {GRAFIT_DATA.info.city}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-black/10">
            <button
              onClick={() => {
                onNavigate('/contacto');
                onClose();
              }}
              className="text-xs font-mono-code font-bold text-[#b91c1c] hover:text-black flex items-center gap-1.5 uppercase underline decoration-2"
            >
              <span>Consultar disponibilidad y eventos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-start gap-2 font-mono-code text-xs text-neutral-800 pt-2 border-t border-black/20">
            <Clock className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-black">{GRAFIT_DATA.info.kitchenHours}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-black/15 flex flex-wrap items-center gap-2 font-mono-code text-[10px] text-neutral-600">
            <button
              onClick={() => {
                onNavigate('/aviso-legal');
                onClose();
              }}
              className="hover:underline hover:text-black cursor-pointer"
            >
              Aviso Legal
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onNavigate('/politica-privacidad');
                onClose();
              }}
              className="hover:underline hover:text-black cursor-pointer"
            >
              Privacidad
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onNavigate('/politica-cookies');
                onClose();
              }}
              className="hover:underline hover:text-black cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
