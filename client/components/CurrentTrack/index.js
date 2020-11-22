import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks/useWindowSize';
import * as Vibrant from 'node-vibrant';

import { closeLyricsOverlay } from '../../actions/lyricsActions';
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
  const dispatch = useDispatch();
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

  const lyrics = useSelector((state) => state.lyrics.text || '');
  const lyricsImg = useSelector((state) => state.lyrics.img || undefined);
  const isLyricsOpen = useSelector((state) => state.lyrics.isOverlayOpen);
  const handleLyricsClose = () => {
    dispatch(closeLyricsOverlay());
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
        <Left>{getTrackArt(showSkeleton, skeletonImageLength, image)}</Left>
        <Right>
          {getStatus(showSkeleton, size, statusColor, status)}
          {getArtistTrackInfo(
            showSkeleton,
            artistColor,
            artist,
            trackColor,
            name
          )}
          {getMusicBar(
            musicBarPrimaryColor,
            musicBarSecondaryColor,
            status,
            showSkeleton
          )}
        </Right>
      </Wrapper>
      {getGetLyrics(name, artist, trackColor)}
      {getLyricsOverlay(
        handleLyricsClose,
        lyrics,
        lyricsImg,
        isLyricsOpen,
        trackColor
      )}
    </Container>
  );
}

const getTrackArt = (showSkeleton, skeletonImageLength, image) =>
  showSkeleton ? (
    <SkeletonImage
      variant="rect"
      width={skeletonImageLength}
      height={skeletonImageLength}
    />
  ) : (
    image
  );

const getStatus = (showSkeleton, size, color, status) =>
  size.width >= 600 ? (
    showSkeleton ? (
      <CenteredSkeleton variant="text" width="30%" />
    ) : (
      <Status color={color}>&lt; {status} &gt;</Status>
    )
  ) : null;

const getArtistTrackInfo = (
  showSkeleton,
  artistColor,
  artist,
  trackColor,
  name
) => (
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
);

const getMusicBar = (primary, secondary, status, showSkeleton) => (
  <MusicBarWrapper>
    <MusicBar
      primary={primary}
      secondary={secondary}
      isPaused={isPaused(status, showSkeleton)}
    />
  </MusicBarWrapper>
);

const getGetLyrics = (name, artist, textColor) => {
  if (nodeEnv !== 'production' && name && artist) {
    return (
      <GetLyricsWrapper>
        <GetLyrics
          trackTitle={name}
          artistName={artist}
          textColor={textColor}
        />
      </GetLyricsWrapper>
    );
  }
  return null;
};

const getLyricsOverlay = (handleClose, lyrics, img, isOpen, textColor) => (
  <LyricsOverlay
    handleClose={handleClose}
    img={img}
    lyrics={lyrics}
    open={isOpen}
    textColor={textColor}
  />
);

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
