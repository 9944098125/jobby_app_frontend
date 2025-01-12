import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';
import { Button } from 'app/components/ui/button';
import { Icons } from 'app/components/ui/icons';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
  heading: string;
  uploadImages: (files: File[]) => void;
  urls: string[];
  handleRemoveImage: (idx: number) => void;
  uploading: boolean;
  create: (body: any) => void;
  isLoading: boolean;
};
const FeedModal = (props: Props) => {
  const {
    show,
    setShow,
    heading,
    uploadImages,
    urls,
    handleRemoveImage,
    uploading,
    create,
    isLoading,
  } = props;
  const user = useSelector(selectUser);
  const form = useForm();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form;

  const submitFeedForm = (data: any) => {
    const body = {
      userId: user?._id,
      title: data.feedTitle,
      description: data.description,
      images: urls,
    };
    create(body);
  };

  const closeIcon = (
    <div className="border-blue-600 border rounded-full p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="#667085"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        styles={{
          modal: {
            backgroundColor: 'white',
            border: '1px #0096FF solid',
            borderRadius: '9px',
            width: '95%',
          },
        }}
        open={show}
        onClose={() => setShow(false)}
        center
        closeIcon={closeIcon}
        closeOnOverlayClick={false}
      >
        <h5 className="text-[23px] font-medium font-poppins">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
            {heading}
          </span>
        </h5>{' '}
        <form onSubmit={handleSubmit(submitFeedForm)}>
          <div className="mb-4 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              className="w-full rounded-[9px] h-[45px] border border-gray-300 outline-none"
              {...register('feedTitle', {
                required: 'Feed Title is required !',
              })}
            />
            {errors?.feedTitle && (
              <p className="text-red-600 font-medium font-poppins text-[10px]">
                {errors?.feedTitle?.message as string}
              </p>
            )}
          </div>

          <div className="mb-4 w-full">
            <Label htmlFor="description">Description</Label>
            <textarea
              rows={5}
              className="w-full p-2 rounded-[9px] border border-gray-300 outline-none"
              {...register('description', {
                required: 'Feed Description is required !',
              })}
            />
            {errors?.description && (
              <p className="text-red-600 font-medium font-poppins text-[10px]">
                {errors?.description?.message as string}
              </p>
            )}
          </div>

          <div className="mb-4 w-full">
            <Label htmlFor="FeedImages">
              <p>Upload Images</p>
              <div className="mb-4 flex items-center justify-center h-[80px] border border-pink-600 rounded-[9px] w-full">
                <img
                  src="/images/upload.webp"
                  alt=""
                  className="h-[50px] w-[50px]"
                />
                <Input
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  id="FeedImages"
                  onChange={(e: any) => uploadImages(e.target?.files)}
                />
              </div>
            </Label>
            <div className="flex flex-wrap gap-5">
              {urls?.map((url, idx) => {
                return (
                  <div key={idx} className="relative mt-5">
                    <p
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute right-[-15px] cursor-pointer top-[-15px] bg-red-600 text-white h-5 w-5 flex items-center justify-center rounded-full"
                    >
                      x
                    </p>
                    <img src={url} alt="" height={50} width={50} />
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            variant="greenBtn"
            className="w-full h-[45px] rounded-full"
          >
            Save Post{' '}
            {(uploading || isLoading) && (
              <Icons.Spinner className="animate-spin h-8 w-8" />
            )}
          </Button>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default FeedModal;
