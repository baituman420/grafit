import React from 'react';
import { Composition } from 'remotion';
import { GrafitHeroSequence } from './GrafitHeroSequence';
import { GrafitHeroMobile } from './GrafitHeroMobile';
import { GrafitHeroMobileV2 } from './GrafitHeroMobileV2';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GrafitHeroMobileV2"
        component={GrafitHeroMobileV2}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GrafitHeroMobile"
        component={GrafitHeroMobile}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
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

