import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CartaPage } from './pages/CartaPage';
import { AgendaPage } from './pages/AgendaPage';
import { GruposPage } from './pages/GruposPage';
import { GrafitPage } from './pages/GrafitPage';
import { ZineBackgroundWall } from './components/ZineBackgroundWall';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/carta':
        return <CartaPage onNavigate={handleNavigate} />;
      case '/agenda':
        return <AgendaPage onNavigate={handleNavigate} />;
      case '/grupos':
        return <GruposPage onNavigate={handleNavigate} />;
      case '/grafit':
        return <GrafitPage onNavigate={handleNavigate} />;
      case '/':
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen relative bg-[#ebe5d8] text-[#0c0b0a] flex flex-col justify-between selection:bg-[#b91c1c] selection:text-white">
      {/* SPANISH PUNK FANZINE WALLPAPER BACKGROUND */}
      <ZineBackgroundWall />

      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <Header currentPath={currentPath} onNavigate={handleNavigate} />
        <div className="flex-1">
          {renderCurrentPage()}
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
};

export default App;
