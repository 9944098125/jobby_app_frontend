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

  return (
    <React.Fragment>
      <div className="relative w-full">
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
        <div className="p-5 pt-10 flex items-center justify-center flex-wrap">
          {/* all the jobs inside this container  */}
          {jobsData?.jobs?.map(item => {
            <div className="container bg-teal-50 shadow-lg h-screen">
              <div
                id="LIST_SCROLLBAR"
                className="w-1/3 h-[80vh] overflow-y-scroll border-r-1 border-r-teal-700"
              >
                <JobsListItem item={item} />
              </div>
              return (
              <React.Fragment>
                <div className="w-2/3">
                  <JobItem item={item} />
                </div>
              </React.Fragment>
              );
            </div>;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
