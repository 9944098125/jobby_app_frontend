import React from 'react';

type Props = {
  htmlFor: string;
  children: React.ReactNode;
};
const Label = (props: Props) => {
  const { htmlFor, children } = props;
  return (
    <React.Fragment>
      <label htmlFor={htmlFor} className="text-[14px] font-medium font-poppins">
        {children}
      </label>
    </React.Fragment>
  );
};

export default Label;
