import { Button } from 'app/components/ui/button';
import ErrorMessage from 'app/components/ui/error-message';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';
import ShowPassword from 'app/pages/Login/components/show-password';
import React from 'react';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Props = {
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (val: boolean) => void;
  setShowConfirmPassword: (val: boolean) => void;
};
export const RegisterForm = (props: Props) => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = props;
  const form = useForm();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const fields = [
    {
      id: 'Name',
      type: 'text',
      fieldName: 'name',
      placeholder: 'Enter your Name',
      error: errors.name,
    },
    {
      id: 'Email',
      type: 'text',
      fieldName: 'email',
      placeholder: 'Enter your Email Address',
      error: errors.email,
    },
    {
      id: 'Password',
      type: showPassword ? 'text' : 'password',
      fieldName: 'password',
      placeholder: 'Enter your Password',
      error: errors.password,
      showPassword: showPassword,
    },
    {
      id: 'ConfirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      fieldName: 'confirmPassword',
      placeholder: 'Confirm your Password',
      error: errors.confirmPassword,
      showPassword: showConfirmPassword,
    },
    {
      id: 'Phone Number',
      type: 'text',
      fieldName: 'phone',
      placeholder: 'Enter your Phone Number',
      error: errors.phone,
    },
  ];

  const submitRegisterForm = (data: any) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className="w-full p-4 border-2 border-teal-600 rounded-[12px] bg-gray-900 bg-opacity-40 backdrop-blur-lg">
        <h5 className="text-2xl font-medium font-poppins">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
            Register
          </span>
        </h5>
        <form className="w-full" onSubmit={handleSubmit(submitRegisterForm)}>
          <div className="grid grid-cols-12 p-4 gap-4">
            {fields.map((item, idx) => {
              return (
                <div key={idx} className="col-span-12 md:col-span-6 mb-4">
                  <Label dark htmlFor={item.id}>
                    {item.id}
                  </Label>
                  <div className="flex items-center">
                    {item.fieldName === 'phone' ? (
                      <PhoneInput
                        country={'in'}
                        value={watch('phone')}
                        onChange={phone => setValue('phone', phone)}
                      />
                    ) : (
                      <Input
                        id={item.id}
                        type={item.type}
                        {...register(item.fieldName, {
                          required: `${item.fieldName} is required!`,
                          pattern:
                            item.fieldName === 'email'
                              ? {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: 'Invalid email address!',
                                }
                              : item.fieldName === 'password'
                              ? {
                                  value:
                                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                  message:
                                    'Password must contain at least one uppercase letter, one number, and one special character!',
                                }
                              : item.fieldName === 'phone'
                              ? {
                                  value: /^[0-9]{10}$/,
                                  message: 'Phone number must be 10 digits!',
                                }
                              : undefined,
                          validate:
                            item.fieldName === 'confirmPassword'
                              ? value =>
                                  value === watch('password') ||
                                  'Passwords do not match!'
                              : undefined,
                        })}
                        placeholder={item.placeholder}
                        className="w-full h-[45px] rounded-[9px] outline-none border border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-white"
                      />
                    )}
                    {item.hasOwnProperty('showPassword') ? (
                      <ShowPassword
                        dark
                        showPassword={
                          item.fieldName === 'password'
                            ? showPassword
                            : showConfirmPassword
                        }
                        setShowPassword={
                          item.fieldName === 'password'
                            ? setShowPassword
                            : setShowConfirmPassword
                        }
                      />
                    ) : null}
                  </div>
                  <ErrorMessage error={item.error} />
                </div>
              );
            })}
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="ProfilePicture" dark>
                <Input
                  id="ProfilePicture"
                  {...register('profilePicture', {
                    required: 'Profile Picture is required !',
                  })}
                  type="file"
                  style={{ display: 'none' }}
                />
                <div className="border-2 border-teal-600 rounded-full p-2 h-[60px] w-[60px] place-self-center">
                  <img
                    src={watch('profilePicture') || '/images/avatar.png'}
                    alt=""
                    className="h-[45px] w-[45px] rounded-full"
                  />
                </div>
              </Label>
              <ErrorMessage error={errors.profilePicture} />
            </div>
          </div>

          <Button
            variant="special"
            className="w-full h-[45px] rounded-[9px]"
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};
