import { Button } from 'app/components/ui/button';
import { Sheet, SheetTrigger } from 'app/components/ui/sheet';
import { selectUser } from 'app/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateJobSheet from './components/create-job-sheet';
import { useGlobalSlice } from 'app/slice';
import { toast } from 'app/components/ui/use-toast';
import JobItem from './components/job-item';
import JobsListItem from './components/list-item';

export function Jobs() {
  const {
    useCreateJobMutation,
    useLazyGetJobsQuery,
    useUpdateJobMutation,
    useDeleteJobMutation,
  } = useGlobalSlice();

  const [
    createJob,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: createError,
      error: createErrorMessage,
    },
  ] = useCreateJobMutation();

  const [
    getJobs,
    {
      data: jobsData,
      isError: jobsError,
      error: jobsErrorMessage,
      isLoading: jobsLoading,
      isSuccess: jobsSuccess,
    },
  ] = useLazyGetJobsQuery();

  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const changeImage = async (file: File | null) => {
    setImageUploadLoading(true);
    if (file === null) {
      return;
    } else if (
      file?.type === 'image/jpeg' ||
      'image/jpg' ||
      'image/png' ||
      'image.svg' ||
      'image/gfif'
    ) {
      const imgData = new FormData();
      imgData.append('file', file);
      imgData.append('upload_preset', 'save_qa');
      imgData.append('cloud_name', 'dakda5ni3');
      await fetch('https://api.cloudinary.com/v1_1/dakda5ni3/image/upload', {
        method: 'POST',
        body: imgData,
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          setCompanyLogo(data?.url);
          setImageUploadLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (createSuccess) {
      setShow(false);
      toast({
        description: 'Created a Job Successfully',
        variant: 'success',
      });
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createError) {
      toast({
        description: createErrorMessage as string,
        variant: 'destructive',
      });
    }
  }, [createError, createErrorMessage]);

  useEffect(() => {
    getJobs({});
  }, [createSuccess]);

  useEffect(() => {
    if (jobsData?.jobs?.length && !selectedJobId) {
      setSelectedJobId(jobsData?.jobs[0]?._id);
    }
  }, [jobsData, selectedJobId]);

  return (
    <React.Fragment>
      <div className="relative container pt-10 bg-teal-50">
        {user?.isEmployer && (
          <Sheet open={show} onOpenChange={setShow}>
            <SheetTrigger asChild>
              <Button
                variant="special"
                className="px-5 py-4 absolute right-1 top-1"
              >
                Create a Job
              </Button>
            </SheetTrigger>
            <CreateJobSheet
              uploadCompanyLogo={changeImage}
              imageUploadLoading={imageUploadLoading}
              companyLogo={companyLogo}
              create={createJob}
              isLoading={createLoading}
              heading="Add a Job"
            />
          </Sheet>
        )}
        {/* all the jobs inside this container  */}
        <div className="w-full grid grid-cols-12 gap-4">
          {/* ✅ Job List (Left Side on Large Screens, Full Width on Small Screens) */}
          <div className="col-span-12 md:col-span-4 md:h-[85vh] overflow-y-auto">
            {jobsData?.jobs?.map((item: any) => (
              <div key={item?._id} className="">
                <JobsListItem
                  isSelected={selectedJobId === item?._id}
                  setSelectedJob={setSelectedJobId}
                  item={item}
                />
                {/* ✅ Show JobItem below on small screens */}
                <div className="block md:hidden">
                  {selectedJobId === item?._id && <JobItem item={item} />}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Job Details (Right Side on Large Screens, Hidden on Small Screens) */}
          <div className="hidden md:block md:col-span-8 h-[85vh] overflow-y-auto">
            {jobsData?.jobs?.map((item: any) => (
              <div key={item?._id} className="">
                {selectedJobId === item?._id && <JobItem item={item} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
