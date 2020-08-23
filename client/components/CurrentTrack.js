import React from 'react';
import styled from 'styled-components';

import MusicBar from './MusicBar';

const Wrapper = styled.div`
  background-color: palevioletred;
  color: white;
  text-align: center;
  display: flex;
`;

const Left = styled.div`
  float: left;
  width: 50%;
`;

const Right = styled.div`
  float: left;
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const StyledMusicBar = styled(MusicBar)`
  margin: 0 auto;
`;

export default function CurrentTrack(props) {
  let { artist, className, img, song } = props;

  return (
    <Wrapper className={className}>
      <Left>
        <Image src={img} />
      </Left>
      <Right>
        <div>{artist}</div>
        <div>{song}</div>
        <StyledMusicBar barWidth={25} />
      </Right>
    </Wrapper>
  );
}
