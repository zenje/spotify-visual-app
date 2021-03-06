import React from 'react';
import PropTypes from 'prop-types';
import { ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  BottomMenuWrapper,
  CurrentTrackShadow,
  FooterWrapper,
  getWelcomeAnimation,
  Sparkle,
  StyledCurrentTrack as CurrentTrack,
  StyledRecentTracks as RecentTracks,
  WelcomeBanner,
  Wrapper,
} from './style';
import BottomMenu from '../BottomMenu';
import Footer from '../Footer';
import { useWindowSize } from '../../hooks/useWindowSize';
import { IS_LT_600W, RECENT_TRACKS_LIMIT } from '../../constants';

export default function Welcome(props) {
  const {
    user,
    currentTrack,
    isLoadingCurrentTrack,
    parallax,
    recentTracks,
  } = props;
  const { artist, name, img, status } = currentTrack;
  let size = useWindowSize();

  return (
    <Wrapper>
      <WelcomeBanner>
        <div>{`welcome, ${user}`}</div>
        <Sparkle>✨</Sparkle>
      </WelcomeBanner>
      <CurrentTrack
        artist={artist}
        name={name}
        img={img}
        isLoading={isLoadingCurrentTrack}
        status={status}
      />
      <RecentTracks
        tracks={recentTracks}
        trackLimit={getTrackLimit(size.height)}
      />
      <BottomMenuWrapper>
        <BottomMenu />
      </BottomMenuWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
}

const getRecentTracksOffset = (size) => {
  if (size.width > 600) {
    return 0.65;
  } else if (size.height > 700) {
    return 0.7;
  }
  return 0.99;
};

const getTrackLimit = (height) => {
  if (height > 736) {
    return RECENT_TRACKS_LIMIT;
  } else if (height > 700) {
    return RECENT_TRACKS_LIMIT - 3;
  } else if (height > 500) {
    return RECENT_TRACKS_LIMIT - 4;
  }
  return RECENT_TRACKS_LIMIT - 5;
};

Welcome.propTypes = {
  currentTrack: PropTypes.shape({
    artist: PropTypes.string,
    name: PropTypes.string,
    img: PropTypes.string,
    status: PropTypes.string,
  }),
  isLoadingCurrentTrack: PropTypes.bool,
  recentTracks: PropTypes.array,
  parallax: PropTypes.object,
  user: PropTypes.string,
};
