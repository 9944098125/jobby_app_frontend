import { Button } from 'app/components/ui/button';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { EditIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const { useLazyGetProfileQuery, useUpdateProfileMutation } = useGlobalSlice();
  const user = useSelector(selectUser);

  const [
    getProfile,
    {
      data: profileDetails,
      isLoading: profileLoading,
      isSuccess: profileSuccess,
      isError: profileError,
      error: profileErrorMessage,
    },
  ] = useLazyGetProfileQuery();

  const [
    updateProfile,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorMessage,
    },
  ] = useUpdateProfileMutation();

  useEffect(() => {
    getProfile({ userId: user?._id });
  }, [user?._id]);

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

  return (
    <React.Fragment>
      <div className="w-full min-h-screen p-4 md:p-8 lg:p-[100px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-2 md:p-4 space-x-4 rounded-[9px] border border-teal-400">
          {/* image container */}
          <div className="p-2 md:p-4 lg:p-8 rounded-[9px] border border-teal-600 mb-8">
            <div className="w-[200px] h-[270px] rounded-[9px]">
              <img
                src={user?.profilePicture}
                alt=""
                className="p-2 rounded-[4px]"
              />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center py-4"
            >
              Upload Photo
            </Button>
          </div>
          {/* form container  */}
          <div className="flex flex-col items-center justify-center md:border-l">
            <p className="text-teal-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
              I'm{' '}
              <span className="text-pink-600 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {profileDetails?.user?.name}
                <EditIcon className="text-[15px]" />
              </span>
            </p>

            <p className="text-blue-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
              you can mail me at{' '}
              <span className="text-yellow-400 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {profileDetails?.user?.email}
                <EditIcon className="text-[15px]" />
              </span>
            </p>

            <p className="text-red-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
              and call me on{' '}
              <span className="text-violet-600 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {profileDetails?.user?.countryCode}
                {profileDetails?.user?.phone}
                <EditIcon className="text-[15px]" />
              </span>
            </p>

            <p className="text-cyan-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
              I'm {profileDetails?.user?.isEmployer ? 'an' : 'a'}
              <span className="text-pink-800 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {profileDetails?.user?.isEmployer ? 'Employer' : 'Job Seeker'}
                <EditIcon className="text-[15px]" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
