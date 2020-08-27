import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 280px;
  @media (min-width: 600px) {
    width: 500px;
  }
  @media (min-width: 768px) {
    width: 600px;
  }
`;

export const History = styled.div`
  background-color: white;
  opacity: 0.8;
  padding: 1%;
  margin-bottom: 1%;
  font-size: 0.8em;
`;

export const Tracks = styled.div`
  padding: 0 2%;
`;

export const Track = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  img {
    width: 25px;
    height: 25px;
  }
  &:nth-child(2) {
    opacity: 0.6;
  }
  &:nth-child(3) {
    opacity: 0.3;
  }
`;

export const TrackName = styled.div`
  margin-right: auto;
  padding-left: 5%;
  padding-top: 1%;
  font-style: italic;
  letter-spacing: 1px;
  text-align: left;
`;

export const Artist = styled.h1`
  margin: 0;
  padding-top: 1%;
  color: ${(props) => props.theme.colors.secondary};
  text-transform: uppercase;
  font-size: 1.2em;
  text-align: right;
`;
