import React from 'react';

type Props = {
  item: {
    _id: string;
    role: string;
    location: string;
    skills: number[];
    companyLogo: string;
    experience: number[];
    companyName: string;
    basicQualifications: number[];
    appliedUser: any[];
    aboutTheCompany: string;
    aboutTheJob: string;
    salary: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};
const JobItem = (props: Props) => {
  const { item } = props;
  return (
    <React.Fragment>
      <div className="p-5 h-[80vh">
        {/* company logo and name  */}
        <div className="p-2">
          <img src={item?.companyLogo} alt="" className="h-[50px] w-[50px]" />
          <p className="text-[14px] font-normal font-poppins">
            {item?.companyName}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobItem;
