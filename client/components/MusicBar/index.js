import React from 'react';
import { Bars, Bar1, Bar2, Bar3, Bar4 } from './style';

export default function MusicBar(props) {
  const { primary, secondary, className, isPaused } = props;

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
