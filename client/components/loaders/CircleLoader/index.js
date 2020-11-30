import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Loader, LoaderDiv } from './style';

export default function CircleLoader() {
  const themeContext = useContext(ThemeContext);
  return (
    <LoaderDiv>
      <Loader color={themeContext.colors.highlight} size="200px" />
    </LoaderDiv>
  );
}
