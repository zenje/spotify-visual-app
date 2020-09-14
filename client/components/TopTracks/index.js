import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTopTracks } from '../../actions/actions';

const getTrack = (track, idx) => (
  <div key={`${track.img}-${idx}`}>
    <img src={track.img} style={{ width: '30%' }} />
    {track.title} {track.artist}
  </div>
);

export default function TopTracks() {
  const timeRange = 'long_term';
  const dispatch = useDispatch();
  const topTracks = useSelector((state) => {
    if (state.topTracks && state.topTracks[timeRange]) {
      return state.topTracks[timeRange];
    }
    return [];
  });

  useEffect(() => {
    dispatch(getTopTracks());
  }, []);

  console.log('topTracks', topTracks);

  return (
    <div>
      <h1>Top Tracks</h1>
      <div>{topTracks.map((item, idx) => getTrack(item, idx))}</div>
    </div>
  );
}
