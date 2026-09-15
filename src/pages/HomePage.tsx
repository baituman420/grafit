import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HoySection } from '../components/HoySection';
import { ComerBeberSection } from '../components/ComerBeberSection';
import { AgendaSection } from '../components/AgendaSection';
import { HistoriaSection } from '../components/HistoriaSection';
import { GruposSection } from '../components/GruposSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <HoySection />
      <ComerBeberSection onNavigate={onNavigate} />
      <AgendaSection onNavigate={onNavigate} />
      <HistoriaSection onNavigate={onNavigate} />
      <GruposSection onNavigate={onNavigate} />
    </main>
  );
};
