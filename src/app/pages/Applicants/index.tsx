import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function Applicants() {
  const { useLazyGetJobApplicantsQuery } = useGlobalSlice();

  const [
    getApplicants,
    {
      isLoading: applicantsLoading,
      data: applicantsData,
      isError: applicantsError,
      error: applicantsErrorMessage,
    },
  ] = useLazyGetJobApplicantsQuery();

  const employer = useSelector(selectUser);

  useEffect(() => {
    getApplicants({ employerId: employer?._id });
  }, [employer?.appliedJobs]);

  return (
    <React.Fragment>
      <div className="container px-10 py-5">
        <div className="">
          {applicantsData?.jobApplicants.map(job => (
            <div
              key={job.jobId}
              className="bg-white shadow-lg rounded-xl mb-8 p-6 transition-transform hover:scale-105"
            >
              {/* Job Details */}
              <div className="flex items-center gap-4">
                <div className="rounded-full p-5 border-2 border-teal-600">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-[100px] h-[100px] rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-teal-700">
                    {job.companyName}
                  </h2>
                  <p className="text-gray-600">{job.role}</p>
                  <p className="text-gray-500">{job.location}</p>
                </div>
              </div>

              {/* Applicants Section */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Applicants ({job.applicants.length})
                </h3>
                <div className="space-y-3">
                  {job.applicants.map(applicant => (
                    <div
                      key={applicant._id}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                    >
                      {/* Applicant Details */}
                      <div className="flex items-center gap-3">
                        <img
                          src={applicant.profilePicture}
                          alt={applicant.name}
                          className="w-[60px] h-[60px] rounded-full border-2 border-teal-500 shadow-sm"
                        />
                        <div>
                          <p className="text-gray-800 font-medium">
                            {applicant.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {applicant.email}
                          </p>
                          <p className="text-gray-500 text-xs">
                            📞 {applicant.countryCode} {applicant.phone}
                          </p>
                        </div>
                      </div>

                      {/* Resume Link */}
                      <a
                        href={applicant.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition"
                      >
                        View Resume
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
