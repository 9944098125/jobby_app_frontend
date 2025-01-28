import { Button } from 'app/components/ui/button';
import { Sheet, SheetTrigger } from 'app/components/ui/sheet';
import { selectUser } from 'app/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateJobSheet from './components/create-job-sheet';
import { useGlobalSlice } from 'app/slice';
import { toast } from 'app/components/ui/use-toast';
import JobItem from './components/job-item';

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
  }, []);

  return (
    <React.Fragment>
      <div className="relative w-full min-h-screen">
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
              create={createJob}
              isLoading={createLoading}
              heading="Add a Job"
            />
          </Sheet>
        )}
        <div className="p-5 pt-10 flex items-center justify-center flex-wrap">
          {/* all the jobs inside this container  */}
          {jobsData?.jobs?.map(job => {
            return <JobItem key={job?._id} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
