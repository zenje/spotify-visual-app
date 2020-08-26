import styled, { keyframes } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

import theme from '../../styles/theme';
import CurrentTrack from '../CurrentTrack';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  overflow-wrap: break-word;
`;

export const WelcomeBanner = styled.div`
  background-color: white;
  width: 90%;
  margin-top: 10vh;
  //background-image: linear-gradient(135deg, ${theme.colors.highlight} 2.38%, #ffffff 2.38%, #ffffff 50%, ${theme.colors.highlight} 50%, ${theme.colors.highlight} 52.38%, #ffffff 52.38%, #ffffff 100%);
  //background-size: 29.70px 29.70px;
  -webkit-box-shadow: 20px 20px 0px 0px ${theme.colors.highlight};
  -moz-box-shadow: 20px 20px 0px 0px ${theme.colors.highlight};
  box-shadow: 20px 20px 0px 0px ${theme.colors.highlight};
  color: ${theme.colors.highlight};
  display: flex;
  flex-direction: row;
  justify-content: center;
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

export const welcomeAnimation = (windowWidth) => {
  const getFontSize = () => {
    if (windowWidth > 768) {
      return '5em';
    } else if (windowWidth > 320) {
      return '3em';
    }
    return '2em';
  };

  return useSpring({
    opacity: 1,
    fontSize: getFontSize(),
    from: {
      opacity: 0,
      fontSize: '1em',
    },
  });
};

export const AnimatedWelcome = animated(WelcomeBanner);

const fadeInDown = keyframes`
  0% {
     opacity: 0;
     transform: translateY(-20px);
  }
  100% {
     opacity: 1;
     transform: translateY(0);
   }
   `;

export const StyledCurrentTrack = styled(CurrentTrack)`
  margin: 0 auto;
  animation: ${fadeInDown} 0.5s ease-in-out;
`;
