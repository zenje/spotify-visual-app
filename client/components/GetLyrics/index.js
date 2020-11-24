import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getLyrics } from '../../actions/lyricsActions';
import { Wrapper } from './style';

const TEXT = 'get lyrics';

export default function GetLyrics(props) {
  const { artistName, onClick, textColor, trackTitle } = props;
  const dispatch = useDispatch();

  const onClickFn = () => {
    if (onClick) {
      onClick();
    }
    dispatch(getLyrics(trackTitle, artistName));
  };
  return (
    <Wrapper textColor={textColor}>
      <a href="#" onClick={onClickFn}>
        {TEXT}
      </a>
    </Wrapper>
  );
}

GetLyrics.propTypes = {
  artistName: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  trackTitle: PropTypes.string.isRequired,
};
