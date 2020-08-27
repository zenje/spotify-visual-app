import React, { useEffect } from 'react';
import { Artist, History, Track, TrackName, Tracks, Wrapper } from './style';

export default function RecentTracks(props) {
  const { className, tracks } = props;
  return (
    <Wrapper className={className}>
      <History>&lt; history &gt;</History>
      <Tracks>
        {tracks.map((track) => (
          <Track key={track.img}>
            <img src={track.img} />
            <TrackName>{track.name}</TrackName>
            <Artist>{track.artist}</Artist>
          </Track>
        ))}
      </Tracks>
    </Wrapper>
  );
}
