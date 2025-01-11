import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RegisterForm } from './components/form';
import { useGlobalSlice } from 'app/slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'app/components/ui/use-toast';

export const Register = () => {
  const { useRegisterMutation } = useGlobalSlice();

  const navigate = useNavigate();

  const [
    register,
    {
      isLoading: registerLoading,
      isSuccess: registerSuccess,
      isError: registerError,
      error: registerErrorMessage,
    },
  ] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const changeImage = async (file: File | null) => {
    setImageUploadLoading(true);
    if (file === null) {
      return;
    } else if (
      file.type === 'image/jpeg' ||
      'image/jpg' ||
      'image/png' ||
      'image.svg' ||
      'image/gfif'
    ) {
      const imgData = new FormData();
      imgData.append('file', file);
      imgData.append('upload_preset', 'save_qa');
      imgData.append('cloud_name', 'dakda5ni3');
      await fetch('https://api.cloudinary.com/v1_1/dakda5ni3/image/upload', {
        method: 'POST',
        body: imgData,
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setProfilePicture(data?.url);
          setImageUploadLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate('/login');
      toast({
        description: 'User Registered Successfully',
        variant: 'success',
      });
    }
  }, [registerSuccess, navigate]);

  useEffect(() => {
    if (registerError) {
      navigate('/login');
      toast({
        description: registerErrorMessage?.[0],
        variant: 'success',
      });
    }
  }, [registerError, registerErrorMessage, navigate]);

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
            changeImage={changeImage}
            imageUploading={imageUploadLoading}
            registerUser={register}
            isLoading={registerLoading}
            profilePicture={profilePicture}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
