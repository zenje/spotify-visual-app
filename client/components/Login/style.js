import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 1.5rem;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10rem);
  }
  
  80%, 85% {
    transform: translateY(0.5rem);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
   }
`;

export const Wrapper = styled.div`
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 30rem;
  max-height: 50%;
  height: 30rem;
  padding: 2rem;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const SpotifyWrapper = styled.div`
  //margin-top: 25%;
`;

export const SpotifySVG = styled.div`
  display: inline-block;
  max-width: 12rem;
  width: 12rem;
  height: 3rem;
`;

export const Tip = styled.div`
  //margin-top: auto;
`;
