import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const StyledModal = styled(Modal)`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: center;
  outline: 0;
  > div {
    border: 0;
    outline: none;
  }
`;

export const Overlay = styled.div`
  background-color: white;
  margin: 1rem;
  border: 0.5rem white solid;
  border-top-width: 0;
  padding: 0 1rem 1rem;
  max-width: 30rem;
  height: 90vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; // center, align across horizontal axis
  transform: translate3d(0px, 50px, 0px);
  img {
    max-width: 100%;
    height: auto;
  }
  .overlay-wrapper {
    overflow: scroll;
  }
`;

export const ArrowWrapper = styled.div`
  background-color: white;
  width: 100%;
  top: 0%;
`;
