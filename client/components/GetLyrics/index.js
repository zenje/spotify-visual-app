import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

const TEXT = 'get lyrics';

export default function GetLyrics(props) {
  const { artistName, onClick, textColor, trackTitle } = props;
  return (
    <Wrapper textColor={textColor}>
      <a href="#" onClick={onClick}>
        {TEXT}
      </a>
    </Wrapper>
  );
  /*return (
    <Wrapper textColor={textColor}>
      <a href="#" onClick={() => fetchLyrics(trackTitle, artistName)}>
        {TEXT}
      </a>
    </Wrapper>
  );*/
}

const fetchLyrics = async (trackTitle, artistName) => {
  const response = await fetch(`/api/lyrics/${trackTitle}/${artistName}`);
  const body = await response.json();
  //console.log('response', response);
  console.log('body', body);
  if (response.status !== 200) {
    console.log(`Unable to find lyrics due to: ${body.error}`);
  } else {
    return body;
  }
};

GetLyrics.propTypes = {
  artistName: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  trackTitle: PropTypes.string.isRequired,
};
