import styled from 'styled-components';
import { BounceLoader } from 'halogenium';

export const LoaderDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Loader = styled(BounceLoader)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
