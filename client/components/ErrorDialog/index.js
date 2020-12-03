import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';

import * as types from '../../actions/actionTypes';
import OverlayBase from '../OverlayBase';

export default function ErrorDialog() {
  const isOpen = useSelector((state) => state.errors.isOpen);
  const error = useSelector((state) => state.errors.error);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: types.HIDE_ERROR });
  };

  return (
    <OverlayBase open={isOpen} handleClose={handleClose}>
      <>
        <div>
          <ErrorIcon />
        </div>
        <div>{error}</div>
      </>
    </OverlayBase>
  );
}
