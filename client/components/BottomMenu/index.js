import React from 'react';
import { Header, StyledLink as Link, Wrapper } from './style';

export default function BottomMenu(props) {
  return (
    <Wrapper>
      <Header>
        <Link to="/top/artists">Your Top Artists</Link>
        <Link to="/top/tracks">Your Top Tracks</Link>
        <Link to="/top/genres">Your Top Genres</Link>
      </Header>
    </Wrapper>
  );
}
