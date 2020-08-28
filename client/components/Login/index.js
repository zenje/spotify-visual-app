import React from 'react';
import loginSVG from '../../log_in.svg';

import {
  SpotifySVG,
  SpotifyWrapper,
  StyledContainer as Container,
  Wrapper,
} from './style';

export default function Login() {
  return (
    <Container>
      <Wrapper>
        <h2>hi, friend! please login to begin.</h2>
        <SpotifyWrapper>
          <SpotifySVG>
            <a href="/login" dangerouslySetInnerHTML={{ __html: loginSVG }}></a>
          </SpotifySVG>
        </SpotifyWrapper>
      </Wrapper>
    </Container>
  );
}
