import React from 'react';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <React.Fragment>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      
    </React.Fragment>
  );
}
