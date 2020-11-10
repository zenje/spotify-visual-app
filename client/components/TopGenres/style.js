import styled, { keyframes } from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';

export const Genre = styled.h2`
  color: white;
  margin: 0;
  width: 50%;
`;

export const GenreBar = styled.div`
  background-color: white;
  margin: auto 0;
  height: 0.2rem;
  width: 50%;
`;

export const StyledAccordion = styled(Accordion)`
  background-color: ${(props) => props.theme.colors.highlight};
  box-shadow: none;
  border: 0;
  position: inherit; // unset position(?) to remove border
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
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
