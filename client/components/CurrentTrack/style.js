import styled from 'styled-components';
import MusicBar from '../MusicBar';

export const Wrapper = styled.div`
  background-color: white;
  //background-color: ${(props) => props.theme.colors.highlight};
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: 500px;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 500px;
    height: 250px;
  }
  `;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Artist = styled.h1`
  margin: 0;
  color: ${(props) => props.theme.colors.secondary};
  text-transform: uppercase;
`;

export const Song = styled.div`
  font-style: italic;
  letter-spacing: 1px;
`;

export const MusicBarWrapper = styled.div`
  flex-basis: 25%;
`;

export const StyledMusicBar = styled(MusicBar)`
  margin: 0 auto;
  margin-top: 25%;
  width: 5em;
  height: 5em;
`;
