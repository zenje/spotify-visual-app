import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  text-align: center;
`;

const Header = styled.h3`
  color: white; // ${(props) => props.theme.colors.text};
  width: 100%;
  padding: 0.5em;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  a {
    color: white;
    text-decoration: none;
  }
  `;

export default function BottomMenu(props) {
  return (
    <Wrapper>
      <Header>
        <Link to="/top/artists">Your Top Artists</Link>
        <Link to="/top/artists">Your Top Tracks</Link>
        <Link to="/top/artists">Your Top Genres</Link>
      </Header>
    </Wrapper>
  );
}
