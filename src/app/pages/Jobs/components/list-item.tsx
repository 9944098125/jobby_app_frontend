import React from 'react';

type Props = {
  item: {
    _id: string;
    role: string;
    location: string;
    skills: number[];
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
const JobsListItem = (props: Props) => {
  const { item } = props;
  return (
    <React.Fragment>
      <div className="py-5"></div>
    </React.Fragment>
  );
};

export default JobsListItem;
