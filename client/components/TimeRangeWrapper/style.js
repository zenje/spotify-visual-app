import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { WRAPPER_MAX_WIDTH } from '../../constants';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  min-height: 100vh; // default height, before content is loaded
  text-align: center;
  padding-bottom: 1.5em;
  width: 100%;
  max-width: ${WRAPPER_MAX_WIDTH};
  margin: 0 auto;
`;

export const ButtonRow = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Header = styled.h1`
  color: white;
  padding: 0.5rem;
  padding-top: 1rem;
  margin: 0 auto;
`;

export const StyledButton = styled(Button)`
  color: ${(props) => props.theme.colors.primary};
  font-family: inherit;
  font-weight: bold;
`;

export const TooltipWrapper = styled.span`
  padding: 0 1rem;
`;
