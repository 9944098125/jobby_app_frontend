import { Button } from 'app/components/ui/button';
import ErrorMessage from 'app/components/ui/error-message';
import { Icons } from 'app/components/ui/icons';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';
import ShowPassword from 'app/pages/Login/components/show-password';
import { selectUser } from 'app/slice/selectors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

type Props = {
  isLoading: boolean;
  update: (body: any) => void;
};
const UpdatePassword = (props: Props) => {
  const { update, isLoading } = props;
  const form = useForm();
  const user = useSelector(selectUser);
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = form;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const submitUpdatePassword = (data: any) => {
    const body = {
      userId: user?._id,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    update(body);
  };

  const fields = [
    {
      id: 'oldPassword',
      fieldName: 'oldPassword',
      label: 'Old Password',
      type: showOldPassword ? 'text' : 'password',
      placeholder: 'Enter your old Password',
      showPassword: showOldPassword,
      error: errors.oldPassword,
    },
    {
      id: 'newPassword',
      fieldName: 'newPassword',
      label: 'New Password',
      type: showNewPassword ? 'text' : 'password',
      placeholder: 'Enter your New Password',
      showPassword: showOldPassword,
      error: errors.newPassword,
    },
    {
      id: 'confirmNewPassword',
      fieldName: 'confirmNewPassword',
      label: 'Confirm New Password',
      type: showConfirmNewPassword ? 'text' : 'password',
      placeholder: 'Confirm your New Password',
      ShowPassword: showConfirmNewPassword,
      error: errors.confirmNewPassword,
    },
  ];

  return (
    <React.Fragment>
      <form className="w-full" onSubmit={handleSubmit(submitUpdatePassword)}>
        <div className="p-2 md:p-4 lg:p-10 w-full">
          {fields.map((item, idx) => {
            return (
              <div key={idx} className="col-span-12 md:col-span-6 mb-4">
                <Label htmlFor={item.id}>{item.label}</Label>
                <div className="flex items-center">
                  <Input
                    id={item.id}
                    type={item.type}
                    {...register(item.fieldName, {
                      required: `${item.fieldName} is required!`,
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          'Password must contain at least one uppercase letter, one number, and one special character!',
                      },
                      validate:
                        item.fieldName === 'confirmNewPassword'
                          ? value =>
                              value === watch('newPassword') ||
                              'Passwords do not match!'
                          : undefined,
                    })}
                    placeholder={item.placeholder}
                    className="w-full h-[45px] rounded-[9px] outline-none border border-gray-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />

                  <ShowPassword
                    showPassword={
                      item.fieldName === 'oldPassword'
                        ? showOldPassword
                        : item.fieldName === 'newPassword'
                        ? showNewPassword
                        : showConfirmNewPassword
                    }
                    setShowPassword={
                      item.fieldName === 'oldPassword'
                        ? setShowOldPassword
                        : item.fieldName === 'newPassword'
                        ? setShowNewPassword
                        : setShowConfirmNewPassword
                    }
                  />
                </div>
                <ErrorMessage error={item.error} />
              </div>
            );
          })}
          <Button type="submit" variant="special" className="w-full h-[45px]">
            Update{' '}
            {isLoading && <Icons.Spinner className="animate-spin h-8 w-8" />}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdatePassword;
