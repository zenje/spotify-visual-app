import styled, {keyframes} from 'styled-components';
import Container from '@material-ui/core/Container';

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20vh);
  }
  
  80%, 85% {
    transform: translateY(1vh);
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
  max-width: 500px;
  max-height: 50vh;
  height: 500px;
  width: 90%;
  padding: 5%;
  animation: ${fadeIn} 0.8s ease-in-out;
`;

export const SpotifyWrapper = styled.div`
  text-align: center;
  `;

export const SpotifySVG = styled.div`
  display: inline-block;
  max-width: 200px;
  width: 200px;
  height: 50px;
`;