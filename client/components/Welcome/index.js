import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
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
      <AnimatedWelcome style={welcomeAnimation(size.width)}>
        {`welcome, ${user}`}
        <Sparkle>✨</Sparkle>
      </AnimatedWelcome>
      <StyledCurrentTrack artist={artist} song={song} img={img} />
    </Wrapper>
  );
}
