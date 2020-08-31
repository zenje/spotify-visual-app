import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
} from '../../actions/actions';
import ArtistsGridWrapper from '../ArtistsGridWrapper';
import InitialLoader from '../loaders/InitialLoader';
import Welcome from '../Welcome';
import { StyledContainer } from './style';

export default function Main() {
  const { accessToken, refreshToken, setCookies } = useParams();
  const [showLoadingBar, setShowLoadingBar] = useState(true);
  const [parallax, setParallax] = useState(undefined);
  const size = useWindowSize();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentTrack = useSelector((state) => state.currentTrack);
  const recentTracks = useSelector((state) => state.recentTracks);
  const isLoadingCurrentTrack = useSelector(
    (state) => state.isLoadingCurrentTrack
  );
  const isNewCurrentTrack = useSelector((state) => state.isNewCurrentTrack);

  useEffect(() => {
    // on initial render, show loading bar and delay rendering page for 2s
    setTimeout(() => setShowLoadingBar(false), 2000);

    dispatch(setTokens(accessToken, refreshToken, setCookies));
    dispatch(getMyInfo());

    dispatch(getMyRecentlyPlayedTracks());
    // delay fetching current track by 0.5s
    setTimeout(() => dispatch(getCurrentPlayingTrack()), 500);
    // poll current track every 5s
    const interval = setInterval(
      () => dispatch(getCurrentPlayingTrack()),
      5000
    );

    // clean-up set interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNewCurrentTrack) {
      console.log('getMyRecentlyPlayedTracks AGAIN');
      // after 10s, update recently played tracks
      setTimeout(() => dispatch(getMyRecentlyPlayedTracks()), 10000);
    }
  }, [isNewCurrentTrack]);

  const { loading, display_name } = user;
  if (loading || showLoadingBar) {
    return (
      <StyledContainer>
        <InitialLoader />
      </StyledContainer>
    );
  }

  return (
    <Parallax pages={4} ref={(ref) => setParallax(ref)}>
      <ParallaxLayer offset={0}>
        <Welcome
          user={display_name}
          currentTrack={currentTrack}
          isLoadingCurrentTrack={isLoadingCurrentTrack}
          recentTracks={recentTracks}
          parallax={parallax}
        />
      </ParallaxLayer>
      <ParallaxLayer offset={size.height < 415 || size.width < 600 ? 1.45 : 1}>
        <ArtistsGridWrapper />
      </ParallaxLayer>
    </Parallax>
  );
}
