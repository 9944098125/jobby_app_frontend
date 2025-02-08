import { Button } from 'app/components/ui/button';
import { toast } from 'app/components/ui/use-toast';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { EditIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageContainer from './components/image-container';
import FormContainer from './components/form-container';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'app/components/ui/tabs';
import UpdatePassword from './components/update-password-tab';
import { useNavigate } from 'react-router-dom';
import UploadResume from './components/upload-resume';

export const Profile = () => {
  const {
    useLazyGetProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useUploadResumeMutation,
    actions,
  } = useGlobalSlice();
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [
    updatePassword,
    {
      isLoading: updatePasswordLoading,
      isSuccess: updatePasswordSuccess,
      isError: updatePasswordError,
      error: updatePasswordErrorMessage,
    },
  ] = useUpdatePasswordMutation();

  const [
    uploadResume,
    {
      isLoading: uploadLoading,
      isSuccess: uploadSuccess,
      isError: uploadError,
      error: uploadErrorMessage,
    },
  ] = useUploadResumeMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
    countryCode: '',
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('profile');
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

  const tabsChange = (tab: string) => {
    setActiveTab(tab);
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
      dispatch(
        actions.updateUser({
          ...user,
          profilePicture: formData?.profilePicture,
        }),
      );
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

  useEffect(() => {
    if (updatePasswordSuccess) {
      setActiveTab('profile');
      toast({
        description: 'Password updated successfully',
        variant: 'success',
      });
    }
  }, [updatePasswordSuccess]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      toast({
        description: 'No User !',
        variant: 'destructive',
      });
    }
  }, [user, navigate]);

  return (
    <div className="w-full min-h-screen p-4 md:p-8 lg:p-[100px]">
      <Tabs value={activeTab} onValueChange={tabsChange} defaultValue="profile">
        <TabsList className="flex justify-start items-center space-x-5">
          <TabsTrigger
            className={`px-4 py-2 rounded-tl-[9px] rounded-tr-[9px] ${
              activeTab === 'profile'
                ? 'border-4 border-teal-400 border-b-0'
                : ''
            }`}
            value="profile"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            className={`px-4 py-2 rounded-tl-[9px] rounded-tr-[9px] ${
              activeTab === 'updatePassword'
                ? 'border-4 border-teal-400 border-b-0'
                : ''
            }`}
            value="updatePassword"
          >
            Update Password
          </TabsTrigger>
          {!user?.isEmployer && (
            <TabsTrigger
              className={`px-4 py-2 rounded-tl-[9px] rounded-tr-[9px] ${
                activeTab === 'uploadResume'
                  ? 'border-4 border-teal-400 border-b-0'
                  : ''
              }`}
              value="uploadResume"
            >
              Upload Resume
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="profile">
          <div className="flex flex-col md:flex-row md:items-center p-2 md:p-4 space-x-4 rounded-tl-none rounded-[9px] border-4 border-teal-400">
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
        </TabsContent>
        <TabsContent value="updatePassword">
          <div className="flex flex-col md:flex-row md:items-center p-2 md:p-4 space-x-4 rounded-tl-none rounded-[9px] border-4 border-teal-400">
            <UpdatePassword
              update={updatePassword}
              isLoading={updatePasswordLoading}
            />
          </div>
        </TabsContent>
        {!user?.isEmployer && (
          <TabsContent value="uploadResume">
            <div className="flex flex-col md:flex-row md:items-center p-2 md:p-4 space-x-4 rounded-tl-none rounded-[9px] border-4 border-teal-400">
              <UploadResume
                uploadSuccess={uploadSuccess}
                upload={uploadResume}
                isLoading={uploadLoading}
              />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
