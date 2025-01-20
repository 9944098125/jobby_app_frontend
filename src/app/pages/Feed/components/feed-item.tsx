import { GearIcon, TrashIcon, UpdateIcon } from '@radix-ui/react-icons';
import React, { useRef } from 'react';
import { formatDate } from 'utils/formatDate';
import { useClickOutside } from 'utils/hooks/use-click-outside';
import ImagesCarousel from './images-carousel';
import { useGlobalSlice } from 'app/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';
import { toast } from 'app/components/ui/use-toast';
import { Icons } from 'app/components/ui/icons';
import { Navigation2Icon, NavigationIcon } from 'lucide-react';

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
  reference: string;
  createdAt: string;
  showOptions: {
    feedId: string;
    bool: boolean;
  };
  setShowOptions: any;
  feedItem: {
    _id: string;
    title: string;
    description: string;
    user: {
      userId: string;
      profilePicture: string;
      name: string;
    };
    images: string[];
    reference: string;
    createdAt: string;
  };
  deleteFeed: any;
  deleteLoading: boolean;
};
const FeedItem = (props: Props) => {
  const {
    _id,
    images,
    title,
    description,
    reference,
    user,
    createdAt,
    showOptions,
    setShowOptions,
    feedItem,
    deleteFeed,
    deleteLoading,
  } = props;

  const crudOptionsRef = useRef(null);
  const dispatch = useDispatch();

  const { actions } = useGlobalSlice();

  const userInStorage = useSelector(selectUser);

  useClickOutside(crudOptionsRef, () => {
    setShowOptions({ feedId: '', bool: false });
  });

  const handleEditFeed = (feed: any) => {
    // console.log('feed', feed);
    if (userInStorage) {
      dispatch(actions.setEditFeed({ data: feed }));
    } else {
      toast({
        description: 'Please Login !',
        variant: 'destructive',
      });
    }
  };

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
          <div className="relative">
            <div
              onClick={() => setShowOptions({ feedId: _id, bool: true })}
              className="p-2 border border-gray-400 rounded-[9px] cursor-pointer"
            >
              <GearIcon className="h-10 w-10 text-gray-700" />
            </div>
            {showOptions.bool && showOptions.feedId === _id && (
              <div
                ref={crudOptionsRef}
                className="absolute border border-teal-700 right-1 top-[35px] bg-teal-50 rounded-[9px] w-[150px] p-4"
              >
                <div
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditFeed(feedItem);
                  }}
                  className="flex items-center space-x-4 mb-2 cursor-pointer"
                >
                  <UpdateIcon className="text-gray-400 text-[8px] font-bold" />
                  <p className="text-[12px] font-medium font-poppins">
                    Edit Post
                  </p>
                </div>
                <div className="h-1 bg-teal-200 mb-2"></div>

                <div
                  onClick={() =>
                    deleteFeed({ feedId: _id, userId: userInStorage?._id })
                  }
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <TrashIcon className="text-red-400 text-[8px] font-bold" />
                  <p className="text-[12px] font-medium font-poppins flex items-center space-x-2">
                    Delete Post{' '}
                    {deleteLoading && (
                      <Icons.Spinner className="animate-spin text-blue-600" />
                    )}
                  </p>
                </div>
              </div>
            )}
            <div className="absolute right-[100px] top-1 p-2 border border-gray-400 rounded-[9px] cursor-pointer">
              <a
                rel="reference-link noreferrer"
                href={reference}
                target="_blank"
                className="flex items-center w-[150px] justify-center space-x-4 text-[14px] text-blue-400 hover:text-blue-600 hover:underline font-normal font-poppins"
              >
                <p className="text-[12px] font-bold text-gray-700 font-poppins">
                  Reference Link
                </p>
                <NavigationIcon className="text-gray-700 h-10 w-10 font-bold" />
              </a>
            </div>
          </div>
        </div>
        {/* title of the post */}
        <div className="pt-[100px] p-4 px-0 md:px-[80px] lg:px-[120px]">
          <h5 className="text-[24px] font-medium font-poppins">{title}</h5>
          <div className="">
            <ImagesCarousel images={images} />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: description?.replace(
                /([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/gu,
                '<span class="emoji">$1</span>',
              ) as string,
            }}
            className="text-[18px] font-normal font-poppins"
          ></p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedItem;
