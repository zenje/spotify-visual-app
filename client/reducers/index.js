import { combineReducers } from 'redux';
import artistInfo from './artistInfo';
import lyrics from './lyrics';
import spotify from './spotify';

export default combineReducers({
  artistInfo,
  lyrics,
  spotify,
});
