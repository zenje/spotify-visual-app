import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  text-align: center;
`;

const ButtonRow = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Header = styled.h1`
  color: white; // ${(props) => props.theme.colors.text};
  //border-bottom: 2px solid white; // ${(props) =>
    props.theme.colors.secondary};
  width: 40%;
  padding: 0.5em;
  margin: 0 auto;
  padding-top: 10vh;
  `;

export default function BottomMenu(props) {
  return (
    <Wrapper>
      <Header>
        <Link to="/top/artists">Your Top Artists</Link>
      </Header>
    </Wrapper>
  );
}
