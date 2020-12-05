import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated, config } from 'react-spring';
import parse from 'html-react-parser';
import loadable from '@loadable/component';

import OverlayBase from '../OverlayBase';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Extract } from './style';

const ImageLoader = loadable(() => import('../ImageLoader'));

export default function ArtistOverlay(props) {
  let { artist, handleClose, open } = props;
  artist = artist || {};
  let { extract, followers, img, name } = artist;
  if (extract) {
    // parse from html to react element to render links
    extract = parse(extract);
  }

  return (
    <OverlayBase open={open} handleClose={handleClose} showArrow={true}>
      <>
        {img ? <ImageLoader img={img} isVisible={open} /> : null}
        <div>
          <h2 id="modal-title">{name}</h2>
          {followers ? (
            <span>
              <b>Followers:</b> <Followers count={followers} />
            </span>
          ) : null}
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
