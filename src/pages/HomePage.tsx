import React from 'react';
import { HeroVolkswagenV3 } from '../components/HeroVolkswagenV3';
import { FaroViajeroSection } from '../components/FaroViajeroSection';
import { EventosSectionV3 } from '../components/EventosSectionV3';
import { EspacioIntroSection } from '../components/EspacioIntroSection';
import { AmbientesSection } from '../components/AmbientesSection';
import { AthleticSection } from '../components/AthleticSection';
import { EditorialMagazineGallery } from '../components/EditorialMagazineGallery';
import { InstagramLatestPost } from '../components/InstagramLatestPost';
import { CierreComercialSection } from '../components/CierreComercialSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full flex flex-col">
      {/* 1. HERO VOLKSWAGEN: ESCENARIO REORGANIZADO DESKTOP + DIRECTO MOBILE */}
      <HeroVolkswagenV3
        onNavigate={onNavigate}
        onExploreGastronomy={() => {
          const faro = document.getElementById('faro-viajero-section');
          if (faro) {
            faro.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 2. CONTINUIDAD GASTRONÓMICA: EL FARO VIAJERO (GSAP SCROLLTRIGGER 5 MOVIMIENTOS) */}
      <FaroViajeroSection onNavigate={onNavigate} />

      {/* 3. BLOQUE COMPLETO DE EVENTOS CON TRANSICIÓN SLICED TEXT INTEGRADA & DESCANSO VISUAL */}
      <EventosSectionV3 onNavigate={onNavigate} />

      {/* 4. EL SALÓN MULTIUSOS DE INDAUTXU */}
      <EspacioIntroSection onNavigate={onNavigate} />

      {/* 5. DOS AMBIENTES: LA BARRA Y EL SALÓN */}
      <AmbientesSection onNavigate={onNavigate} />

      {/* 6. COMUNIDAD & ATHLETIC: SENTIMIENTO ROJIBLANCO AUTÉNTICO EN INDAUTXU */}
      <AthleticSection onNavigate={onNavigate} />

      {/* 7. MEMORIA EDITORIAL: WEBGL MAGAZINE 3D INTERACTIVO */}
      <EditorialMagazineGallery />

      {/* 8. INSTAGRAM: PREPARADO PARA LA ÚLTIMA PUBLICACIÓN REAL CON FALLBACK HONESTO */}
      <InstagramLatestPost />

      {/* 9. CIERRE COMERCIAL Y SOLICITUD DE DISPONIBILIDAD */}
      <CierreComercialSection onNavigate={onNavigate} />
    </main>
  );
};
