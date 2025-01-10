import { Button } from 'app/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticationLinks = () => {
  return (
    <React.Fragment>
      <div className="flex items-center space-x-10">
        <Link to="/login" style={{ color: 'inherit' }}>
          <Button variant="link" className="px-6 py-2 rounded-[9px] text-white">
            Login
          </Button>
        </Link>

        <Link to="/register" style={{ color: 'inherit' }}>
          <Button variant="link" className="px-6 py-2 rounded-[9px] text-white">
            Register
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default AuthenticationLinks;
