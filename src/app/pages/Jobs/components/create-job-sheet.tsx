import React, { useEffect } from 'react';
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
import { Icons } from 'app/components/ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditJob, selectUser } from 'app/slice/selectors';
import ErrorMessage from 'app/components/ui/error-message';
import { useGlobalSlice } from 'app/slice';

type Props = {
  heading: string;
  create: (body: any) => void;
  isLoading: boolean;
  uploadCompanyLogo: (File) => void;
  imageUploadLoading: boolean;
  companyLogo: string | null;
  generate: (body) => void;
  generateLoading: boolean;
  generateData: any;
  generateSuccess: boolean;
  createSuccess: boolean;
  updateLoading: boolean;
  updateJob: (body: any) => void;
  updateSuccess: boolean;
};
const CreateJobSheet = (props: Props) => {
  const {
    heading,
    create,
    isLoading,
    uploadCompanyLogo,
    imageUploadLoading,
    companyLogo,
    generate,
    generateLoading,
    generateData,
    generateSuccess,
    createSuccess,
    updateLoading,
    updateJob,
    updateSuccess,
  } = props;
  const user = useSelector(selectUser);
  const job = useSelector(selectEditJob);
  const dispatch = useDispatch();
  const { actions } = useGlobalSlice();

  const form = useForm();
  const animatedComponents = makeAnimated();

  const {
    formState: { errors },
    register,
    watch,
    control,
    setValue,
    handleSubmit,
  } = form;

  const handleGenerateAboutTheJob = () => {
    generate({
      jobTitle: watch('role'),
    });
  };

  useEffect(() => {
    if (generateSuccess) {
      setValue('aboutTheJob', generateData?.jobDescription);
    }
  }, [generateSuccess]);

  useEffect(() => {
    if (createSuccess) {
      form.reset({
        basicQualifications: null,
        skills: null,
        experience: null,
        companyName: null,
        aboutTheCompany: null,
        role: null,
        aboutTheJob: null,
        salary: null,
        location: null,
      });
    }
  }, [createSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      form.reset({
        basicQualifications: null,
        skills: null,
        experience: null,
        companyName: null,
        aboutTheCompany: null,
        role: null,
        aboutTheJob: null,
        salary: null,
        location: null,
      });
    }
  }, [updateSuccess]);

  const submitCreateJob = (data: any) => {
    console.log('data', data);
    if (job) {
      updateJob({
        ...data,
        jobId: job?._id,
        basicQualifications: data.basicQualifications?.map(i => i.value),
        skills: data.skills?.map(i => i.value),
        experience: data.experience?.map(i => i.value),
        userId: user?._id,
        companyLogo: companyLogo,
      });
    } else {
      create({
        ...data,
        basicQualifications: data.basicQualifications?.map(i => i.value),
        skills: data.skills?.map(i => i.value),
        experience: data.experience?.map(i => i.value),
        userId: user?._id,
        companyLogo: companyLogo,
      });
    }
  };

  const handleCloseSheet = () => {
    form.reset({
      basicQualifications: null,
      skills: null,
      experience: null,
      companyName: null,
      aboutTheCompany: null,
      role: null,
      aboutTheJob: null,
      salary: null,
      location: null,
    });
    dispatch(actions.setEditJob({ data: null }));
  };

  useEffect(() => {
    if (job) {
      form.reset({
        ...job,
        experience: settingConfig.requiredExperience
          .filter(i => job?.experience.includes(i.key))
          .map(i => ({ value: i.key, label: i.value })),
        basicQualifications: settingConfig.qualifications
          .filter(i => job?.basicQualifications.includes(i.key))
          .map(i => ({ value: i.key, label: i.value })),
        skills: settingConfig.skills
          .filter(i => job?.skills.includes(i.key))
          .map(i => ({ value: i.key, label: i.value })),
      });
    }
  }, [job]);

  return (
    <React.Fragment>
      <SheetContent
        onInteractOutside={(e: any) => e.preventDefault()}
        className="bg-[#ffffffc2] backdrop-blur"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>
              <h5 className="text-[23px] font-medium font-poppins">
                <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-700 bg-clip-text text-transparent">
                  {job ? 'Update Job' : 'Add a Job'}
                </span>
              </h5>{' '}
            </SheetTitle>
            <SheetClose>
              <Button
                onClick={handleCloseSheet}
                variant="outline"
                className="border-blue-600 border-2 flex items-center justify-center rounded-full p-2 text-blue-600 cursor-pointer"
              >
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
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <form className="w-full" onSubmit={handleSubmit(submitCreateJob)}>
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
              <Label htmlFor="CompanyLogo">
                <Label htmlFor="CompanyLogo">Upload Company Logo</Label>
                <Input
                  id="CompanyLogo"
                  onChange={(event: any) =>
                    uploadCompanyLogo(event.target?.files[0])
                  }
                  type="file"
                  style={{ display: 'none' }}
                />
                <div className="border-2 border-teal-600 h-[75px] w-[75px] rounded-full p-2 flex items-center justify-center">
                  {imageUploadLoading ? (
                    <Icons.Spinner className="animate-spin h-15 w-15 text-teal-600" />
                  ) : (
                    <img
                      src={companyLogo || '/logo.png'}
                      alt=""
                      className="h-full w-full rounded-full"
                    />
                  )}
                </div>
              </Label>
            </div>

            <div className="mb-4">
              <Label htmlFor="aboutTheCompany">About the company</Label>
              <textarea
                rows={5}
                placeholder="Enter About the Company"
                {...register('aboutTheCompany')}
                className={`w-full p-4 bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.aboutTheCompany ? 'border-2 border-red-600' : ''
                }`}
                id="aboutTheCompany"
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
              <div className="flex items-center justify-between px-5 mb-5">
                <Label htmlFor="aboutTheJob">About the Job</Label>
                <Button
                  type="button"
                  onClick={handleGenerateAboutTheJob}
                  variant="special"
                  className="px-5 py-2"
                >
                  Generate About the Job{' '}
                  {generateLoading && (
                    <Icons.Spinner className="animate-spin h-8 w-8" />
                  )}
                </Button>
              </div>
              <textarea
                rows={5}
                placeholder="Enter About the Job"
                {...register('aboutTheJob')}
                className={`w-full p-4 bg-white placeholder:text-gray-400 rounded-[9px] border-gray-300 outline-none border-2 active:border-teal-600 focus:border-teal-600 ${
                  errors.aboutTheJob ? 'border-2 border-red-600' : ''
                }`}
                id="aboutTheJob"
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
              <Label htmlFor="basicQualifications">
                Required Qualifications
              </Label>
              <Controller
                name="basicQualifications"
                control={control}
                rules={{ required: 'basicQualifications is required!' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    isMulti
                    name="basicQualifications"
                    components={animatedComponents}
                    options={settingConfig.qualifications.map(i => ({
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
              {errors.basicQualifications && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.basicQualifications?.message as string}
                </p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="skills">Required Skills</Label>
              <Controller
                name="skills"
                control={control}
                rules={{ required: 'Skills is required!' }}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    {...field}
                    isMulti
                    name="skills"
                    components={animatedComponents}
                    options={settingConfig.skills.map(i => ({
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
              {errors.skills && (
                <p className="text-red-600 font-medium font-poppins text-[10px]">
                  {errors.skills?.message as string}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="special"
              className="w-full h-[45px] rounded-full"
            >
              {job ? 'Update Job' : 'Post Job'}
              {(isLoading || updateLoading) && (
                <Icons.Spinner className="animate-spin h-8 w-8" />
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </React.Fragment>
  );
};

export default CreateJobSheet;
