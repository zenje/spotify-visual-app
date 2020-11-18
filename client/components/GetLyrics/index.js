import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './style';

const TEXT = 'get lyrics';

export default function GetLyrics(props) {
  const { artistName, textColor, trackTitle } = props;
  return (
    <Wrapper textColor={textColor}>
      <a href="#" onClick={() => fetchLyrics(trackTitle, artistName)}>
        {TEXT}
      </a>
    </Wrapper>
  );
}

const fetchLyrics = async (trackTitle, artistName) => {
  const response = await fetch(`/api/lyrics/${trackTitle}/${artistName}`);
  if (response.status !== 200) {
    console.log('Unable to find lyrics');
    //throw Error(body.message);
  } else {
    const body = await response.json();
    console.log('body', body);
    return body;
  }
};

GetLyrics.propTypes = {
  artistName: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  trackTitle: PropTypes.string.isRequired,
};
