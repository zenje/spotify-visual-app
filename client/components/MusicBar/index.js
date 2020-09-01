import React from 'react';
import PropTypes from 'prop-types';
import { Bars, Bar1, Bar2, Bar3, Bar4 } from './style';

export default function MusicBar(props) {
  const { className, isPaused, primary, secondary } = props;

  return (
    <Bars className={className}>
      {renderBars(primary, secondary, isPaused)}
    </Bars>
  );
}

const renderBars = (primary, secondary, isPaused) => (
  <div>
    <Bar1 primary={primary} secondary={secondary} isPaused={isPaused} />
    <Bar2 primary={primary} secondary={secondary} isPaused={isPaused} />
    <Bar3 primary={primary} secondary={secondary} isPaused={isPaused} />
    <Bar4 primary={primary} secondary={secondary} isPaused={isPaused} />
  </div>
);

MusicBar.propTypes = {
  className: PropTypes.string,
  isPaused: PropTypes.bool.isRequired,
  primary: PropTypes.string,
  secondary: PropTypes.string,
};
