import React, { useEffect } from 'react';
import { Artist, History, Track, TrackName, Tracks, Wrapper } from './style';

export default function RecentTracks(props) {
  const { className } = props;
  //const {tracks} = props;
  let tracks = [
    {
      artist: 'Vansire',
      img: 'https://i.scdn.co/image/ab67616d0000b27341a0570bfa2206315f4eca34',
      name: 'Metamodernity',
    },
    {
      artist: 'Charlie Burg',
      img: 'https://i.scdn.co/image/ab67616d0000b27317a93d6eeb50b6304e24261d',
      name: `I Don't Wanna Be Okay Without You`,
    },
    {
      artist: 'Mellow Fellow',
      img: 'https://i.scdn.co/image/ab67616d0000b273e7f2a73b70759dbded43fa72',
      name: 'Dancing',
    },
  ];

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
