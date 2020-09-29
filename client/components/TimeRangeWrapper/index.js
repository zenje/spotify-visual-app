import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import Button from '@material-ui/core/Button';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';

import ArtistsGrid from '../ArtistsGrid';
import { ButtonRow, Header, StyledButton as Button, Wrapper } from './style';
import { TIME_RANGES } from '../../constants';

export default function TimeRangeWrapper(props) {
  const { children, header } = props;
  const [timeRange, setTimeRange] = useState(TIME_RANGES.LONG_TERM.timeRange);

  return (
    <Wrapper>
      <div>
        <Link to="/">
          <DownArrow fontSize="large" style={{ color: 'white' }} />
        </Link>
      </div>
      <Header>{header}</Header>
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
      {React.cloneElement(children, { timeRange })}
    </Wrapper>
  );
}
