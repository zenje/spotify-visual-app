import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import ArtistsGrid from './ArtistsGrid';
import { TIME_RANGES } from '../constants';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  text-align: center;
`;

const ButtonRow = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Header = styled.h1`
  color: white; // ${(props) => props.theme.colors.text};
  //border-bottom: 2px solid white; // ${(props) =>
    props.theme.colors.secondary};
  width: 40%;
  padding: 0.5em;
  margin: 0 auto;
  padding-top: 10vh;
`;

function ArtistsGridWrapper() {
  const [timeRange, setTimeRange] = useState(TIME_RANGES.LONG_TERM.timeRange);

  return (
    <Wrapper>
      <Header>Your Top Artists</Header>
      <ButtonRow>
        {Object.values(TIME_RANGES).map((item) => (
          <Button
            key={item.timeRange}
            color="primary"
            {...(item.timeRange === timeRange ? { disabled: true } : {})}
            onClick={() => {
              setTimeRange(item.timeRange);
              alert('clicked ' + item.timeRange);
            }}
          >
            {item.text}
          </Button>
        ))}
      </ButtonRow>
      <ArtistsGrid timeRange={timeRange} />}
    </Wrapper>
  );
}

export default ArtistsGridWrapper;
