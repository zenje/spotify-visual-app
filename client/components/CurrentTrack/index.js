import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks/useWindowSize';
import * as Vibrant from 'node-vibrant';
import {
  CURRENT_TRACK_IMAGE_LENGTH,
  TRACK_STATUS,
  SKELETON_GREY,
} from '../../constants';
import Typography from '@material-ui/core/Typography';
import {
  Artist,
  ArtistTrackWrapper,
  CenteredSkeleton,
  Container,
  CurrentTrackShadow,
  getImage,
  Left,
  MusicBarWrapper,
  Right,
  SkeletonImage,
  Status,
  Track,
  StyledMusicBar as MusicBar,
  Wrapper,
} from './style';

export default function CurrentTrack(props) {
  let { artist, className, img, isLoading, name, status } = props;
  const size = useWindowSize();
  let [isInitallyLoadingColors, setIsInitallyLoadingColors] = useState(true);
  let [artistColor, setArtistColor] = useState(undefined);
  let [trackColor, setTrackColor] = useState(undefined);
  let [musicBarPrimaryColor, setMusicBarPrimaryColor] = useState(SKELETON_GREY);
  let [musicBarSecondaryColor, setMusicBarSecondaryColor] = useState(
    SKELETON_GREY
  );
  let [statusColor, setStatusColor] = useState(undefined);
  const image = getImage(img); // must be called outside of conditional render because it calls useState hooks
  const showSkeleton = isLoading || isInitallyLoadingColors;
  const skeletonImageLength = getSkeletonImageLength(size);

  useEffect(() => {
    setColors(
      img,
      setArtistColor,
      setTrackColor,
      setMusicBarPrimaryColor,
      setMusicBarSecondaryColor,
      setStatusColor,
      setIsInitallyLoadingColors
    );
  }, [img]);

  return (
    <Container>
      <CurrentTrackShadow />
      <Wrapper className={className}>
        <Left>
          {showSkeleton ? (
            <SkeletonImage
              variant="rect"
              width={skeletonImageLength}
              height={skeletonImageLength}
            />
          ) : (
            image
          )}
        </Left>
        <Right>
          {size.width >= 600 ? (
            showSkeleton ? (
              <CenteredSkeleton variant="text" width="30%" />
            ) : (
              <Status color={statusColor}>&lt; {status} &gt;</Status>
            )
          ) : null}
          <ArtistTrackWrapper>
            {showSkeleton ? (
              <Typography variant="h3">
                <CenteredSkeleton width="50%" />
              </Typography>
            ) : (
              <Artist color={artistColor}>{artist}</Artist>
            )}
            {showSkeleton ? (
              <CenteredSkeleton variant="text" width="45%" />
            ) : (
              <Track color={trackColor}>{name}</Track>
            )}
          </ArtistTrackWrapper>
          <MusicBarWrapper>
            <MusicBar
              primary={musicBarPrimaryColor}
              secondary={musicBarSecondaryColor}
              isPaused={isPaused(status, showSkeleton)}
            />
          </MusicBarWrapper>
        </Right>
      </Wrapper>
    </Container>
  );
}

const isPaused = (status, isLoading) => {
  return (
    isLoading ||
    status === TRACK_STATUS.PAUSED ||
    status === TRACK_STATUS.LAST_PLAYED
  );
};

const getSkeletonImageLength = (size) => {
  return size.width >= 600
    ? CURRENT_TRACK_IMAGE_LENGTH.MEDIUM
    : CURRENT_TRACK_IMAGE_LENGTH.SMALL;
};

const setColors = async (
  img,
  setArtistColor,
  setTrackColor,
  setMusicBarPrimaryColor,
  setMusicBarSecondaryColor,
  setStatusColor,
  setIsInitallyLoadingColors
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
    setIsInitallyLoadingColors(false);
  }
};

CurrentTrack.propTypes = {
  artist: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string,
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  status: PropTypes.string,
};
