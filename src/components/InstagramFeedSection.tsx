import React from 'react';
import { GRAFIT_DATA } from '../data/grafit';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';

export const InstagramFeedSection: React.FC = () => {
  return (
    <section className="py-14 lg:py-24 border-b-8 border-black relative overflow-hidden bg-newsprint/90">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b-4 border-black mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rubber-stamp text-xs bg-[#b91c1c] text-white border-none py-0.5 px-2">
                @GRAFITCAFE
              </span>
              <span className="font-mono-code text-xs font-bold text-neutral-800">
                // FOTOS REALES DEL LOCAL
              </span>
            </div>
            <h2 className="font-ransom text-5xl sm:text-7xl text-black uppercase tracking-tight">
              FEED DE INSTAGRAM
            </h2>
          </div>

          <a
            href={GRAFIT_DATA.info.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-6 py-3.5 bg-black text-white font-ransom text-2xl uppercase tracking-wider border-4 border-black shadow-[5px_5px_0px_#b91c1c] hover:bg-[#b91c1c] transition-all flex items-center gap-2"
          >
            <Instagram className="w-6 h-6 text-[#e2c044]" />
            <span>SEGUIR EN INSTAGRAM</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>

        {/* INSTAGRAM PASTE-UP POLAROID GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
          {GRAFIT_DATA.instagramFeed.map((post, idx) => {
            const rotationClass = post.rotation || (idx % 2 === 0 ? 'rot-neg-2' : 'rot-pos-2');
            const offsetClass = idx === 1 ? 'sm:translate-y-4' : idx === 3 ? 'lg:-translate-y-4' : idx === 5 ? 'sm:translate-y-6' : '';
            return (
              <div
                key={post.id}
                className={`polaroid-frame bg-[#fdfbf7] p-4 border-4 border-black pasteup-shadow transition-all hover:-translate-y-2 hover:shadow-[10px_10px_0px_#b91c1c] ${rotationClass} ${offsetClass}`}
              >
                {/* TAPE STRIP */}
                <div className="masking-tape tape-top-center"></div>

                {/* PHOTO CONTAINER */}
                <div className="relative aspect-square bg-black overflow-hidden border-2 border-black mb-3">
                  <img
                    src={post.src}
                    alt={post.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* INSTAGRAM TAG BADGE */}
                  <span className="absolute top-2 left-2 bg-black/90 text-white font-mono-code font-bold text-[10px] px-2 py-0.5 border border-white uppercase">
                    {post.tag}
                  </span>

                  {/* LIKES BADGE */}
                  {post.likes && (
                    <span className="absolute bottom-2 right-2 bg-[#b91c1c] text-white font-mono-code font-bold text-[10px] px-2 py-0.5 border border-black flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{post.likes}</span>
                    </span>
                  )}
                </div>

                {/* CAPTION & META */}
                <div className="font-typewriter text-xs leading-snug">
                  <p className="font-bold text-neutral-900 mb-2">
                    "{post.caption}"
                  </p>
                  <div className="pt-2 border-t border-dashed border-black/30 flex items-center justify-between text-[10px] text-neutral-600 font-mono-code">
                    <span>{post.date}</span>
                    <span className="text-[#b91c1c] font-bold">@grafitcafe</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
