import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import parse from 'html-react-parser';

import OverlayBase from '../OverlayBase';
import UpArrow from '@material-ui/icons/KeyboardArrowUp';
import { ArrowWrapper, Extract } from './style';

export default function ArtistOverlay(props) {
  let { artist, handleClose, open } = props;
  artist = artist || {};
  let { extract, followers, img, name } = artist;
  if (extract) {
    // parse from html to react element to render links
    extract = parse(extract);
  }

  return (
    <OverlayBase open={open} handleClose={handleClose}>
      <>
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
          <Extract id="modal-description">{extract}</Extract>
        </div>
      </>
    </OverlayBase>
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

ArtistOverlay.propTypes = {
  artist: PropTypes.shape({
    extract: PropTypes.string,
    followers: PropTypes.number,
    img: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
