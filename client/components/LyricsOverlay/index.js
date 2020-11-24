import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import OverlayBase from '../OverlayBase';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Image, Lyrics, Wrapper } from './style';

const ImageLoader = loadable(() => import('../ImageLoader'));

export default function LyricsOverlay(props) {
  const { handleClose, img, lyrics, open, textColor } = props;

  return (
    <OverlayBase open={open} handleClose={handleClose} slideDirection={'right'}>
      <Wrapper>
        {img ? <ImageLoader img={img} isVisible={open} /> : null}
        <Lyrics textColor={textColor}>{lyrics}</Lyrics>
      </Wrapper>
    </OverlayBase>
  );
}

LyricsOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  img: PropTypes.string,
  lyrics: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  textColor: PropTypes.string,
};
