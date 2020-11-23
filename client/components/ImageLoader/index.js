import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Image } from './style';

export default function ImageLoader(props) {
  const { img, isVisible, skeletonHeightFn } = props;

  const [imgLoaded, setImgLoaded] = useState(false);
  const size = useWindowSize();

  return (
    <>
      {imgLoaded || !isVisible ? null : (
        <Skeleton
          variant="rect"
          width="100%"
          height={
            skeletonHeightFn ? skeletonHeightFn(size) : getSkeletonHeight(size)
          }
        />
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
}

const getSkeletonHeight = (size) =>
  size.width >= 480 ? 400 : size.width * 0.75;

ImageLoader.propTypes = {
  img: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  skeletonHeightFn: PropTypes.func,
};
