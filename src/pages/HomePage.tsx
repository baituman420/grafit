import React from 'react';
import { HeroVolkswagenV3 } from '../components/HeroVolkswagenV3';
import { FaroViajeroSection } from '../components/FaroViajeroSection';
import { ExperienciasSection } from '../components/ExperienciasSection';
import { EspacioIntroSection } from '../components/EspacioIntroSection';
import { AmbientesSection } from '../components/AmbientesSection';
import { InstagramFeedSection } from '../components/InstagramFeedSection';
import { CierreComercialSection } from '../components/CierreComercialSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full flex flex-col">
      {/* 1. HERO VOLKSWAGEN: LETRAS GRAFIT, CHOQUE, EMBLEMA, HAMBURGUESA, FAROS Y REVELACIONES */}
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

      {/* 3. EXPERIENCIAS Y CELEBRACIONES DE GRUPO */}
      <ExperienciasSection onNavigate={onNavigate} />

      {/* 4. EL SALÓN MULTIUSOS DE INDAUTXU */}
      <EspacioIntroSection onNavigate={onNavigate} />

      {/* 5. DOS AMBIENTES: LA BARRA Y EL SALÓN */}
      <AmbientesSection onNavigate={onNavigate} />

      {/* 6. INSTAGRAM Y MEMORIA VISUAL */}
      <InstagramFeedSection />

      {/* 7. CIERRE COMERCIAL Y SOLICITUD DE DISPONIBILIDAD */}
      <CierreComercialSection onNavigate={onNavigate} />
    </main>
  );
};
