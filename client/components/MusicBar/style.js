import styled, { css, keyframes } from 'styled-components';

export const Bars = styled.div`
  position: relative;
`;

const bar1 = keyframes`
  0% {
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
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  `;

const Bar = styled.div`
  float: left;
  width: 22%;
  position: absolute;
  bottom: 0;
`;

export const Bar1 = styled(Bar)`
  background-color: yellow;
  height: 60%;
  animation: ${bar1} 1s infinite;
`;

const bar2 = keyframes`
  0% {
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
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  `;

export const Bar2 = styled(Bar)`
  left: 24%;
  float: left;
  background-color: orange;
  height: 100%;
  animation: ${bar2} 0.8s infinite;
`;

const bar3 = keyframes`
  0% {
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
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  `;

export const Bar3 = styled(Bar)`
  left: 48%;
  float: left;
  background-color: red;
  height: 50%;
  animation: ${bar3} 1.2s infinite;
`;

const bar4 = keyframes`
  0% {
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
  100% {
    transform: scaleY(1);
    transform-origin: 0% 100%;
  }
  `;

export const Bar4 = styled(Bar)`
  left: 72%;
  float: left;
  background-color: green;
  height: 35%;
  animation: ${bar4} 0.6s infinite;
`;
