import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 1rem;
`;

export const Lyrics = styled.div`
  padding-top: 1rem;
  color: ${(props) => props.textColor || props.theme.colors.text};
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
  animation: ${fadeIn} 2s;
`;

export const SkeletonWrapper = styled.div`
  max-width: 100%;
  .innerContainer {
    width: 100%;
    height: auto;
  }
`;
