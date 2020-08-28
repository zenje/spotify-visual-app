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
  height: 350px;
  @media (min-width: 600px) {
    flex-direction: row;
    width: 525px;
    height: 250px;
  }
  @media (min-width: 768px) {
    width: 650px;
    height: 250px;
  }
  `;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media (min-width: 600px) {
    width: 110%;
    height: 110%;
  }
`;

export const Left = styled.div`
  flex: 2.5;
  display: flex;
  @media (min-width: 600px) {
    flex: 1;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2%;
  @media (min-width: 600px) {
    flex-direction: column;
    padding-left: 7%;
  }
  @media (min-width: 768px) {
    flex: 1.5;
    padding-left: 6%;
  }
`;

export const Status = styled.div`
  color: ${(props) => props.color || props.theme.colors.text};
  padding: 5% 0;
  font-size: 0.8em;
`;

export const Artist = styled.h1`
  margin: 0;
  color: ${(props) => props.color || props.theme.colors.secondary};
  text-transform: uppercase;
  font-size: 1.2em;
  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

export const Track = styled.div`
  color: ${(props) => props.color || props.theme.colors.text};
  font-style: italic;
  letter-spacing: 1px;
`;

export const ArtistTrackWrapper = styled.div`
  flex-basis: 75%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  @media (min-width: 600px) {
    flex-basis: auto;
    display: inline;
  }
`;

export const MusicBarWrapper = styled.div`
  flex-basis: 25%;
  display: flex;
  align-items: center;
  @media (min-width: 600px) {
    display: inline;
    align-items: normal;
  }
`;

export const StyledMusicBar = styled(MusicBar)`
  margin: 0 auto;
  width: 2em;
  height: 2em;
  @media (min-width: 600px) {
    width: 5em;
    height: 5em;
  }
`;
