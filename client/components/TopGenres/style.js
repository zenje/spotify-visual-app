import styled, { keyframes } from 'styled-components';
import { animated } from 'react-spring';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';

const fadeIn = keyframes`
    0% { opacity: 0; }
    100%   { opacity: 1; }
  }`;

export const Container = styled.div`
  padding-top: 1rem;
`;

export const Genre = styled.h2`
  color: white;
  margin: 0;
  width: 75%;
  text-align: right;
  padding-right: 1rem;
  @media (min-width: 600px) {
    width: 50%;
  }
`;

export const GenreBarWrapper = styled.div`
  width: 25%;
  margin: auto 0;
  @media (min-width: 600px) {
    width: 50%;
  }
`;

export const GenreBar = animated(styled.div`
  width: ${(props) => props.width}%;
`);

export const AnimatedGenreBar = animated(styled.div`
  background-color: white;
  height: 0.2rem;
`);

export const StyledAccordion = styled(Accordion)`
  background-color: ${(props) => props.theme.colors.highlight};
  box-shadow: none;
  border: 0;
  position: inherit; // unset position(?) to remove border
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  animation: ${fadeIn} 1.5s ease-in;
  padding-left: 1rem;
  text-align: left;
  margin: 0;
  border: 0;
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  color: white;
  text-align: center;
  div {
    display: flex;
    flex-wrap: wrap; // wrap and move additional items to next line
    justify-content: center; // center columns if wrapped
    margin: 0 auto;
  }
  span {
    margin-right: 1rem;
  }
`;
