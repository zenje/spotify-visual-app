import styled from 'styled-components';

export const TopTrack = styled.div`
  position: relative;
  display: inline-block;
  font-style: italic;
  letter-spacing: 1px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0.25)};
  transition: opacity 0.5s ease-in;
  img {
    width: 100%;
    max-width: 30rem;
    display: block;
  }
`;

export const TopTrackInfo = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  padding-top: 0.5rem;
  bottom: 1.5rem;
  width: 100%;
  color: white;
`;

export const TopTrackArtist = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-style: normal;
`;

export const Tracks = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 0 auto;
`;

export const Track = styled.div`
  border-top: 2px white solid;
  color: white;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.isVisible ? 1 : 0.25)};
  transition: opacity 0.5s ease-in;
`;

export const TrackImg = styled.div`
  flex: 1;
  img {
    width: 100%;
    vertical-align: middle; // remove gap under image (image is rendered inline)
  }
`;

export const TrackInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-style: italic;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  h2 {
    margin: 0;
    text-transform: uppercase;
    font-style: normal;
  }
`;
