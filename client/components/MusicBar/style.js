import styled, { keyframes } from 'styled-components';

const BAR_WIDTH = 22;

export const Bars = styled.div`
  position: relative;
`;

const Bar = styled.div`
  float: left;
  width: ${BAR_WIDTH}%;
  position: absolute;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.primary || 'white'};
`;

const getPlayState = (props) => (props.isPaused ? 'paused' : 'running');

const bar1 = keyframes`
  0%, 100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  50% {
    transform: scaleY(0.3);
    transform-origin: 0% 100%;
  }
  90% {
    transform: scaleY(0.95);
    transform-origin: 0% 100%;
  }
  `;

export const Bar1 = styled(Bar)`
  height: 60%;
  animation: ${bar1} 1s infinite;
  animation-play-state: ${(props) => getPlayState(props)};
`;

const bar2 = keyframes`
  0%, 100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  50% {
    transform: scaleY(0.3);
    transform-origin: 0% 100%;
  }
  90% {
    transform: scaleY(0.95);
    transform-origin: 0% 100%;
  }
  `;

export const Bar2 = styled(Bar)`
  left: ${BAR_WIDTH + 2}%;
  height: 100%;
  animation: ${bar2} 0.8s infinite;
  animation-play-state: ${(props) => getPlayState(props)};
`;

const bar3 = keyframes`
  0%, 100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  50% {
    transform: scaleY(0.1);
    transform-origin: 0% 100%;
  }
  90% {
    transform: scaleY(0.95);
    transform-origin: 0% 100%;
  }
  `;

export const Bar3 = styled(Bar)`
  left: ${(BAR_WIDTH + 2) * 2}%;
  height: 50%;
  animation: ${bar3} 1.2s infinite;
  animation-play-state: ${(props) => getPlayState(props)};
`;

const bar4 = keyframes`
  0%, 100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  50% {
    transform: scaleY(0.3);
    transform-origin: 0% 100%;
  }
  90% {
    transform: scaleY(0.95);
    transform-origin: 0% 100%;
  }
  95% {
    transform: scaleY(0.99);
    transform-origin: 0% 100%;
  }
  `;

export const Bar4 = styled(Bar)`
  left: ${(BAR_WIDTH + 2) * 3}%;
  left: 72%;
  height: 35%;
  animation: ${bar4} 0.6s infinite;
  animation-play-state: ${(props) => getPlayState(props)};
`;
