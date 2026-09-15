import React from 'react';

const LOCAL_BG = './assets/grafit/fanzine-wall-bg.jpg';
const REMOTE_BG = 'https://lh3.googleusercontent.com/aida/AEtjO1XDT1QoG6y62fk0jRY2w_wMgmHNVqtZVyDpEjNWtLCzvbpxqBqt2UjFQJee-ch52mBwq3-g28H9GB1sr84Zo0xXK643IEpFvXjdN8YtD1qqKKeZGRCOAo20gELurbg1JY3KSG69evPzvCSIqH13XKTVWa3A64fWDRdDiIfuo2fIxyMRenPiFI4b7XPxgT6P32Xbc4dl7zlicxhLo5apsrlSWnBFNCDggRZNs10ygzUVlL2veSjN3mBUsvQ';

export const ZineBackgroundWall: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* SEAMLESS BASQUE PUNK FANZINE WALLPAPER TEXTURE WITH REMOTE CDN FALLBACK */}
      <div 
        className="absolute inset-0 bg-[#181615]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 19, 18, 0.45), rgba(20, 19, 18, 0.45)),
            url("${LOCAL_BG}"),
            url("${REMOTE_BG}")
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '800px auto',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* OVERLAY GRAIN & NOISE SUBSTRATE */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply" 
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
