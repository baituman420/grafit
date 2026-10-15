import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { ExperienciasSection } from '../components/ExperienciasSection';
import { EspacioIntroSection } from '../components/EspacioIntroSection';
import { AmbientesSection } from '../components/AmbientesSection';
import { ComerBeberSection } from '../components/ComerBeberSection';
import { InstagramFeedSection } from '../components/InstagramFeedSection';
import { CierreComercialSection } from '../components/CierreComercialSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <ExperienciasSection onNavigate={onNavigate} />
      <EspacioIntroSection onNavigate={onNavigate} />
      <AmbientesSection onNavigate={onNavigate} />
      <ComerBeberSection onNavigate={onNavigate} />
      <InstagramFeedSection />
      <CierreComercialSection onNavigate={onNavigate} />
    </main>
  );
};
