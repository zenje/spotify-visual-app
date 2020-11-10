import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { WRAPPER_MAX_WIDTH } from '../../constants';

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${WRAPPER_MAX_WIDTH};
  height: 90vh;
`;

export const StyledWrapper = styled.div`
  margin: 0;
  max-width: 100% !important;
  overflow-x: hidden !important;
`;
