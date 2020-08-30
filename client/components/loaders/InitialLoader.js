import React from 'react';
import styled, { keyframes } from 'styled-components';
import { animated, useSpring, config } from 'react-spring';

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const Percentage = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.colors.highlight};
  position: relative;
  bottom: -0.7em;
  z-index: 2;
`;

const PercentageSpan = animated(styled.span`
  background-color: ${(props) => props.theme.colors.background};
  padding: 2%;
`);

const Bar = animated(styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  margin: 0 auto;
  height: 0.2em;
`);

export default function InitialLoader() {
  const props = useSpring({
    number: 100,
    percentage: '100%',
    from: { number: 0, percentage: '0%' },
    config: config.molasses,
  });
  return (
    <Wrapper>
      <Percentage>
        <PercentageSpan>
          {props.number.interpolate((num) => Math.floor(num))}
        </PercentageSpan>
      </Percentage>
      <Bar
        style={{
          width: props.percentage,
          opacity: props.number.interpolate((num) => num / 100),
        }}
      />
    </Wrapper>
  );
}
