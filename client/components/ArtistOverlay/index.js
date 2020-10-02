import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSpring, animated, config } from 'react-spring';

import Backdrop from '@material-ui/core/Backdrop';
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
          <div className="overlay-wrapper">
            <ArrowWrapper>
              <a onClick={handleClose} style={{ cursor: 'pointer' }}>
                <UpArrow style={{ verticalAlign: 'middle' }} />
              </a>
            </ArrowWrapper>
            <div>
              <img src={img} />
            </div>
            <div>
              <h2 id="modal-title">{name}</h2>
              <span>
                <b>Followers:</b> <Followers count={followers} />
              </span>
              <div className="extract" id="modal-description">
                {extract}
              </div>
            </div>
          </div>
        </Overlay>
      </Slide>
    </StyledModal>
  );
}

const Followers = ({ count }) => {
  const props = useSpring({
    number: count,
    from: { number: 0 },
    config: config.gentle,
  });
  return (
    <animated.span>
      {props.number.interpolate((num) => Math.floor(num).toLocaleString())}
    </animated.span>
  );
};
