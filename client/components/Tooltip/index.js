import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import { Tooltip as MuiTooltip } from '@material-ui/core';
import { Popper } from './style';

export default function Tooltip(props) {
  const { text } = props;
  const [open, setOpen] = useState(false);

  return (
    <MuiTooltip
      title={getPopper(text)}
      onClick={getOnClick(setOpen)}
      open={open}
    >
      <InfoIcon fontSize="small" style={{ color: 'white' }} />
    </MuiTooltip>
  );
}

// returns click handler to open tooltip for 3s
const getOnClick = (setOpen) => () => {
  setOpen(true);
  setTimeout(() => setOpen(false), 3000);
};

const getPopper = (text) => <Popper>{text}</Popper>;

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};
