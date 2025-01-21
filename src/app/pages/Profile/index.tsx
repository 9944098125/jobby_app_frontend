import { Button } from 'app/components/ui/button';
import { toast } from 'app/components/ui/use-toast';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { EditIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageContainer from './components/image-container';
import FormContainer from './components/form-container';

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
  const [editingField, setEditingField] = useState<string | null>(null);
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
        <ImageContainer
          profilePicture={formData?.profilePicture}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleUploadPhoto={handleUploadPhoto}
        />

        {/* Form Container */}
        <FormContainer
          handleEditClick={handleEditClick}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          formData={formData}
          editingField={editingField}
          profileDetails={profileDetails}
        />
      </div>
    </div>
  );
};
