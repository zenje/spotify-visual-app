import React from 'react';
import { Image, Right, StyledMusicBar as MusicBar, Wrapper } from './style';

export default function CurrentTrack(props) {
  let { artist, className, img, song } = props;

  return (
    <Wrapper className={className}>
      <div>
        <Image src={img} />
      </div>
      <Right>
        <div>{artist}</div>
        <div>{song}</div>
        <MusicBar />
      </Right>
    </Wrapper>
  );
}
