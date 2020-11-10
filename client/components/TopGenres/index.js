import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useGetTopGenres } from '../../hooks/useGetTopGenres';
import {
  Genre,
  GenreBar,
  StyledAccordion as Accordion,
  StyledAccordionDetails as AccordionDetails,
  StyledAccordionSummary as AccordionSummary,
} from './style';

export default function TopGenres(props) {
  const timeRange = props.timeRange;
  const genres = useGetTopGenres(timeRange);

  return (
    <>
      {genres.map((item) => (
        <Accordion TransitionProps={{ unmountOnExit: true }} key={item[0]}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon fontSize="small" style={{ color: 'white' }} />
            }
          >
            <Genre>{item[0]}</Genre>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {item[1].map((artist) => (
                <span key={artist}>{artist}</span>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
