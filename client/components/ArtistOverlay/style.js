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
  max-width: 30rem;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  transform: translate3d(0px, 50px, 0px);
  img {
    max-width: 30rem;
    height: auto;
    width: 100%;
  }
  .overlay-wrapper {
    overflow: scroll;
    background-color: white;
    border: 0.5rem white solid;
    margin: 1rem;
    padding: 0 1rem 1rem 1rem;
    word-break: break-word;
    text-align: center;
    white-space: pre-wrap; // preserve new lines for paragraphs
  }
  .extract {
    margin-top: 1rem;
  }
`;

export const ArrowWrapper = styled.div`
  background-color: white;
  width: 100%;
  top: 0%;
`;
