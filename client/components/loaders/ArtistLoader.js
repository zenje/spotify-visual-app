import React from 'react';
import styled from 'styled-components';

import { BounceLoader } from 'halogenium';

const LoaderDiv = styled.div`
  display: -webkit-flex;
  display: flex;
  align-items: center;
  webkit-justify-content: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export default function ArtistLoader() {
  return (
    <LoaderDiv>
      <BounceLoader color="tomato" size="200px" />
    </LoaderDiv>
  );
}
