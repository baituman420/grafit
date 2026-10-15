import React from 'react';
import { Composition } from 'remotion';
import { GrafitHeroSequence } from './GrafitHeroSequence';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GrafitHeroDesktop"
        component={GrafitHeroSequence}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="GrafitHeroSquare"
        component={GrafitHeroSequence}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
