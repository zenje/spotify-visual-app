import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import { Overlay, StyledModal as Modal } from './style';

export default function OverlayBase(props) {
  let { children, handleClose, slideDirection, open } = props;

  return (
    <Modal
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
        direction={slideDirection || 'down'}
        in={open}
        timeout={800}
        mountOnEnter
        unmountOnExit
      >
        <Overlay>
          <div className="overlay-wrapper">{children}</div>
        </Overlay>
      </Slide>
    </Modal>
  );
}

OverlayBase.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  slideDirection: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  open: PropTypes.bool.isRequired,
};
