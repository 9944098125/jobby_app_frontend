import React from 'react';
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'app/components/ui/sheet';
import { Controller, useForm } from 'react-hook-form';
import Label from 'app/components/ui/label';
import { Input } from 'app/components/ui/input';
import Select from 'react-select';
import { settingConfig } from 'utils/settingConfig';
import makeAnimated from 'react-select/animated';
import { formatToINROnBlur, handleKeyDown } from 'utils/formatAmount';
import { Button } from 'app/components/ui/button';

type Props = {
  heading: string;
  show: boolean;
  setShow: (val: boolean) => void;
};
const CreateJobSheet = (props: Props) => {
  const { heading, show, setShow } = props;

  const form = useForm();
  const animatedComponents = makeAnimated();

  const {
    formState: { errors },
    register,
    watch,
    control,
  } = form;

  const submitCreateJob = (data: any) => {
    console.log('data', data);
  };
  return (
    <React.Fragment>
      <SheetContent className="bg-[#ffffffc2] backdrop-blur">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>
              <h5 className="text-[23px] font-medium font-poppins">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
                  {heading}
                </span>
              </h5>{' '}
            </SheetTitle>
            <SheetClose>
              <div className="border-blue-600 border-2 flex items-center justify-center rounded-full p-2 text-blue-600 cursor-pointer">
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
            </SheetClose>
          </div>
        </SheetHeader>
        <form className="w-full" onSubmit={form.handleSubmit(submitCreateJob)}>
          <div className="w-full p-2">
            <div className="mb-4">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                {...register('companyName', {
                  required: 'Company Name is required !',
                })}
                placeholder="Enter the Company Name"
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] h-[45px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.companyName ? 'border-2 border-red-600' : ''
                }`}
                id="companyName"
              />
              {errors?.companyName && !watch('companyName') && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.companyName?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="aboutCompany">About the company</Label>
              <textarea
                rows={5}
                placeholder="Enter About the Company"
                {...register('aboutCompany')}
                className={`w-full p-4 bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.aboutCompany ? 'border-2 border-red-600' : ''
                }`}
                id="aboutCompany"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="role">Role</Label>
              <Input
                type="text"
                placeholder="Enter the Role"
                {...register('role', {
                  required: 'Role is required !',
                })}
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] h-[45px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.role ? 'border-2 border-red-600' : ''
                }`}
                id="role"
              />
              {errors?.role && !watch('role') && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.role?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="aboutJob">About the Job</Label>
              <textarea
                rows={5}
                placeholder="Enter About the Job"
                {...register('aboutJob')}
                className={`w-full p-4 bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.aboutJob ? 'border-2 border-red-600' : ''
                }`}
                id="aboutJob"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="salary">Salary</Label>
              <Input
                type="text"
                placeholder="Enter the Salary Offered"
                {...register('salary', {
                  required: 'Salary is required !',
                })}
                onKeyDown={e => handleKeyDown(e)}
                onBlur={e => formatToINROnBlur(e.target as HTMLInputElement)}
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] h-[45px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.salary ? 'border-2 border-red-600' : ''
                }`}
                id="salary"
              />
              {errors?.salary && !watch('salary') && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.salary?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="experience">Required Experience</Label>
              <Controller
                name="experience"
                control={control}
                rules={{ required: 'Experience is required!' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    isMulti
                    name="experience"
                    components={animatedComponents}
                    options={settingConfig.requiredExperience.map(i => ({
                      value: i.key,
                      label: i.value,
                    }))}
                    className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                      error ? 'border-2 border-red-600' : ''
                    }`}
                    classNamePrefix="select"
                    onChange={selected => field.onChange(selected)}
                    value={field.value}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.experience?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                {...register('location', {
                  required: 'Location is required !',
                })}
                placeholder="Enter Your Location"
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] h-[45px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.location ? 'border-2 border-red-600' : ''
                }`}
                id="location"
              />
              {errors?.location && !watch('location') && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.location?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="basicQualifications">Basic Qualifications</Label>
              <Select
                isMulti
                name="basicQualifications"
                components={animatedComponents}
                options={settingConfig.qualifications.map(i => ({
                  value: i.key,
                  label: i.value,
                }))}
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.basicQualifications ? 'border-2 border-red-600' : ''
                }`}
                classNamePrefix="select"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="skills">Required Skills</Label>
              <Select
                isMulti
                name="skills"
                components={animatedComponents}
                options={settingConfig.skills.map(i => ({
                  value: i.key,
                  label: i.value,
                }))}
                className={`w-full bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.skills ? 'border-2 border-red-600' : ''
                }`}
                classNamePrefix="select"
              />
            </div>
            <Button variant="special" className="w-full h-[45px] rounded-full">
              Post Job
            </Button>
          </div>
        </form>
      </SheetContent>
    </React.Fragment>
  );
};

export default CreateJobSheet;
