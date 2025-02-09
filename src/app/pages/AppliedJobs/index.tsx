import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import JobsListItem from './components/list-item';
import JobItem from './components/job-item';

export function AppliedJobs() {
  const { useLazyJobsAppliedByUserQuery } = useGlobalSlice();

  const [
    getJobsApplied,
    {
      isLoading: getJobsLoading,
      data: jobsData,
      isError: getJobsError,
      error: getJobsErrorMessage,
    },
  ] = useLazyJobsAppliedByUserQuery();

  const user = useSelector(selectUser);
  const [selectedJobId, setSelectedJobId] = useState<null | string>(null);

  useEffect(() => {
    getJobsApplied({ userId: user?._id });
  }, [user?.appliedJobs]);

  useEffect(() => {
    if (jobsData?.jobs?.length && !selectedJobId) {
      setSelectedJobId(jobsData?.jobs[0]?._id);
    }
  }, [jobsData, selectedJobId]);

  return (
    <React.Fragment>
      <div className="w-full bg-teal-50 px-10 py-5">
        <div className="w-full grid grid-cols-12 gap-4">
          {/* ✅ Job List (Left Side on Large Screens, Full Width on Small Screens) */}
          <div
            id="LIST_SCROLLBAR"
            className="col-span-12 md:col-span-4 md:h-[86vh] overflow-y-auto"
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
                  {selectedJobId === item?._id && <JobItem item={item} />}
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Job Details (Right Side on Large Screens, Hidden on Small Screens) */}
          <div
            id="LIST_SCROLLBAR"
            className="hidden md:block md:col-span-8 md:h-[86vh] overflow-y-auto"
          >
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
