import React, { useEffect, useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import * as Vibrant from 'node-vibrant';
import { TRACK_STATUS } from '../../constants';
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

  let [artistColor, setArtistColor] = useState(undefined);
  let [trackColor, setTrackColor] = useState(undefined);
  let [musicBarPrimaryColor, setMusicBarPrimaryColor] = useState(undefined);
  let [musicBarSecondaryColor, setMusicBarSecondaryColor] = useState(undefined);
  let [statusColor, setStatusColor] = useState(undefined);

  useEffect(() => {
    setColors(
      img,
      setArtistColor,
      setTrackColor,
      setMusicBarPrimaryColor,
      setMusicBarSecondaryColor,
      setStatusColor
    );
  }, [img]);

  return (
    <Wrapper className={className}>
      <Left>
        <Image src={img} />
      </Left>
      <Right>
        {size.width >= 600 ? (
          <Status color={statusColor}>&lt; {status} &gt;</Status>
        ) : null}
        <ArtistTrackWrapper>
          <Artist color={artistColor}>{artist}</Artist>
          <Track color={trackColor}>{name}</Track>
        </ArtistTrackWrapper>
        <MusicBarWrapper>
          <MusicBar
            primary={musicBarPrimaryColor}
            secondary={musicBarSecondaryColor}
            isPaused={isPaused(status)}
          />
        </MusicBarWrapper>
      </Right>
    </Wrapper>
  );
}

const isPaused = (status) => {
  return status === TRACK_STATUS.PAUSED || status === TRACK_STATUS.LAST_PLAYED;
};

const setColors = async (
  img,
  setArtistColor,
  setTrackColor,
  setMusicBarPrimaryColor,
  setMusicBarSecondaryColor,
  setStatusColor
) => {
  if (img) {
    let palette;
    try {
      palette = await Vibrant.from(img).getPalette();
    } catch (err) {
      console.error('error getting colors from image', err);
    }
    setArtistColor(palette['Vibrant'].getHex());
    setTrackColor(palette['DarkVibrant'].getHex());
    setMusicBarPrimaryColor(palette['LightVibrant'].getHex());
    setMusicBarSecondaryColor(palette['Vibrant'].getHex());
    setStatusColor(palette['Muted'].getHex());
  }
};
