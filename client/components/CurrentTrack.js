import React from 'react';

export default function CurrentTrack(props) {
  let { artist, img, song } = props;

  return (
    <div>
      <img src={img} />
      <span>{artist}</span>
      <span>{song}</span>
    </div>
  );
}
