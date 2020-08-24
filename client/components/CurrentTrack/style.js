import styled from 'styled-components';
import MusicBar from '../MusicBar/index';

export const Wrapper = styled.div`
  background-color: palevioletred;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Right = styled.div`
  flex: 1;
  align-items: stretch;
`;

export const Image = styled.img`
  flex: 1;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

export const StyledMusicBar = styled(MusicBar)`
  margin: 0 auto;
  width: 5em;
  height: 5em;
`;
