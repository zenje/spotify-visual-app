import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: palevioletred;
  color: white;
  width: 500px;
  height: 300px;
  text-align: center;
  margin: 0 auto;
  display: flex;
`;

const Left = styled.div`
  float: left;
  width: 50%;
`;

const Right = styled.div`
  float: left;
  overflow: hidden;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
`;

export default function CurrentTrack(props) {
  let { artist, img, song } = props;

  return (
    <Wrapper>
      <Left>
        <Image src={img} />
      </Left>
      <Right>
        <div>{artist}</div>
        <div>{song}</div>
      </Right>
    </Wrapper>
  );
}
