import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { BounceLoader } from 'halogenium';

const LoaderDiv = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
`;

const Loader = styled(BounceLoader)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function ArtistLoader() {
  const themeContext = useContext(ThemeContext);
  console.log(themeContext);
  return (
    <LoaderDiv>
      <Loader color={themeContext.colors.highlight} size="200px" />
    </LoaderDiv>
  );
}
