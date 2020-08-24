import styled from 'styled-components';
import CurrentTrack from '../CurrentTrack/index';

export const Wrapper = styled.div`
  color: palevioletred;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  overflow-wrap: break-word;
`;

export const StyledCurrentTrack = styled(CurrentTrack)`
  max-width: 90%;
  width: 500px;
  margin: 0 auto;
`;

export const animation = {
  opacity: 1,
  fontSize: '5em',
  from: {
    opacity: 0,
    fontSize: '1em',
  },
};
