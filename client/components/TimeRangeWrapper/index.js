import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import InfoIcon from '@material-ui/icons/Info';

import Tooltip from '../Tooltip';
import {
  ButtonRow,
  Header,
  StyledButton as Button,
  TooltipWrapper,
  Wrapper,
} from './style';
import { TIME_RANGES } from '../../constants';

export default function TimeRangeWrapper(props) {
  const { children, header, tooltip } = props;
  const [timeRange, setTimeRange] = useState(TIME_RANGES.LONG_TERM.timeRange);

  return (
    <Wrapper>
      <>{getDownArrow()}</>
      <Header>
        <>{header}</>
        {getTooltip(tooltip)}
      </Header>
      <ButtonRow>
        {Object.values(TIME_RANGES).map((item) => (
          <Button
            key={item.timeRange}
            color="primary"
            {...(item.timeRange === timeRange ? { disabled: true } : {})}
            onClick={() => {
              setTimeRange(item.timeRange);
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

const getDownArrow = () => (
  <Link to="/">
    <DownArrow fontSize="large" style={{ color: 'white' }} />
  </Link>
);

const getTooltip = (tooltip) => {
  if (tooltip) {
    return (
      <TooltipWrapper>
        <Tooltip text={tooltip} />
      </TooltipWrapper>
    );
  }
};

TimeRangeWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /**
    Title at the header of the page.
  **/
  header: PropTypes.string.isRequired,

  /**
    Tooltip text.
  **/
  tooltip: PropTypes.string,
};
