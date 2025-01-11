import Label from 'app/components/ui/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import ErrorMessage from 'app/components/ui/error-message';
import ShowPassword from './show-password';
import { Link } from 'react-router-dom';

type Props = {
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  trigger: (body: any) => void;
  isLoading: boolean;
};

const LoginForm = (props: Props) => {
  const { showPassword, setShowPassword, trigger, isLoading } = props;
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const submitLoginForm = (data: any) => {
    trigger(data);
  };
  return (
    <React.Fragment>
      <div className="w-full bg-white shadow-lg rounded-[9px] p-5">
        <h5 className="text-2xl font-medium font-poppins">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
            Login
          </span>
        </h5>{' '}
        <div className="py-2">
          <p className="text-[12px] font-poppins font-medium">
            Don't have an account ? Please,{' '}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(submitLoginForm)}>
          {/* EMAIL/PHONE FIELD  */}
          <div className="mb-4">
            <Label htmlFor="email/phone">Email/Phone</Label>
            <Input
              type="text"
              id="email/phone"
              {...register('emailOrPhone', {
                required: 'Email/Phone is required !',
                pattern: {
                  value:
                    /^(?:\d{10}|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)$/,
                  message:
                    'Enter a valid 10-digit phone number or a valid email address',
                },
              })}
              placeholder="Enter your Email Address or Phone Number"
              className="w-full h-[45px] rounded-[9px] outline-none border border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
            <ErrorMessage error={errors.emailOrPhone} />
          </div>
          {/* PASSWORD FIELD  */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required!',
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message:
                      'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character',
                  },
                })}
                placeholder="Enter your Password"
                className="w-full h-[45px] rounded-[9px] outline-none border border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
              <ShowPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <ErrorMessage error={errors.password} />
          </div>
          <Button
            type="submit"
            variant="special"
            className="w-full flex justify-center items-center h-[45px] rounded-[9px]"
          >
            Login
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
