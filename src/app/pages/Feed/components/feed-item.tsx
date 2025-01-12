import { GearIcon } from '@radix-ui/react-icons';
import { DeleteIcon, EditIcon } from 'lucide-react';
import React, { useRef } from 'react';
import { formatDate } from 'utils/formatDate';
import { useClickOutside } from 'utils/hooks/use-click-outside';
import ImagesCarousel from './images-carousel';

type Props = {
  _id: string;
  title: string;
  description: string;
  user: {
    userId: string;
    profilePicture: string;
    name: string;
  };
  images: string[];
  createdAt: string;
  showOptions: {
    feedId: string;
    bool: boolean;
  };
  setShowOptions: any;
};
const FeedItem = (props: Props) => {
  const {
    _id,
    images,
    title,
    description,
    user,
    createdAt,
    showOptions,
    setShowOptions,
  } = props;

  const crudOptionsRef = useRef(null);

  useClickOutside(crudOptionsRef, () => {
    setShowOptions({ feedId: '', bool: false });
  });
  return (
    <React.Fragment>
      <div className="w-full mb-10 relative border border-gray-300 rounded-[9px]">
        {/* top part in feed */}
        <div className="absolute top-0 right-0 left-0 px-2 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture}
              alt=""
              className="h-[35px] w-[35px] rounded-full object-cover"
            />
            <div className="p-2">
              <h5 className="text-sm font-poppins font-medium">{user?.name}</h5>
              <p className="text-xs font-normal font-poppins">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>
          <div ref={crudOptionsRef} className="relative">
            <div
              onClick={() => setShowOptions({ feedId: _id, bool: true })}
              className="p-2 border border-gray-400 rounded-[9px] cursor-pointer"
            >
              <GearIcon className="h-10 w-10 text-gray-700" />
            </div>
            {showOptions.bool && showOptions.feedId === _id && (
              <div className="absolute border border-red-200 right-1 top-[35px] bg-white rounded-[9px] w-[150px] p-4">
                <div className="flex items-center space-x-4 mb-2">
                  <EditIcon className="text-gray-400 text-[8px] font-bold" />
                  <p className="text-[12px] font-medium font-poppins">
                    Edit Post
                  </p>
                </div>
                <div className="h-1 bg-red-200 mb-2"></div>

                <div className="flex items-center space-x-4">
                  <DeleteIcon className="text-red-400 text-[8px] font-bold" />
                  <p className="text-[12px] font-medium font-poppins">
                    Delete Post
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* title of the post */}
        <div className="pt-[100px] p-4 px-0 md:px-[80px] lg:px-[120px]">
          <h5 className="text-[24px] font-medium font-poppins">{title}</h5>
          <div className="">
            <ImagesCarousel images={images} />
          </div>
          <p className="text-xs font-normal font-poppins">{description}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedItem;
