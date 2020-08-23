import React, { Component, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import CurrentTrack from './CurrentTrack';

const Wrapper = styled.div`
  color: palevioletred;
  width: 100%;
  height: 100vh;
  padding-top: 25vh;
  text-align: center;
`;

const StyledCurrentTrack = styled(CurrentTrack)`
  max-width: 90%;
  width: 500px;
  height: 250px;
  margin: 0 auto;
`;

function Welcome(props) {
  const { user, currentTrack } = props;
  const { artist, song, img } = currentTrack;
  const welcomeAnimation = useSpring({
    opacity: 1,
    fontSize: '100px',
    from: {
      opacity: 0,
      fontSize: '12px',
    },
  });

  return (
    <Wrapper>
      <animated.h1 style={welcomeAnimation}>{`Welcome, ${user}`}</animated.h1>
      <StyledCurrentTrack artist={artist} song={song} img={img} />
    </Wrapper>
  );
}

export default Welcome;
