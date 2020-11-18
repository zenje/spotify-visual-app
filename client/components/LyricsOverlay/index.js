import React from 'react';
import PropTypes from 'prop-types';

import OverlayBase from '../OverlayBase';

export default function LyricsOverlay(props) {
  let { artist, lyrics, handleClose, slideDirection, open } = props;

  return (
    <OverlayBase
      open={open}
      handleClose={handleClose}
      slideDirection={slideDirection}
    >
      <div>{getLyrics()}</div>
    </OverlayBase>
  );
}

const getLyrics = () => {
  return `
  [Verse 1]
  Lost on the freeway
  Well, this must be LA
  Tired and lonely
  With no real place to stay
  Is this the future and where I'm gonna be?
  Last night it hit me
  When I had this crazy dream
  
  [Chorus]
  Of waking up
  In your house
  On a San Francisco Street
  We tune out all the nasty weather
  And it's all in front of you and me
  
  [Verse 2]
  You were intriguing
  Just looking at a magazine
  Like when I first saw you
  Back in 2003
  Then you walked over
  Said you don't have to be alone
  I don't have a crystal ball
  There's no way that I could've known
  
  [Chorus]
  I'd be waking up
  In your house
  On a San Francisco Street
  We tune out all the nasty weather
  And it's all in front of you and me
  
  Waking up
  In your house
  On a San Francisco Street
  We tune out all the nasty weather
  And it's all in front of you
  All in front of you and me
  Oh
  
  Waking up
  In your house
  On a San Francisco Street
  We tune out all the nasty weather
  And it's all in front of you and me
  
  Waking up
  In your house
  On a San Francisco Street
  We tune out all the nasty weather
  Then it's all in front of you
  All in front of you and me
  
  [Outro]
  San Francisco Street
  You and me
  All in front of you and me
  You and me
  San Francisco Street
  You and me
  Oh
  `;
};

LyricsOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  lyrics: PropTypes.string,
  open: PropTypes.bool.isRequired,
};
