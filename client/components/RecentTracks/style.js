import styled from 'styled-components';
import { RECENT_TRACKS_LIMIT } from '../../constants';

export const Wrapper = styled.div`
  margin: 2rem;
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
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
`;

export const Tracks = styled.div`
  padding: 0 0.5rem;
`;

const getFadedTrackStyle = (trackLimit = RECENT_TRACKS_LIMIT) => {
  let style;
  let opacity = 1;
  const opacityMin = 0.2;
  let opacityInterval = (opacity - opacityMin) / trackLimit;

  for (let i = 0; i < trackLimit; i++) {
    let child = i + 1;
    opacity = opacity - opacityInterval;
    style += `
      &:nth-child(${child}) {
        opacity: ${opacity};
      }
    `;
  }
  return style;
};

export const Track = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0.2rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  ${(props) => getFadedTrackStyle(props.trackLimit)}
`;

export const TrackName = styled.div`
  margin-right: auto;
  padding-left: 1.5rem;
  padding-top: 0.2rem;
  font-style: italic;
  letter-spacing: 1px;
  text-align: left;
`;

export const Artist = styled.h1`
  margin: 0;
  padding-top: 0.2rem;
  color: ${(props) => props.theme.colors.secondary};
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: right;
`;
