import React from 'react';
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
import { useGetTopTracks } from '../../hooks/useGetTopTracks';

export default function TopTracks(props) {
  const timeRange = props.timeRange;
  const topTracks = useGetTopTracks(timeRange);
  const firstTopTrack = topTracks.length ? topTracks[0] : undefined;
  const otherTracks = topTracks.length ? topTracks.slice(1) : [];
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
