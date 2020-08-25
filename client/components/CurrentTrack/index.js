import React from 'react';
import {
  Artist,
  Image,
  Left,
  MusicBarWrapper,
  Right,
  Song,
  StyledMusicBar as MusicBar,
  Wrapper,
} from './style';

export default function CurrentTrack(props) {
  let { artist, className, img, song } = props;

  return (
    <Wrapper className={className}>
      <Left>
        <Image src={img} />
      </Left>
      <Right>
        <Artist>{artist}</Artist>
        <Song>{song}</Song>
        <MusicBarWrapper>
          <MusicBar />
        </MusicBarWrapper>
      </Right>
    </Wrapper>
  );
}
