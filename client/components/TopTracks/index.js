import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';

import {
  TopTrack,
  TopTrackInfo,
  TopTrackArtist,
  Tracks,
  Track,
  TrackImg,
  TrackInfo,
} from './style';
import { getTopTracks } from '../../actions/actions';

export default function TopTracks(props) {
  const timeRange = props.timeRange;
  const dispatch = useDispatch();
  const topTracks = useSelector((state) => {
    if (state.spotify.topTracks && state.spotify.topTracks[timeRange]) {
      return state.spotify.topTracks[timeRange];
    }
    return [];
  });
  let firstTopTrack = topTracks.length ? topTracks[0] : undefined;
  let otherTracks = topTracks.length ? topTracks.slice(1) : [];

  useEffect(() => {
    if (topTracks.length == 0) {
      // only fetch top tracks if time range data has not yet been loaded
      dispatch(getTopTracks(timeRange));
    }
  }, [timeRange]);

  return (
    <div>
      {getTopTrack(firstTopTrack)}
      <Tracks>{otherTracks.map((item, idx) => getTrack(item, idx))}</Tracks>
    </div>
  );
}

const getTopTrack = (track) =>
  track && (
    <VisibilitySensor partialVisibility>
      {({ isVisible }) => (
        <TopTrack isVisible={isVisible}>
          <img src={track.img} />
          <TopTrackInfo>
            <div>{track.title}</div>
            <TopTrackArtist>{track.artist}</TopTrackArtist>
          </TopTrackInfo>
        </TopTrack>
      )}
    </VisibilitySensor>
  );

const getTrack = (track, idx) => (
  <VisibilitySensor partialVisibility key={`${track.img}-${idx}`}>
    {({ isVisible }) => (
      <Track isVisible={isVisible}>
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
    )}
  </VisibilitySensor>
);
