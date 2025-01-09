import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function Login() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <div className="w-full min-h-screen flex items-center justify-center">
        <h5 className="text-2xl font-medium font-poppins">Login</h5>
      </div>
    </React.Fragment>
  );
}
