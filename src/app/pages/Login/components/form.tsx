import Label from 'app/components/ui/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import ErrorMessage from 'app/components/ui/error-message';

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
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
              {showPassword ? (
                <svg
                  className="cursor-pointer ml-[-35px]"
                  onClick={() => setShowPassword(!showPassword)}
                  width="25"
                  height="25"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="cursor-pointer ml-[-35px]"
                  onClick={() => setShowPassword(!showPassword)}
                  width="25"
                  height="25"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              )}
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
