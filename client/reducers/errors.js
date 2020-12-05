import * as types from '../actions/actionTypes';

const initialState = {
  error: null,
  isOpen: false,
};

export default function reduce(state = initialState, action) {
  const { error, type } = action;

  if (error) {
    return {
      error,
      isOpen: true,
    };
  } else if (type === types.HIDE_ERROR) {
    // keep error in state so when ErrorDialog closes, the transition is smooth
    return Object.assign({}, state, { isOpen: false });
  }

  return state;
}
