import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import UpArrow from '@material-ui/icons/KeyboardArrowUp';
import { ArrowWrapper, Overlay, StyledModal } from './style';

export default function ArtistOverlay(props) {
  let { artist, handleClose, open } = props;
  artist = artist || {};
  let { extract, followers, img, name } = artist;
  return (
    <StyledModal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 800,
      }}
    >
      <Slide
        direction="down"
        in={open}
        timeout={800}
        mountOnEnter
        unmountOnExit
      >
        <Overlay>
          <ArrowWrapper>
            <a onClick={handleClose} style={{ cursor: 'pointer' }}>
              <UpArrow style={{ verticalAlign: 'middle' }} />
            </a>
          </ArrowWrapper>
          <div className="overlay-wrapper">
            <div>
              <img src={img} />
            </div>
            <div>
              <span>{`Followers: ${followers}`}</span>
              <h2 id="modal-title">{name}</h2>
              <p id="modal-description">{extract}</p>
            </div>
          </div>
        </Overlay>
      </Slide>
    </StyledModal>
  );
}
