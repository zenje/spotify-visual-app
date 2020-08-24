import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
} from '../actions/actions';
import ArtistsGridWrapper from './ArtistsGridWrapper';
import Welcome from './Welcome/index';

const StyledContainer = styled(Container)`
  background-color: lightgrey;
`;

function User({
  user,
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
  showArtistsGrid,
}) {
  let { accessToken, refreshToken, setCookies } = useParams();
  showArtistsGrid = false;

  /** When we mount, get the tokens from react-router and initiate loading the info */
  useEffect(() => {
    setTokens(accessToken, refreshToken, setCookies);
    getMyInfo();
    getCurrentPlayingTrack();
    getMyRecentlyPlayedTracks();
  }, []);

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

  const displayArtistsGrid = () => {
    showArtistsGrid = true;
  };

  return (
    <StyledContainer>
      <Welcome
        user={display_name}
        currentTrack={{
          artist: 'Summer Salt',
          song: 'Heart and My Car',
          img:
            'https://i.scdn.co/image/ab67616d0000b273d3f12993a820865791b73722',
        }}
      />
      <ArtistsGridWrapper />
    </StyledContainer>
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

const mapStateToProps = ({ accessToken, refreshToken, user }, ownProps) => {
  return { accessToken, refreshToken, user };
};

// mapDispatchToProps - automatically calls bindActionCreators
const actionCreators = {
  getMyInfo,
  getCurrentPlayingTrack,
  getMyRecentlyPlayedTracks,
  setTokens,
};

export default connect(mapStateToProps, actionCreators)(User);
