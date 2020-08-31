import styled from 'styled-components';
import { animated } from 'react-spring';

export const Wrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const Percentage = styled.div`
  color: ${(props) => props.theme.colors.highlight};
  position: relative;
  bottom: -0.7em;
  z-index: 2;
  font-weight: bold;
`;

export const PercentageSpan = animated(styled.span`
  background-color: ${(props) => props.theme.colors.background};
  padding: 2%;
`);

export const Bar = animated(styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  margin: 0 auto;
  height: 0.2em;
`);
