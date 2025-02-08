import { Button } from 'app/components/ui/button';
import { Icons } from 'app/components/ui/icons';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  upload: (formData: any) => void;
  isLoading: boolean;
  uploadSuccess: boolean;
};
const UploadResume = (props: Props) => {
  const { upload, isLoading, uploadSuccess } = props;
  const dispatch = useDispatch();
  const { actions } = useGlobalSlice();
  const user = useSelector(selectUser);

  const [uploadedResume, setUploadedResume] = useState<string | null>(null);

  const uploadResume = async (file: File | null) => {
    if (file === null) {
      return;
    } else if (
      file?.type === 'image/jpeg' ||
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
          setUploadedResume(data?.secure_url);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const handleSubmit = () => {
    upload({ userId: user?._id, body: { resume: uploadedResume } });
    dispatch(actions.updateUser({ ...user, resume: uploadedResume }));
  };

  useEffect(() => {
    if (uploadSuccess) {
      setUploadedResume(null);
    }
  }, [uploadSuccess]);

  return (
    <React.Fragment>
      <div className="w-full p-5 flex flex-col items-center justify-center">
        {user.resume ? (
          <div className="w-full">
            <Label htmlFor="res">
              <Input
                onChange={(e: any) => uploadResume(e.target?.files?.[0])}
                id="res"
                type="file"
                placeholder="Upload New Resume"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <iframe
                src={user?.resume}
                width="100%"
                height="600px"
                style={{ border: 'none' }}
              />
            </Label>
          </div>
        ) : (
          <Label htmlFor="resume">
            <div className="h-[200px] w-[200px] rounded-full bg-transparent border-2 border-teal-600 shadow-lg flex flex-col items-center justify-center">
              <p className="text-teal-600 font-medium font-poppins">
                Upload your Resume here
              </p>
              {isLoading && (
                <Icons.Spinner className="animate-spin h-10 w-10 text-teal-600" />
              )}
              <Input
                onChange={(e: any) => uploadResume(e.target?.files?.[0])}
                id="resume"
                type="file"
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            </div>
          </Label>
        )}
      </div>
      {uploadedResume && (
        <Button
          type="button"
          onClick={handleSubmit}
          variant="special"
          className="px-5 py-2"
        >
          Save Resume
        </Button>
      )}
    </React.Fragment>
  );
};

export default UploadResume;
