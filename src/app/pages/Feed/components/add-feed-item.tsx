import { Input } from 'app/components/ui/input';
import { selectUser } from 'app/slice/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { MedalIcon, PackagePlusIcon, TagsIcon } from 'lucide-react';

type Props = {
  clickAddFeed: () => void;
};
const AddFeedItem = (props: Props) => {
  const { clickAddFeed } = props;
  const user = useSelector(selectUser);
  return (
    <React.Fragment>
      <div
        onClick={clickAddFeed}
        className="cursor-pointer w-full min-h-[100px] rounded-[9px] p-4 flex items-center justify-stretch"
      >
        <div className="flex items-stretch md:space-x-5 w-full">
          <div className="hidden md:block h-[80px] w-[80px] border-2 border-pink-600 rounded-full p-2">
            <img
              src={user?.profilePicture}
              alt=""
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="w-full">
            <Input
              type="text"
              placeholder="Write a Post..."
              className="h-[50px] w-full rounded-[45px] border border-gray-400 outline-none"
            />
            <div className="w-full flex items-center justify-between space-x-4 py-2 px-4">
              <div className="flex items-center space-x-5">
                <MedalIcon className="h-8 w-8 text-blue-600" />
                <p className="text-[10px] md:text-[14px] font-medium font-poppins">
                  Media
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <TagsIcon className="h-8 w-8 text-pink-600" />
                <p className="text-[10px] md:text-[14px] font-medium font-poppins">
                  Contribute Expertise
                </p>
              </div>

              <div className="flex items-center space-x-5">
                <PackagePlusIcon className="h-8 w-8 text-gray-600" />
                <p className="text-[10px] md:text-[14px] font-medium font-poppins">
                  Post Article
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddFeedItem;
