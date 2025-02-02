import React from 'react';
import { formatRelativeDate } from 'utils/agoFormatter';

type Props = {
  item: {
    _id: string;
    role: string;
    location: string;
    skills: number[];
    experience: number[];
    companyName: string;
    companyLogo: string;
    basicQualifications: number[];
    appliedUser: any[];
    aboutTheCompany: string;
    aboutTheJob: string;
    salary: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  isSelected: boolean;
  setSelectedJob: (val: string) => void;
};

const JobsListItem = (props: Props) => {
  const { item, isSelected, setSelectedJob } = props;
  console.log('item', item);

  return (
    <React.Fragment>
      <div
        onClick={() => setSelectedJob(item?._id)}
        className={`w-full flex items-start space-x-5 py-5 rounded-[9px] ${
          isSelected && 'bg-teal-100 border border-r-600'
        }`}
      >
        <div className="w-1/5 shadow-lg shadow-teal-600">
          <img
            src={item?.companyLogo}
            alt=""
            className="w-[100px] h-[100px] p-2"
          />
        </div>
        <div className="w-4/5">
          <h5 className="text-[18px] font-poppins text-gray-700 font-normal">
            {item?.role}
          </h5>
          <p className="text-[12px] text-gray-400 font-normal font-poppins">
            {item?.companyName}
          </p>
          <p className="text-[12px] text-gray-400 font-normal font-poppins">
            {item?.location}
          </p>
          <p className="mt-5 text-[12px] text-gray-400 font-normal font-poppins">
            {formatRelativeDate(item?.createdAt)}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobsListItem;
