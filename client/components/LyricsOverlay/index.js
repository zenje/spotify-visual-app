import React from 'react';
import PropTypes from 'prop-types';

import OverlayBase from '../OverlayBase';

export default function LyricsOverlay(props) {
  let { handleClose, lyrics, open } = props;

  return (
    <OverlayBase open={open} handleClose={handleClose} slideDirection={'right'}>
      <div>{lyrics}</div>
    </OverlayBase>
  );
}

LyricsOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  lyrics: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};
