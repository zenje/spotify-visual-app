import React from 'react';
import { Bars, Bar1, Bar2, Bar3, Bar4 } from './style';

export default function MusicBar(props) {
  const { className, isPaused } = props;

  return (
    <Bars className={className}>
      <Bar1 isPaused={isPaused} />
      <Bar2 isPaused={isPaused} />
      <Bar3 isPaused={isPaused} />
      <Bar4 isPaused={isPaused} />
    </Bars>
  );
}
