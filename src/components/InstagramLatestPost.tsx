import React, { useState, useEffect } from 'react';
import { Instagram, ArrowUpRight, ShieldCheck, Clock, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  likes?: number;
}

interface InstagramLatestPostProps {
  initialPost?: InstagramPost | null;
  accessToken?: string;
  accountHandle?: string;
}

export const InstagramLatestPost: React.FC<InstagramLatestPostProps> = ({
  initialPost = null,
  accessToken,
  accountHandle = 'grafitcafe',
}) => {
  const [post, setPost] = useState<InstagramPost | null>(initialPost);
  const [status, setStatus] = useState<'awaiting_credentials' | 'loading' | 'active' | 'error'>(
    initialPost ? 'active' : accessToken ? 'loading' : 'awaiting_credentials'
  );

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      setStatus('active');
      return;
    }

    if (accessToken) {
      setStatus('loading');
      fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type&access_token=${accessToken}&limit=1`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data && data.data && data.data.length > 0) {
            const raw = data.data[0];
            setPost({
              id: raw.id,
              caption: raw.caption || '',
              mediaUrl: raw.media_url,
              permalink: raw.permalink,
              timestamp: raw.timestamp,
              mediaType: raw.media_type,
            });
            setStatus('active');
          } else {
            setStatus('awaiting_credentials');
          }
        })
        .catch(() => {
          setStatus('awaiting_credentials');
        });
    }
  }, [accessToken, initialPost]);

  const instagramProfileUrl = `https://instagram.com/${accountHandle}`;

  return (
    <section
      id="instagram-sync-section"
      className="relative py-14 sm:py-20 border-b-8 border-black bg-[#0c0b0a] text-[#f5efe1] select-none overflow-hidden"
    >
      {/* AUTHENTIC PUNK WALLPAPER (DARK VERSION) */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: `url('./assets/grafit/punk-wall-bg.jpg')` }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(12,11,10,0.95) 0%, rgba(16,14,12,0.80) 50%, rgba(12,11,10,0.95) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION CONTAINER */}
        <div className="p-5 sm:p-8 bg-[#141210]/90 border-3 border-neutral-700 shadow-[8px_8px_0px_#000] relative space-y-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center border border-black shadow">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-anton text-xl sm:text-2xl text-white tracking-wider uppercase leading-none block">
                  @{accountHandle}
                </span>
                <span className="font-mono text-[10px] text-[#e2c044] uppercase tracking-wider block mt-0.5">
                  CANAL OFICIAL DE INSTAGRAM // BILBAO
                </span>
              </div>
            </div>

            {/* INTEGRATION STATUS BADGE */}
            <div className="flex items-center gap-2">
              {status === 'active' ? (
                <span className="inline-flex items-center gap-1 font-mono text-[10px] bg-[#16a34a] text-white px-2.5 py-1 border border-black uppercase font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SINCRONIZACIÓN ACTIVA</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] bg-black text-neutral-300 px-2.5 py-1 border border-neutral-700 uppercase font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#e2c044]" />
                  <span>PREPARADO PARA ÚLTIMA PUBLICACIÓN</span>
                </span>
              )}
            </div>
          </div>

          {/* ACTIVE POST OR HONEST FALLBACK */}
          {status === 'active' && post ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
              <div className="md:col-span-5 relative aspect-square bg-black border-2 border-neutral-700 overflow-hidden shadow-[4px_4px_0_#000]">
                <img
                  src={post.mediaUrl}
                  alt={post.caption || 'Última publicación en Instagram'}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-[#b91c1c] text-white font-mono text-[9px] font-bold px-2 py-0.5 border border-black uppercase">
                  ÚLTIMO POST REAL
                </span>
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="font-mono text-xs text-neutral-400">
                  Publicado:{' '}
                  <span className="text-white font-bold">
                    {new Date(post.timestamp).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <p className="font-sans text-neutral-200 text-sm sm:text-base leading-relaxed line-clamp-4">
                  {post.caption}
                </p>

                <div className="pt-2">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#b91c1c] hover:bg-white hover:text-black text-white font-anton text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0_#000] transition-colors"
                  >
                    <span>VER PUBLICACIÓN EN INSTAGRAM</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
              {/* AUTHENTIC PHOTO SAMPLE FROM GRAFIT'S REAL INSTAGRAM ARCHIVE */}
              <div className="md:col-span-4 p-3 bg-black/80 border-2 border-neutral-700 space-y-2">
                <div className="relative aspect-square bg-black border border-neutral-800 overflow-hidden">
                  <img
                    src="./assets/grafit/instagram/chupa-cuero.jpg"
                    alt="Cultura y ambiente en Grafit Café"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/85 text-[#e2c044] font-mono text-[9px] px-2 py-0.5 border border-[#e2c044] uppercase">
                    CULTURA & ROCK
                  </div>
                </div>
                <div className="text-center pt-1">
                  <span className="inline-block bg-[#161413] text-[#ded8cb] font-mono text-[10px] px-2 py-0.5 border border-neutral-700">
                    URRUTIA KALEA 1 • INDAUTXU
                  </span>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[#e2c044] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#e2c044]" />
                    <span>CANAL OFICIAL ACTIVO // BILBAO</span>
                  </span>
                  <h4 className="font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
                    El Día a Día en @grafitcafe
                  </h4>
                </div>

                <p className="font-sans text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  Conéctate con nuestro perfil oficial en Instagram para descubrir los pintxos recién salidos de barra,
                  el ambiente previo a los partidos del Athletic, avisos de conciertos acústicos y las sobremesas en el salón.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#b91c1c] to-[#991b1b] hover:from-white hover:to-white hover:text-black text-white font-anton text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_#000] transition-all cursor-pointer hover:-translate-y-0.5"
                  >
                    <span>VISITAR PERFIL OFICIAL @{accountHandle.toUpperCase()}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <span className="font-mono text-[10px] text-neutral-400">
                    Instagram Graph API: Preparado
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
