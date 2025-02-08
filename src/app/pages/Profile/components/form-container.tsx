import { EditIcon } from 'lucide-react';
import React from 'react';

type Props = {
  editingField: string | null;
  formData: {
    name: string;
    email: string;
    phone: string;
    profilePicture: string;
    countryCode: string;
  };
  handleInputChange: (name: string, e: any) => void;
  handleInputBlur: (name: string) => void;
  handleEditClick: (name: string) => void;
  profileDetails: any;
};
const FormContainer = (props: Props) => {
  const {
    handleEditClick,
    handleInputBlur,
    handleInputChange,
    formData,
    editingField,
    profileDetails,
  } = props;
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center md:border-l w-full md:w-2/3">
        {/* Name Field */}
        <p className="text-teal-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-poppins">
          I'm{' '}
          {editingField === 'name' ? (
            <input
              className="border border-gray-300 rounded p-2"
              value={formData.name || ''}
              onChange={e => handleInputChange('name', e.target.value)}
              onBlur={() => handleInputBlur('name')}
            />
          ) : (
            <span className="text-pink-600 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
              {formData.name || 'N/A'}
              <EditIcon
                className="text-[15px] cursor-pointer"
                onClick={() => handleEditClick('name')}
              />
            </span>
          )}
        </p>

        {/* Email Field */}
        <p className="text-blue-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-poppins">
          you can mail me at{' '}
          {editingField === 'email' ? (
            <input
              className="border border-gray-300 rounded p-2"
              value={formData.email || ''}
              onChange={e => handleInputChange('email', e.target.value)}
              onBlur={() => handleInputBlur('email')}
            />
          ) : (
            <span className="text-yellow-400 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
              {formData.email || 'N/A'}
              <EditIcon
                className="text-[15px] cursor-pointer"
                onClick={() => handleEditClick('email')}
              />
            </span>
          )}
        </p>

        {/* Phone Field */}
        <p className="text-red-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-poppins">
          and call me on{' '}
          {editingField === 'phone' ? (
            <div className="flex items-center">
              <p className="text-2xl font-bold">{formData.countryCode}</p>
              <input
                className="border border-gray-300 rounded p-2"
                value={formData.phone || ''}
                onChange={e => handleInputChange('phone', e.target.value)}
                onBlur={() => handleInputBlur('phone')}
              />
            </div>
          ) : (
            <span className="text-violet-600 flex text-[20px] sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
              {formData.countryCode + formData.phone || 'N/A'}
              <EditIcon
                className="text-[15px] cursor-pointer"
                onClick={() => handleEditClick('phone')}
              />
            </span>
          )}
        </p>

        <p className="text-cyan-600 leading-loose text-[15px] sm:text-[18px] md:text-[28px] lg:text-[35px] font-medium font-poppins">
          I'm {profileDetails?.user?.isEmployer ? 'an' : 'a'}
          <span className="text-pink-800 flex text-[20px] cursor-pointer sm:text-[28px] md:text-[38px] lg:text-[55px] font-bold">
            {profileDetails?.user?.isEmployer ? 'Employer' : 'Job Seeker'}
          </span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default FormContainer;
