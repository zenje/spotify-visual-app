import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTopTracks } from '../actions/spotifyActions';

export const useGetTopTracks = (timeRange) => {
  const dispatch = useDispatch();
  const topTracks = useSelector((state) => {
    if (state.spotify.topTracks && state.spotify.topTracks[timeRange]) {
      return state.spotify.topTracks[timeRange];
    }
    return [];
  });
  useEffect(() => {
    if (topTracks.length == 0) {
      // only fetch top tracks if time range data has not yet been loaded
      dispatch(getTopTracks(timeRange));
    }
  }, [timeRange]);
  return topTracks;
};
