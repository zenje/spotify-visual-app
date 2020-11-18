import React from 'react';
import styled, { keyframes } from 'styled-components';
import { animated, useTransition } from 'react-spring';
import Skeleton from '@material-ui/lab/Skeleton';
import theme from '../../styles/theme';
import {
  CURRENT_TRACK_SIZE,
  CURRENT_TRACK_IMAGE_LENGTH,
} from '../../constants';
import MusicBar from '../MusicBar';

export const Container = styled.div`
  position: relative;
  ${CURRENT_TRACK_SIZE.SMALL}
  @media (min-width: 600px) {
    ${CURRENT_TRACK_SIZE.MEDIUM}
  }
  @media (min-width: 768px) {
    ${CURRENT_TRACK_SIZE.LARGE}
  }
  margin: 0 auto;
  padding-bottom: 3%;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${CURRENT_TRACK_SIZE.SMALL}
  @media (min-width: 600px) {
    flex-direction: row;
    ${CURRENT_TRACK_SIZE.MEDIUM}
  }
  @media (min-width: 768px) {
    ${CURRENT_TRACK_SIZE.LARGE}
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
   }
`;

export const Image = styled.img`
  // necessary to break flexbox because useTransition adds new img to DOM, pushing position
  position: absolute;
  object-fit: cover;
  width: ${CURRENT_TRACK_IMAGE_LENGTH.SMALL}px;
  height: ${CURRENT_TRACK_IMAGE_LENGTH.SMALL}px;
  @media (min-width: 600px) {
    width: ${CURRENT_TRACK_IMAGE_LENGTH.MEDIUM}px;
    height: ${CURRENT_TRACK_IMAGE_LENGTH.MEDIUM}px;
  }
  animation: ${fadeIn} 2s;
`;

const AnimatedImage = animated(Image);
export const getImage = (img) => {
  const transitions = useTransition(img, img, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2000 },
  });
  return transitions.map(({ item, key, props }) => (
    <AnimatedImage key={key} src={item} style={props} />
  ));
};

export const SkeletonImage = styled(Skeleton)`
  // replicate animated Image with useTransition
  position: absolute;
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
    padding-left: 8%;
  }
  @media (min-width: 768px) {
    flex: 1.5;
    padding-left: 8%;
  }
`;

export const Status = styled.div`
  color: ${(props) => props.color || props.theme.colors.text};
  padding: 5% 0;
  font-size: 0.8rem;
  animation: ${fadeIn} 2s;
`;

export const Artist = styled.h3`
  margin: 0;
  color: ${(props) => props.color || props.theme.colors.secondary};
  text-transform: uppercase;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
  animation: ${fadeIn} 2s;
`;

export const Track = styled.div`
  color: ${(props) => props.color || props.theme.colors.text};
  font-style: italic;
  letter-spacing: 1px;
  animation: ${fadeIn} 2s;
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
  width: 2rem;
  height: 2rem;
  @media (min-width: 600px) {
    width: 5rem;
    height: 5rem;
  }
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const StyledSkeleton = styled(Skeleton)`
  display: inline-block;
`;

export const CenteredSkeleton = (props) => {
  return (
    <CenteredDiv>
      <StyledSkeleton {...props} />
    </CenteredDiv>
  );
};

const fadeInDelay = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
   }
   `;

export const CurrentTrackShadow = styled.div`
  //background-color: ${theme.colors.highlight};
  background-image: linear-gradient(135deg, #ffffff 2.38%, ${theme.colors.highlight} 2.38%, ${theme.colors.highlight} 50%, #ffffff 50%, #ffffff 52.38%, ${theme.colors.highlight} 52.38%, ${theme.colors.highlight} 100%);
  background-size: 29.70px 29.70px;
  margin: 0 auto;
  ${CURRENT_TRACK_SIZE.SMALL}
  @media (min-width: 600px) {
    ${CURRENT_TRACK_SIZE.MEDIUM}
  }
  @media (min-width: 768px) {
    ${CURRENT_TRACK_SIZE.LARGE}
  }
  transform: translate(5%, 5%);
  animation: ${fadeInDelay} 1.5s ease-in;
  `;

const slideInRight = keyframes`
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  `;

export const GetLyricsWrapper = styled.div`
  transform: translateX(0%);
  animation: ${slideInRight} 1.5s ease-in-out;
`;
