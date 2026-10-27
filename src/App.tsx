import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EventosPage } from './pages/EventosPage';
import { EspacioPage } from './pages/EspacioPage';
import { CartaPage } from './pages/CartaPage';
import { ContactoPage } from './pages/ContactoPage';
import { AvisoLegalPage } from './pages/AvisoLegalPage';
import { PoliticaPrivacidadPage } from './pages/PoliticaPrivacidadPage';
import { PoliticaCookiesPage } from './pages/PoliticaCookiesPage';
import { ZineBackgroundWall } from './components/ZineBackgroundWall';

const getRepoBase = (): string => {
  return window.location.pathname.startsWith('/grafit') ? '/grafit' : '';
};

const resolveInitialPath = (): string => {
  // 1. Check for SPA redirect parameter from 404.html (?p=...)
  const params = new URLSearchParams(window.location.search);
  const redirectParam = params.get('p');
  const repoBase = getRepoBase();

  if (redirectParam) {
    let cleanRedirect = decodeURIComponent(redirectParam);
    if (!cleanRedirect.startsWith('/')) {
      cleanRedirect = '/' + cleanRedirect;
    }
    // Clean URL without ?p= in history
    const targetUrl = repoBase + cleanRedirect;
    window.history.replaceState(null, '', targetUrl);
    return cleanRedirect.split('?')[0];
  }

  // 2. Normal pathname resolution
  let path = window.location.pathname || '/';
  if (repoBase && path.startsWith(repoBase)) {
    path = path.slice(repoBase.length);
  }

  if (!path || path === '') {
    path = '/';
  }

  return path;
};

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(resolveInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      const repoBase = getRepoBase();
      let path = window.location.pathname || '/';
      if (repoBase && path.startsWith(repoBase)) {
        path = path.slice(repoBase.length);
      }
      if (!path || path === '') path = '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (pathWithPossibleQuery: string) => {
    const repoBase = getRepoBase();
    const cleanPathOnly = pathWithPossibleQuery.split('?')[0];
    const fullTargetPath = repoBase + (pathWithPossibleQuery.startsWith('/') ? pathWithPossibleQuery : '/' + pathWithPossibleQuery);

    if (cleanPathOnly !== currentPath || window.location.pathname + window.location.search !== fullTargetPath) {
      window.history.pushState({}, '', fullTargetPath);
      setCurrentPath(cleanPathOnly);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/eventos':
      case '/grupos': // Compatibilidad retrospectiva
      case '/agenda': // Compatibilidad: agenda redirige al catálogo de eventos
        return <EventosPage onNavigate={handleNavigate} />;
      case '/espacio':
      case '/grafit': // Compatibilidad retrospectiva
        return <EspacioPage onNavigate={handleNavigate} />;
      case '/carta':
        return <CartaPage onNavigate={handleNavigate} />;
      case '/contacto':
        return <ContactoPage onNavigate={handleNavigate} />;
      case '/aviso-legal':
        return <AvisoLegalPage onNavigate={handleNavigate} />;
      case '/politica-privacidad':
        return <PoliticaPrivacidadPage onNavigate={handleNavigate} />;
      case '/politica-cookies':
        return <PoliticaCookiesPage onNavigate={handleNavigate} />;
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
