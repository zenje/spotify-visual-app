import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTopArtists } from '../actions/actions';

export const useGetTopArtists = (timeRange) => {
  const dispatch = useDispatch();
  const topArtists = useSelector((state) => {
    if (state.topArtists && state.topArtists[timeRange]) {
      return state.topArtists[timeRange];
    }
    return [];
  });
  useEffect(() => {
    if (topArtists.length == 0) {
      // only fetch top artists if time range data has not yet been loaded
      dispatch(getTopArtists(timeRange));
    }
  }, [timeRange]);
  return topArtists;
};
