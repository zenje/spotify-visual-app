import React from 'react';
import { Artist, History, Track, TrackName, Tracks, Wrapper } from './style';

export default function RecentTracks(props) {
  const { className, trackLimit, tracks } = props;
  let tracksToShow = trackLimit ? tracks.slice(0, trackLimit) : tracks;
  return (
    <Wrapper className={className}>
      <History>&lt; history &gt;</History>
      <Tracks>
        {tracksToShow.map((track, index) => (
          <Track key={`${track.img}-${index}`} trackLimit={trackLimit}>
            <img src={track.img} />
            <TrackName>{track.name}</TrackName>
            <Artist>{track.artist}</Artist>
          </Track>
        ))}
      </Tracks>
    </Wrapper>
  );
}
