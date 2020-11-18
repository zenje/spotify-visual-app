import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSpring, config } from 'react-spring';
import { useGetTopGenres } from '../../hooks/useGetTopGenres';
import {
  AnimatedGenreBar,
  Container,
  Genre,
  GenreBar,
  GenreBarWrapper,
  StyledAccordion as Accordion,
  StyledAccordionDetails as AccordionDetails,
  StyledAccordionSummary as AccordionSummary,
} from './style';

export default function TopGenres(props) {
  const timeRange = props.timeRange;
  const genres = useGetTopGenres(timeRange);
  const topGenreCount = getTopGenreCount(genres);

  const animation = useSpring({
    percentage: '100%',
    from: { percentage: '0%' },
    config: config.molasses,
    reset: true,
    delay: 100,
  });

  return (
    genres && (
      <Container>
        {genres.map((item) => getAccordion(item, topGenreCount, animation))}
      </Container>
    )
  );
}

const getAccordion = (item, topGenreCount, animation) => {
  const genre = item[0];
  const artists = item[1];
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} key={genre}>
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon fontSize="small" style={{ color: 'white' }} />
        }
      >
        <Genre>{genre}</Genre>
        <GenreBarWrapper>
          <GenreBar
            width={getGenreBarPercentage(topGenreCount, artists.length)}
          >
            <AnimatedGenreBar style={{ width: animation.percentage }} />
          </GenreBar>
        </GenreBarWrapper>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {artists.map((artist) => (
            <span key={artist}>{artist}</span>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const getTopGenreCount = (genres) => {
  if (genres && genres.length > 0) {
    return genres[0][1].length;
  }
};

const getGenreBarPercentage = (topCount, count) => {
  return (count / topCount) * 100;
};

TopGenres.propTypes = {
  timeRange: PropTypes.string,
};
