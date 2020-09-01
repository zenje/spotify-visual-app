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
import {
  RECENT_TRACKS_LIMIT,
  IS_LT_600W,
  IS_LT_600W_415H,
} from '../../constants';

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
      <ParallaxLayer offset={IS_LT_600W_415H(size) ? 0.99 : 0.65} speed={0.3}>
        <RecentTracks
          tracks={recentTracks}
          trackLimit={getTrackLimit(size.height)}
        />
      </ParallaxLayer>
      <ParallaxLayer offset={IS_LT_600W_415H(size) ? 1.2 : 0.92} speed={0.2}>
        <DownArrow
          onClick={() => parallax.scrollTo(IS_LT_600W_415H(size) ? 1.45 : 1)}
        />
      </ParallaxLayer>
    </Wrapper>
  );
}

const getTrackLimit = (height) => {
  if (height > 800) {
    return RECENT_TRACKS_LIMIT;
  } else if (height > 500) {
    return RECENT_TRACKS_LIMIT - 3;
  }
  return RECENT_TRACKS_LIMIT - 4;
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
