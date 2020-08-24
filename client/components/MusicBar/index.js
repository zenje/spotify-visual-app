import React from 'react';
import { Bars, Bar1, Bar2, Bar3, Bar4 } from './style';

export default function MusicBar(props) {
  const { className } = props;

  return (
    <Bars className={className}>
      <Bar1 />
      <Bar2 />
      <Bar3 />
      <Bar4 />
    </Bars>
  );
}
