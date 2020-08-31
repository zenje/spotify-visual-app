import React from 'react';
import { useSpring, config } from 'react-spring';
import { Bar, Percentage, PercentageSpan, Wrapper } from './style';

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
