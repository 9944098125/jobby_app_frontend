import React, { useEffect, useRef, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { useForm } from 'react-hook-form';
import { Input } from 'app/components/ui/input';
import Label from 'app/components/ui/label';
import { Button } from 'app/components/ui/button';
import { Icons } from 'app/components/ui/icons';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { SheetContent, SheetHeader } from 'app/components/ui/sheet';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { useClickOutside } from 'utils/hooks/use-click-outside';
import { RefreshCwIcon, SmilePlusIcon } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  description: {
    rawData: string;
    formattedData: string;
  };
  setDescription: any;
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
    description,
    setDescription,
  } = props;
  const user = useSelector(selectUser);
  const form = useForm();

  const emojiRef = useRef(null);
  const quillRef = useRef(null);

  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  useClickOutside(emojiRef, () => {
    setShowEmojiPicker(false);
  });

  const handleChange = (value: string) => {
    setDescription({
      rawData: value.replace(/<[^>]*>?/gm, ''),
      formattedData: value,
    });
  };

  const handleFocus = () => {
    const quill = quillRef.current?.getEditor();
    const position = quill?.getSelection()?.index;
    if (position !== null && position !== undefined) {
      setCursorPosition(position);
    }
  };

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    const quill = quillRef.current?.getEditor(); // Access Quill instance
    if (quill && cursorPosition !== null) {
      quill.insertText(cursorPosition, emojiObject.emoji); // Insert emoji at the last cursor position
      setCursorPosition(cursorPosition + emojiObject.emoji.length); // Update cursor position
    }
    setShowEmojiPicker(false); // Close emoji picker
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = form;

  const submitFeedForm = (data: any) => {
    const body = {
      userId: user?._id,
      title: data.feedTitle,
      description: description.formattedData,
      images: urls,
    };
    create(body);
  };

  return (
    <React.Fragment>
      <SheetContent className="bg-[#fce7e76c] backdrop-blur">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <h5 className="text-[23px] font-medium font-poppins">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
                {heading}
              </span>
            </h5>{' '}
            <div
              onClick={() => setShow(false)}
              className="border-blue-600 border-2 flex items-center justify-center rounded-full p-2 text-blue-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#0019f7"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </SheetHeader>
        <form onSubmit={handleSubmit(submitFeedForm)}>
          <div className="mb-6 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              className="w-full bg-white rounded-[9px] h-[45px] border border-gray-300 outline-none"
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

          <div className="mb-6 w-full">
            <div className="flex items-center space-x-8 mb-4">
              <Label htmlFor="description">Description</Label>
              <Button
                type="button"
                className="px-8 py-4 rounded-full flex items-center space-x-5"
                variant="greenBtn"
              >
                <p className="font-medium font-poppins">Ai Rewrite</p>
                <RefreshCwIcon className="h-8 w-8" />
              </Button>
              <div className="relative" ref={emojiRef}>
                <div className="bg-white rounded-full cursor-pointer p-2">
                  <SmilePlusIcon
                    className="h-10 w-10 text-orange-400"
                    onClick={() => setShowEmojiPicker(true)}
                  />
                </div>
                {showEmojiPicker && (
                  <div className="absolute top-[25px]">
                    <EmojiPicker
                      emojiStyle={EmojiStyle.NATIVE}
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
              </div>
            </div>
            <ReactQuill
              ref={quillRef} // Attach ref to ReactQuill
              theme="snow"
              value={description.formattedData}
              onChange={handleChange}
              onFocus={handleFocus} // Update cursor position on focus
              onBlur={handleFocus} // Save cursor position on blur
              style={{
                border: '1px solid #0096FF',
                borderRadius: '10px',
              }}
            />
            {errors?.description && (
              <p className="text-red-600 font-medium font-poppins text-[10px]">
                {errors?.description?.message as string}
              </p>
            )}
          </div>

          <div className="mb-6 w-full">
            <Label htmlFor="FeedImages">
              <p>Upload Images</p>
              <div className="mb-4 flex items-center justify-center h-[80px] border border-pink-600 bg-white rounded-[9px] w-full">
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
      </SheetContent>
    </React.Fragment>
  );
};

export default FeedModal;
