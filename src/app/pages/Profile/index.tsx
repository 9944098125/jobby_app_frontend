import { Button } from 'app/components/ui/button';
import { toast } from 'app/components/ui/use-toast';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { EditIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const { useLazyGetProfileQuery, useUpdateProfileMutation } = useGlobalSlice();
  const user = useSelector(selectUser);

  const [getProfile, { data: profileDetails }] = useLazyGetProfileQuery();
  const [
    updateProfile,
    {
      isSuccess: updateSuccess,
      isLoading: updateLoading,
      isError: updateError,
      error: updateErrorMessage,
    },
  ] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
    countryCode: '',
  });
  const [editingField, setEditingField] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?._id) {
      getProfile({ userId: user?._id });
    }
  }, [user?._id]);

  useEffect(() => {
    if (profileDetails?.user) {
      setFormData(profileDetails.user); // Initialize form data with profile details
    }
  }, [profileDetails]);

  const handleEditClick = field => {
    setEditingField(field);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputBlur = async field => {
    try {
      updateProfile({ [field]: formData[field], userId: user?._id });
      setEditingField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'save_qa');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dakda5ni3/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      if (data.secure_url) {
        const updatedProfile = {
          profilePicture: data.secure_url,
          userId: user?._id,
        };
        setFormData(prev => ({ ...prev, profilePicture: data.secure_url }));
        updateProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      toast({
        description: 'Updated the Profile Successfully',
        variant: 'success',
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError) {
      toast({
        description: updateErrorMessage?.[0],
        variant: 'destructive',
      });
    }
  }, [updateError, updateErrorMessage]);

  return (
    <div className="w-full min-h-screen p-4 md:p-8 lg:p-[100px]">
      <div className="flex flex-col md:flex-row md:items-center p-2 md:p-4 space-x-4 rounded-[9px] border border-teal-400">
        {/* Image Container */}
        <div className="rounded-[9px] border border-teal-600 pb-4 mb-8 flex flex-col items-center w-full md:w-1/3">
          <div className="w-[200px] h-[270px] rounded-[9px]">
            <img
              src={formData.profilePicture || ''}
              alt="Profile"
              className="p-2 rounded-[4px]"
            />
          </div>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center py-4"
            onClick={handleUploadPhoto}
          >
            Upload Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Container */}
        <div className="flex flex-col items-center justify-center md:border-l w-full md:w-2/3">
          {/* Name Field */}
          <p className="text-teal-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
            I'm{' '}
            {editingField === 'name' ? (
              <input
                className="border border-gray-300 rounded p-2"
                value={formData.name || ''}
                onChange={e => handleInputChange('name', e.target.value)}
                onBlur={() => handleInputBlur('name')}
              />
            ) : (
              <span className="text-pink-600 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {formData.name || 'N/A'}
                <EditIcon
                  className="text-[15px] cursor-pointer"
                  onClick={() => handleEditClick('name')}
                />
              </span>
            )}
          </p>

          {/* Email Field */}
          <p className="text-blue-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
            you can mail me at{' '}
            {editingField === 'email' ? (
              <input
                className="border border-gray-300 rounded p-2"
                value={formData.email || ''}
                onChange={e => handleInputChange('email', e.target.value)}
                onBlur={() => handleInputBlur('email')}
              />
            ) : (
              <span className="text-yellow-400 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {formData.email || 'N/A'}
                <EditIcon
                  className="text-[15px] cursor-pointer"
                  onClick={() => handleEditClick('email')}
                />
              </span>
            )}
          </p>

          {/* Phone Field */}
          <p className="text-red-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
            and call me on{' '}
            {editingField === 'phone' ? (
              <div className="flex items-center">
                <p className="text-2xl font-bold">{formData.countryCode}</p>
                <input
                  className="border border-gray-300 rounded p-2"
                  value={formData.phone || ''}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  onBlur={() => handleInputBlur('phone')}
                />
              </div>
            ) : (
              <span className="text-violet-600 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
                {formData.countryCode + formData.phone || 'N/A'}
                <EditIcon
                  className="text-[15px] cursor-pointer"
                  onClick={() => handleEditClick('phone')}
                />
              </span>
            )}
          </p>

          <p className="text-cyan-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-playWrite">
            I'm {profileDetails?.user?.isEmployer ? 'an' : 'a'}
            <span className="text-pink-800 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
              {profileDetails?.user?.isEmployer ? 'Employer' : 'Job Seeker'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
