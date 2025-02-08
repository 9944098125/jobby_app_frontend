import { Button } from 'app/components/ui/button';
import { Sheet, SheetTrigger } from 'app/components/ui/sheet';
import { selectEditJob, selectUser } from 'app/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    useGenerateAboutTheJobMutation,
    actions,
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

  const [
    generateAboutTheJob,
    {
      data: generateData,
      isSuccess: generateSuccess,
      isLoading: generateLoading,
      isError: generateError,
      error: generateErrorMessage,
    },
  ] = useGenerateAboutTheJobMutation();

  const [
    updateJob,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorMessage,
    },
  ] = useUpdateJobMutation();

  const [
    deleteJob,
    {
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteError,
      error: deleteErrorMessage,
    },
  ] = useDeleteJobMutation();

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const job = useSelector(selectEditJob);

  const [show, setShow] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>('');
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

  const handleEditJob = (job: any) => {
    dispatch(actions.setEditJob({ data: job }));
  };

  useEffect(() => {
    if (createSuccess) {
      setCompanyLogo('');
      setShow(false);
      toast({
        description: 'Created a Job Successfully',
        variant: 'success',
      });
      dispatch(actions.setEditJob({ data: null }));
    }
  }, [createSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      setShow(false);
      setCompanyLogo('');
      toast({
        description: 'Updated the Job Successfully',
        variant: 'success',
      });
      dispatch(actions.setEditJob({ data: null }));
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError || updateErrorMessage) {
      toast({
        description: updateErrorMessage as string,
        variant: 'destructive',
      });
    }
  }, [updateError, updateErrorMessage]);

  useEffect(() => {
    if (createError) {
      toast({
        description: createErrorMessage as string,
        variant: 'destructive',
      });
    }
  }, [createError, createErrorMessage]);

  useEffect(() => {
    if (generateSuccess) {
      toast({
        description: 'Generated About the job',
        variant: 'success',
      });
    }
  }, [generateSuccess]);

  useEffect(() => {
    getJobs({});
  }, [createSuccess, updateSuccess, deleteSuccess]);

  useEffect(() => {
    if (jobsData?.jobs?.length && !selectedJobId) {
      setSelectedJobId(jobsData?.jobs[0]?._id);
    }
  }, [jobsData, selectedJobId]);

  useEffect(() => {
    if (job) {
      setShow(true);
      setCompanyLogo(job?.companyLogo);
    }
  }, [job]);

  return (
    <React.Fragment>
      <div className="relative container bg-teal-50">
        <div className="my-8">
          {user?.isEmployer && (
            <Sheet open={show} onOpenChange={setShow}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="special"
                  className="px-5 py-4 absolute z-[9] right-1 top-1"
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
                generate={generateAboutTheJob}
                generateLoading={generateLoading}
                generateData={generateData}
                generateSuccess={generateSuccess}
                createSuccess={createSuccess}
                updateLoading={updateLoading}
                updateJob={updateJob}
                updateSuccess={updateSuccess}
              />
            </Sheet>
          )}
        </div>
        {/* all the jobs inside this container  */}
        <div className="w-full grid grid-cols-12 gap-4">
          {/* ✅ Job List (Left Side on Large Screens, Full Width on Small Screens) */}
          <div
            id="LIST_SCROLLBAR"
            className="col-span-12 md:col-span-4 md:h-[85vh] overflow-y-auto"
          >
            {jobsData?.jobs?.map((item: any) => (
              <div key={item?._id} className="">
                <JobsListItem
                  isSelected={selectedJobId === item?._id}
                  setSelectedJob={setSelectedJobId}
                  item={item}
                />
                {/* ✅ Show JobItem below on small screens */}
                <div className="block md:hidden">
                  {selectedJobId === item?._id && (
                    <JobItem item={item} handleEdit={handleEditJob} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Job Details (Right Side on Large Screens, Hidden on Small Screens) */}
          <div
            id="LIST_SCROLLBAR"
            className="hidden md:block md:col-span-8 md:h-[85vh] overflow-y-auto"
          >
            {jobsData?.jobs?.map((item: any) => (
              <div key={item?._id} className="">
                {selectedJobId === item?._id && (
                  <JobItem item={item} handleEdit={handleEditJob} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
