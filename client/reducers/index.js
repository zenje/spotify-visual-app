import { combineReducers } from 'redux';
import artistInfo from './artistInfo';
import errors from './errors';
import lyrics from './lyrics';
import spotify from './spotify';

export default combineReducers({
  artistInfo,
  errors,
  lyrics,
  spotify,
});
