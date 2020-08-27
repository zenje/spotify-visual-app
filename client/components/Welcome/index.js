import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  AnimatedWelcome,
  CurrentTrackShadow,
  Sparkle,
  StyledCurrentTrack as CurrentTrack,
  StyledRecentTracks as RecentTracks,
  welcomeAnimation,
  Wrapper,
} from './style';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function Welcome(props) {
  const { user, currentTrack, recentTracks } = props;
  const { artist, name, img, status } = currentTrack;
  const size = useWindowSize();

  return (
    <Wrapper>
      <ParallaxLayer offset={0} speed={1.5}>
        <AnimatedWelcome style={welcomeAnimation(size.width)}>
          {`welcome, ${user}`}
          <Sparkle>✨</Sparkle>
        </AnimatedWelcome>
      </ParallaxLayer>
      <ParallaxLayer offset={size.width < 600 ? 0.23 : 0.33} speed={0.7}>
        <CurrentTrackShadow />
      </ParallaxLayer>
      <ParallaxLayer offset={size.width < 600 ? 0.2 : 0.3} speed={0.5}>
        <CurrentTrack artist={artist} name={name} img={img} status={status} />
      </ParallaxLayer>
      <ParallaxLayer offset={size.height < 700 ? 0.99 : 0.7} speed={0.3}>
        <RecentTracks tracks={recentTracks} />
      </ParallaxLayer>
    </Wrapper>
  );
}
