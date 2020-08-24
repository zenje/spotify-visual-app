import React, { Component, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { animation, StyledCurrentTrack, Wrapper } from './style';

export default function Welcome(props) {
  const { user, currentTrack } = props;
  const { artist, song, img } = currentTrack;
  const welcomeAnimation = useSpring({
    opacity: 1,
    fontSize: '5em',
    from: {
      opacity: 0,
      fontSize: '1em',
    },
  });

  return (
    <Wrapper>
      <animated.h1 style={welcomeAnimation}>{`Welcome, ${user}`}</animated.h1>
      <StyledCurrentTrack artist={artist} song={song} img={img} />
    </Wrapper>
  );
}
