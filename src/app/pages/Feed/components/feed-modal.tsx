import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
  heading: string;
};
const FeedModal = (props: Props) => {
  const { show, setShow, heading } = props;
  const form = useForm();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = form;

  const submitFeedForm = (data: any) => {
    console.log(data);
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
        <form onSubmit={form.handleSubmit(submitFeedForm)}>
          <div className="mb-4 w-full">
            <Input
              type="text"
              className="w-full rounded-full h-[45px]"
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
            <Input
              type="text"
              className="w-full rounded-full h-[45px]"
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
            <Label htmlFor="FeedImages">Upload Images</Label>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default FeedModal;
