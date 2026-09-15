import React from 'react';

const PUNK_WALL_BG = './assets/grafit/punk-wall-bg.jpg';

export const ZineBackgroundWall: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* PUNK WALL BG BACKGROUND TEXTURE */}
      <div 
        className="absolute inset-0 bg-[#181615]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 19, 18, 0.4), rgba(20, 19, 18, 0.4)),
            url("${PUNK_WALL_BG}")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* OVERLAY GRAIN & NOISE SUBSTRATE */}
      <div 
        className="absolute inset-0 opacity-35 mix-blend-multiply" 
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 20%, rgba(200, 185, 155, 0.3), transparent 60%),
            radial-gradient(ellipse at 85% 75%, rgba(180, 160, 130, 0.25), transparent 55%),
            radial-gradient(#000000 0.75px, transparent 0.75px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 24px 24px',
        }}
      />
    </div>
  );
};
