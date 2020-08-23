import React from 'react';
import styled, { css, keyframes } from 'styled-components';

/*
const Breathe = () => {
 return (
  <Container>
   <Circle />
  </Container>
 )
}
export default Breathe
const breatheAnimation = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`
const Circle = styled.div`
 height: 100px;
 width: 100px;
 border-style: solid;
 border-width: 5px;
 border-radius: 50%;
 border-color: black;
 animation-name: ${breatheAnimation};
 animation-duration: 8s;
 animation-iteration-count: infinite;
`
const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 height: 450px;
 `
*/

const Bars = styled.div`
  width: ${(props) => `${props.barWidth * 5}px`};
  height: ${(props) => `${props.barWidth * 5}px`};
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
  width: ${(props) => `${props.barWidth}px`};
  position: absolute;
  bottom: 0;
`;

const Bar1 = styled(Bar)`
  background-color: yellow;
  height: ${(props) => `${props.barWidth * 3}px`};
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

const Bar2 = styled(Bar)`
  left: ${(props) => `${props.barWidth * 1.25}px`};
  float: left;
  background-color: orange;
  height: ${(props) => `${props.barWidth * 5}px`};
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

const Bar3 = styled(Bar)`
  left: ${(props) => `${props.barWidth * 2.5}px`};
  float: left;
  background-color: red;
  height: ${(props) => `${props.barWidth * 2.5}px`};
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

const Bar4 = styled(Bar)`
  left: ${(props) => `${props.barWidth * 3.75}px`};
  float: left;
  background-color: green;
  height: ${(props) => `${props.barWidth * 1.8}px`};
  animation: ${bar4} 0.6s infinite;
`;

export default function MusicBar(props) {
  const { barWidth, className } = props;

  return (
    <Bars className={className} barWidth={barWidth}>
      <Bar1 barWidth={barWidth} />
      <Bar2 barWidth={barWidth} />
      <Bar3 barWidth={barWidth} />
      <Bar4 barWidth={barWidth} />
    </Bars>
  );
}
