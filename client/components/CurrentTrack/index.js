import React, { useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  Artist,
  ArtistTrackWrapper,
  Image,
  Left,
  MusicBarWrapper,
  Right,
  Status,
  Track,
  StyledMusicBar as MusicBar,
  Wrapper,
} from './style';

export default function CurrentTrack(props) {
  let { artist, className, img, name, status } = props;
  const size = useWindowSize();

  if (size.width < 600) {
    return (
      <Wrapper className={className}>
        <Left>
          <Image src={img} />
        </Left>
        <Right>
          <ArtistTrackWrapper>
            <Artist>{artist}</Artist>
            <Track>{name}</Track>
          </ArtistTrackWrapper>
          <MusicBarWrapper>
            <MusicBar />
          </MusicBarWrapper>
        </Right>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className={className}>
        <Left>
          <Image src={img} />
        </Left>
        <Right>
          <Status>&lt;{status}&gt;</Status>
          <ArtistTrackWrapper>
            <Artist>{artist}</Artist>
            <Track>{name}</Track>
          </ArtistTrackWrapper>
          <MusicBarWrapper>
            <MusicBar />
          </MusicBarWrapper>
        </Right>
      </Wrapper>
    );
  }
}
