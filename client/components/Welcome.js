import React, { Component, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Welcome({ user }) {
  const props = useSpring({
    opacity: 1,
    fontSize: '100px',
    from: {
      opacity: 0,
      fontSize: '12px',
    },
  });

  return (
    <div className="welcome">
      <animated.h1 style={props}>{`Welcome, ${user}`}</animated.h1>
    </div>
  );
}

export default Welcome;
