import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  AnimatedWelcome,
  Sparkle,
  StyledCurrentTrack,
  welcomeAnimation,
  Wrapper,
} from './style';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function Welcome(props) {
  const { user, currentTrack } = props;
  const { artist, song, img } = currentTrack;
  const size = useWindowSize();

  return (
    <Wrapper>
      <ParallaxLayer offset={0} speed={1.5}>
        <AnimatedWelcome style={welcomeAnimation(size.width)}>
          {`welcome, ${user}`}
          <Sparkle>✨</Sparkle>
        </AnimatedWelcome>
      </ParallaxLayer>
      <ParallaxLayer offset={0.3} speed={0.5}>
        <StyledCurrentTrack artist={artist} img={img} song={song} />
      </ParallaxLayer>
    </Wrapper>
  );
}
