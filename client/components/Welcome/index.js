import React from 'react';
import PropTypes from 'prop-types';
import { ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  CurrentTrackShadow,
  DownArrow,
  getWelcomeAnimation,
  Sparkle,
  StyledCurrentTrack as CurrentTrack,
  StyledRecentTracks as RecentTracks,
  WelcomeBanner,
  Wrapper,
} from './style';
import { useWindowSize } from '../../hooks/useWindowSize';
import { RECENT_TRACKS_LIMIT, IS_LT_600W } from '../../constants';

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
      <ParallaxLayer offset={0} speed={1.5}>
        <WelcomeBanner style={getWelcomeAnimation(size.width, user)}>
          {`welcome, ${user}`}
          <Sparkle>✨</Sparkle>
        </WelcomeBanner>
      </ParallaxLayer>
      <ParallaxLayer offset={IS_LT_600W(size) ? 0.23 : 0.29} speed={0.7}>
        <CurrentTrackShadow />
      </ParallaxLayer>
      <ParallaxLayer offset={IS_LT_600W(size) ? 0.2 : 0.26} speed={0.5}>
        <CurrentTrack
          artist={artist}
          name={name}
          img={img}
          isLoading={isLoadingCurrentTrack}
          status={status}
        />
      </ParallaxLayer>
      <ParallaxLayer offset={getRecentTracksOffset(size)} speed={0.3}>
        <RecentTracks
          tracks={recentTracks}
          trackLimit={getTrackLimit(size.height)}
        />
      </ParallaxLayer>
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
