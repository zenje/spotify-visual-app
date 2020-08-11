import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import ArtistsGrid from './ArtistsGrid';
import { TIME_RANGES } from '../constants';

function ArtistsGridWrapper() {
  const [timeRange, setTimeRange] = useState(TIME_RANGES.LONG_TERM.timeRange);

  return (
    <div>
      {Object.values(TIME_RANGES).map((item) => (
        <Button
          key={item.timeRange}
          variant="contained"
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
      <ArtistsGrid timeRange={timeRange} />
    </div>
  );
}

export default ArtistsGridWrapper;
