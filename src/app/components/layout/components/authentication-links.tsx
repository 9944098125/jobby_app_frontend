import { Button } from 'app/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticationLinks = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-x-10">
        <Link to="/login" style={{ color: 'inherit' }}>
          <Button
            variant="link"
            className="md:px-6 md:py-2 rounded-[9px] text-white"
          >
            Login
          </Button>
        </Link>

        <Link to="/register" style={{ color: 'inherit' }}>
          <Button
            variant="link"
            className="md:px-6 md:py-2 rounded-[9px] text-white"
          >
            Register
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default AuthenticationLinks;
