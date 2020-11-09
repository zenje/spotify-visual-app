import { combineReducers } from 'redux';
import artistInfo from './artistInfo';
import spotify from './spotify';

export default combineReducers({
  artistInfo,
  spotify,
});
