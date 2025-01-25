import React from 'react';
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'app/components/ui/sheet';
import { useForm } from 'react-hook-form';
import Label from 'app/components/ui/label';
import { Input } from 'app/components/ui/input';

type Props = {
  heading: string;
  show: boolean;
  setShow: (val: boolean) => void;
};
const CreateJobSheet = (props: Props) => {
  const { heading, show, setShow } = props;

  const form = useForm();

  const {
    formState: { errors },
    register,
    watch,
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
            <div className="mb-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                {...form.register('companyName', {
                  required: 'Company Name is required !',
                })}
                className="w-full placeholder:text-gray-300"
                id="companyName"
              />
              {errors?.companyName && !watch('companyName') && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.companyName?.message as string}
                </p>
              )}
            </div>

            <div className="mb-2">
              <Label htmlFor="aboutCompany">About the company</Label>
              <Input
                type="text"
                {...form.register('aboutCompany')}
                className="w-full placeholder:text-gray-300"
                id="aboutCompany"
              />
            </div>
          </div>
        </form>
      </SheetContent>
    </React.Fragment>
  );
};

export default CreateJobSheet;
