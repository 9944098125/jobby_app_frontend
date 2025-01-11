import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RegisterForm } from './components/form';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <React.Fragment>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Helmet>
      <div
        style={{
          backgroundImage: 'url(/images/register-bg.png)',
          backgroundSize: 'cover',
        }}
        className="h-screen w-full bg-center bg-no-repeat grid grid-cols-12"
      >
        <div className="col-span-11 md:col-span-8 p-4">
          <RegisterForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
