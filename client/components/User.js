import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyInfo, setTokens, getTopArtists } from '../actions/actions';
import Button from '@material-ui/core/Button';
import ArtistsGrid from './ArtistsGrid';

/**
 * Our user page
 * Displays the user's information
 */
function User({ user, getMyInfo, setTokens, getTopArtists, showArtistsGrid }) {
  let { accessToken, refreshToken, setCookies } = useParams();
  showArtistsGrid = false;

  /** When we mount, get the tokens from react-router and initiate loading the info */
  useEffect(() => {
    if (setCookies) {
      setTokens({ accessToken, refreshToken });
    }
    getMyInfo();
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
      <ArtistsGrid />
    </div>
  );
}

const mapStateToProps = ({ accessToken, refreshToken, user }, ownProps) => {
  return { accessToken, refreshToken, user };
};

// mapDispatchToProps - automatically calls bindActionCreators
const actionCreators = {
  getMyInfo,
  setTokens,
  getTopArtists,
};

export default connect(mapStateToProps, actionCreators)(User);
