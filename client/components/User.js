import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons';

import {
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
} from '../actions/actions';
import theme from '../styles/theme';
import ArtistsGridWrapper from './ArtistsGridWrapper';
import Welcome from './Welcome/index';

function User({
  user,
  currentTrack,
  recentTracks,
  isNewCurrentTrack,
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
  showArtistsGrid,
}) {
  let { accessToken, refreshToken, setCookies } = useParams();
  const size = useWindowSize();

  useEffect(() => {
    setTokens(accessToken, refreshToken, setCookies);
    getMyInfo();

    // poll current-track every 5s
    getCurrentPlayingTrack();
    getMyRecentlyPlayedTracks();
    const interval = setInterval(getCurrentPlayingTrack, 5000);

    // clean-up
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNewCurrentTrack) {
      console.log('getMyRecentlyPlayedTracks AGAIN');
      // after 10s, update recently played tracks
      setTimeout(getMyRecentlyPlayedTracks, 10000);
    }
  }, [isNewCurrentTrack]);

  /** Render the user's info */
  const {
    loading,
    display_name,
    images,
    id,
    email,
    external_urls,
    href,
    country,
    product,
  } = user;
  const imageUrl = images[0] ? images[0].url : '';
  // if we're still loading, indicate such
  if (loading) {
    return <h2>Loading...</h2>;
  }

  let parallax;
  return (
    <Parallax pages={4} ref={(ref) => (parallax = ref)}>
      <ParallaxLayer offset={0}>
        <Welcome
          user={display_name}
          currentTrack={currentTrack}
          recentTracks={recentTracks}
        />
      </ParallaxLayer>
      <ParallaxLayer offset={size.width < 600 ? 1.5 : 1}>
        <ArtistsGridWrapper />
      </ParallaxLayer>
    </Parallax>
  );
  /*
  return (
    <div className="user">
      <h2>{`Logged in as ${display_name}`}</h2>
      <div className="user-content">
        <img src={imageUrl} />
        <ul>
          <li>
            <span>Display name</span>
            <span>{display_name}</span>
          </li>
          <li>
            <span>Id</span>
            <span>{id}</span>
          </li>
          <li>
            <span>Email</span>
            <span>{email}</span>
          </li>
          <li>
            <span>Spotify URI</span>
            <span>
              <a href={external_urls.spotify}>{external_urls.spotify}</a>
            </span>
          </li>
          <li>
            <span>Link</span>
            <span>
              <a href={href}>{href}</a>
            </span>
          </li>
          <li>
            <span>Profile Image</span>
            <span>
              <a href={imageUrl}>{imageUrl}</a>
            </span>
          </li>
          <li>
            <span>Country</span>
            <span>{country}</span>
          </li>
          <li>
            <span>Product</span>
            <span>{product}</span>
          </li>
        </ul>
      </div>
      <Button
        variant="contained"
        onClick={() => {
          alert('clicked');
          displayArtistsGrid();
        }}
      >
        Get Top Artists
      </Button>
      <ArtistsGridWrapper />
    </div>
  );
  */
}

const mapStateToProps = (
  {
    accessToken,
    refreshToken,
    user,
    currentTrack,
    recentTracks,
    isNewCurrentTrack,
  },
  ownProps
) => {
  return {
    accessToken,
    refreshToken,
    user,
    currentTrack,
    recentTracks,
    isNewCurrentTrack,
  };
};

// mapDispatchToProps - automatically calls bindActionCreators
const actionCreators = {
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
};

export default connect(mapStateToProps, actionCreators)(User);
