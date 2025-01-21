import { Button } from 'app/components/ui/button';
import React, { Ref } from 'react';

type Props = {
  profilePicture: string;
  handleUploadPhoto: () => void;
  fileInputRef: any;
  handleFileChange: (e: any) => void;
};
const ImageContainer = (props: Props) => {
  const { profilePicture, handleUploadPhoto, fileInputRef, handleFileChange } =
    props;
  return (
    <React.Fragment>
      <div className="rounded-[9px] border border-teal-600 pb-4 mb-8 flex flex-col items-center w-full md:w-1/3">
        <div className="w-[200px] h-[270px] rounded-[9px]">
          <img
            src={profilePicture || ''}
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
          onChange={(e: any) => handleFileChange(e)}
        />
      </div>
    </React.Fragment>
  );
};

export default ImageContainer;
