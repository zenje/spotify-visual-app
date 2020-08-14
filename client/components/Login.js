import React from 'react';
import loginSVG from '../log_in.svg';

/**
 * Our login page
 * Has a login button that hit's the login url
 */
export default function Login() {
  return (
    <div className="login">
      <h2>Here's our login page!</h2>
      <a href="/login" dangerouslySetInnerHTML={{ __html: loginSVG }}></a>
    </div>
  );
}
