import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getTopTracks } from '../../actions/actions';

export default function TopTracks(props) {
  const timeRange = props.timeRange;
  const dispatch = useDispatch();
  const topTracks = useSelector((state) => {
    if (state.topTracks && state.topTracks[timeRange]) {
      return state.topTracks[timeRange];
    }
    return [];
  });

  useEffect(() => {
    if (topTracks.length == 0) {
      // only fetch top tracks if time range data has not yet been loaded
      dispatch(getTopTracks(timeRange));
    }
  }, [timeRange]);

  return (
    <div>
      {getTopTrack(topTracks[0])}
      <Tracks>{topTracks.map((item, idx) => getTrack(item, idx))}</Tracks>
    </div>
  );
}

const TopTrackTitle = styled.h1``;

const TopTrack = styled.div`
  position: relative;
  display: inline-block;
  font-style: italic;
  letter-spacing: 1px;
  img {
    width: 100%;
    max-width: 500px;
    display: block;
  }
`;

const TopTrackInfo = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  padding-top: 5px;
  bottom: 20px;
  color: white;
  width: 100%;
`;

const TopTrackArtist = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-style: normal;
`;

const Tracks = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Track = styled.div`
  //background: white;
  border-top: 2px white solid;
  color: white;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const TrackImg = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const TrackInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-style: italic;
  letter-spacing: 1px;
  h2 {
    margin: 0;
    text-transform: uppercase;
    font-style: normal;
  }
`;

const getTopTrack = (track) =>
  track && (
    <TopTrack>
      <img src={track.img} />
      <TopTrackInfo>
        <div>{track.title}</div>
        <TopTrackArtist>{track.artist}</TopTrackArtist>
      </TopTrackInfo>
    </TopTrack>
  );

const getTrack = (track, idx) => (
  <Track key={`${track.img}-${idx}`}>
    <TrackImg>
      <img src={track.img} />
    </TrackImg>
    <TrackInfo>
      <div>{track.title}</div>
      <div>
        <h2>{track.artist}</h2>
      </div>
    </TrackInfo>
  </Track>
);
