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
import GetLyrics from '../GetLyrics';
import LyricsOverlay from '../LyricsOverlay';
import {
  Artist,
  ArtistTrackWrapper,
  CenteredSkeleton,
  Container,
  CurrentTrackShadow,
  getImage,
  GetLyricsWrapper,
  Left,
  MusicBarWrapper,
  Right,
  SkeletonImage,
  Status,
  Track,
  StyledMusicBar as MusicBar,
  Wrapper,
} from './style';

const nodeEnv = process.env.NODE_ENV;

export default function CurrentTrack(props) {
  let { artist, img, isLoading, name, status } = props;
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

  // temporary
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };
  const lyricsOnClick = () => {
    setIsOverlayOpen(true);
  };

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
      <Wrapper>
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
      {getTemporaryLink(name, artist, trackColor, lyricsOnClick)}
      <LyricsOverlay
        open={isOverlayOpen}
        handleClose={handleOverlayClose}
        slideDirection={'right'}
      />
    </Container>
  );
}

const getTemporaryLink = (name, artist, textColor, onClick) => {
  if (nodeEnv !== 'production' && name && artist) {
    return (
      <GetLyricsWrapper>
        <GetLyrics
          trackTitle={name}
          artistName={artist}
          textColor={textColor}
          onClick={onClick}
        />
      </GetLyricsWrapper>
    );
  }
  return null;
};

const fetchLyrics = async (track, artist) => {
  const response = await fetch(`/api/lyrics/${track}/${artist}`);
  if (response.status !== 200) {
    console.log('Unable to find lyrics');
    //throw Error(body.message);
  } else {
    const body = await response.json();
    console.log('body', body);
    return body;
  }
};

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
  img: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  status: PropTypes.string,
};
