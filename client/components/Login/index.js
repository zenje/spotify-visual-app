import React from 'react';
import loginSVG from '../../log_in.svg';

import InitialLoader from '../loaders/InitialLoader';
import {
  SpotifySVG,
  SpotifyWrapper,
  StyledContainer as Container,
  Tip,
  Wrapper,
} from './style';

export default function Login() {
  return (
    <Container>
      <Wrapper>
        <SpotifyWrapper>
          <h2>hi, friend! please login to begin.</h2>
          <SpotifySVG>
            <a href="/login" dangerouslySetInnerHTML={{ __html: loginSVG }}></a>
          </SpotifySVG>
        </SpotifyWrapper>
        <Tip>tip: play some music!</Tip>
      </Wrapper>
    </Container>
  );
}
