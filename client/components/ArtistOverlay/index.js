import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import styled from 'styled-components';
import Slide from '@material-ui/core/Slide';
import DownArrow from '@material-ui/icons/KeyboardArrowDown';
import { ArrowWrapper, Overlay, StyledModal } from './style';

const Fade = forwardRef((props, ref) => {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,50px,0)' },
    to: {
      opacity: open ? 1 : 0,
      transform: open ? 'translate3d(0,-50px,0)' : 'translate3d(0,50px,0)',
    },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

/*
Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};*/

export default function ArtistOverlay(props) {
  let { artist, handleClose, open } = props;
  artist = artist || {};
  let { extract, followers, img, name } = artist;
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,50px,0)' },
    to: {
      opacity: open ? 1 : 0,
      transform: open ? 'translate3d(0,-50px,0)' : 'translate3d(0,50px,0)',
    },
  });

  return (
    <StyledModal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="up" in={open} timeout={500} mountOnEnter unmountOnExit>
        <Overlay>
          <ArrowWrapper>
            <a onClick={handleClose} style={{ cursor: 'pointer' }}>
              <DownArrow />
            </a>
          </ArrowWrapper>
          <div className="overlay-wrapper">
            <div>
              <img src={img} />
            </div>
            <div>
              <span>{`Followers: ${followers}`}</span>
              <h2 id="spring-modal-title">{name}</h2>
              <p id="spring-modal-description">{extract}</p>
            </div>
          </div>
        </Overlay>
      </Slide>
    </StyledModal>
  );
}
