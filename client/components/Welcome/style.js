import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';

import theme from '../../styles/theme';
import { CURRENT_TRACK_SIZE, WRAPPER_MAX_WIDTH } from '../../constants';
import CurrentTrack from '../CurrentTrack';
import RecentTracks from '../RecentTracks';

const fadeInDown = keyframes`
  0% {
     opacity: 0;
     transform: translateY(-1.5rem);
  }
  100% {
     opacity: 1;
     transform: translateY(0);
   }
   `;

export const Wrapper = styled.div`
  max-width: ${WRAPPER_MAX_WIDTH};
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow-wrap: break-word;
`;

export const WelcomeBanner = styled.div`
  animation: ${fadeInDown} 0.5s ease-in-out;
  background-color: white;
  color: ${theme.colors.highlight};
  width: 100%;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  margin: 3vh auto;
  font-size: 1.5rem;
  @media (min-width: 600px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 3rem;
    min-height: 3rem;
  }
`;

const sparkleBob = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
  `;

export const Sparkle = styled.div`
  padding: 0 2%;
  animation: ${sparkleBob} 0.8s ease-in-out infinite;
  line-height: 100%; // keep height from expanding vertically
`;

export const getWelcomeAnimation = (width, str) => {
  const strLength = str.length;
  const getFontSize = () => {
    if (width > 1280) {
      if (strLength < 20) {
        return '5rem';
      } else {
        return '4rem';
      }
    }
    if (width > 768) {
      if (strLength < 20) {
        return '4rem';
      } else {
        return '3rem';
      }
    } else if (width > 600) {
      if (strLength < 20) {
        return '3rem';
      } else {
        return '2rem';
      }
    } else if (width > 375) {
      if (strLength < 20) {
        return '2rem';
      } else {
        return '1rem';
      }
    }
    return '1rem';
  };

  return useSpring({
    opacity: 0.8,
    fontSize: getFontSize(),
    from: {
      opacity: 0,
      fontSize: '1rem',
    },
  });
};

const fadeInDown2 = keyframes`
  0% {
     opacity: 0;
     transform: translateY(-1.5rem);
  }
  50% {
     opacity: 0;
     transform: translateY(-1.5rem);
  }
  100% {
     opacity: 1;
     transform: translateY(0);
   }
   `;

export const StyledCurrentTrack = styled(CurrentTrack)`
  animation: ${fadeInDown2} 1s ease-in-out;
`;

const fadeInUp = keyframes`
  0% {
     opacity: 0;
     transform: translateY(1.5rem);
  }
  66% {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  100% {
     opacity: 1;
     transform: translateY(0);
   }
   `;

export const StyledRecentTracks = styled(RecentTracks)`
  margin: 5vh auto;
  animation: ${fadeInUp} 1.5s ease-in-out;
`;

export const BottomMenuWrapper = styled.div`
  animation: ${fadeInUp} 2s ease-in-out;
`;
