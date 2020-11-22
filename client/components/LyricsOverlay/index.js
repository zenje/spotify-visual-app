import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Skeleton from '@material-ui/lab/Skeleton';
import OverlayBase from '../OverlayBase';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Image, Lyrics, SkeletonWrapper, Wrapper } from './style';

export default function LyricsOverlay(props) {
  const { handleClose, img, lyrics, open, textColor } = props;
  const [imgLoaded, setImgLoaded] = useState(false);
  const size = useWindowSize();
  useEffect(() => {
    setImgLoaded(false);
  }, [lyrics]);

  return (
    <OverlayBase open={open} handleClose={handleClose} slideDirection={'right'}>
      <Wrapper>
        {getImg(imgLoaded, open, size, img, setImgLoaded)}
        <Lyrics textColor={textColor}>{lyrics}</Lyrics>
      </Wrapper>
    </OverlayBase>
  );
}

const getImg = (imgLoaded, open, size, img, setImgLoaded) => (
  <>
    {imgLoaded || !open ? null : (
      <Skeleton variant="rect" width="100%" height={getSkeletonHeight(size)} />
    )}
    {img && (
      <Image
        src={img}
        style={imgLoaded ? {} : { display: 'none' }}
        onLoad={() => setImgLoaded(true)}
      />
    )}
  </>
);

const getLyrics = (lyrics, textColor) => (
  <Lyrics textColor={textColor}>{lyrics}</Lyrics>
);

const getSkeletonHeight = (size) => {
  return size.width >= 480 ? 400 : size.width * 0.75;
};

LyricsOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
  img: PropTypes.string,
  lyrics: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  textColor: PropTypes.string,
};
