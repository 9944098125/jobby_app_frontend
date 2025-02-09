import { Button } from 'app/components/ui/button';
import { Icons } from 'app/components/ui/icons';
import { toast } from 'app/components/ui/use-toast';
import { useGlobalSlice } from 'app/slice';
import { selectUser } from 'app/slice/selectors';
import { DeleteIcon, EditIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatRelativeDate } from 'utils/agoFormatter';
import { formatRupee } from 'utils/formatAmount';
import { settingConfig } from 'utils/settingConfig';

type Props = {
  item: {
    _id: string;
    role: string;
    location: string;
    skills: number[];
    companyLogo: string;
    experience: number[];
    companyName: string;
    basicQualifications: number[];
    appliedUser: any[];
    aboutTheCompany: string;
    aboutTheJob: string;
    salary: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  handleEdit: (job: any) => void;
  handleDelete: (jobId: string) => void;
  deleteLoading: boolean;
  apply: any;
  applyLoading: boolean;
  applySuccess: boolean;
};
const JobItem = (props: Props) => {
  const {
    item,
    handleEdit,
    handleDelete,
    deleteLoading,
    apply,
    applyLoading,
    applySuccess,
  } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { actions } = useGlobalSlice();

  return (
    <React.Fragment>
      <div className="p-5 relative">
        {user?.isEmployer && (
          <div className="absolute right-[200px] top-2 flex items-center space-x-5">
            <Button
              variant="outline"
              onClick={() => handleEdit(item)}
              className="bg-blue-100 rounded-[9px] p-5 cursor-pointer"
            >
              <EditIcon className="text-blue-600 text-[15px] font-bold" />
            </Button>
            <Button
              onClick={() => handleDelete(item?._id)}
              variant="outline"
              className="bg-red-100 rounded-[9px] p-5 cursor-pointer"
            >
              <Trash2Icon className="text-red-600 text-[15px] font-bold" />{' '}
              {deleteLoading && (
                <Icons.Spinner className="animate-spin h-8 w-8" />
              )}
            </Button>
          </div>
        )}
        {/* company logo and name  */}
        <div className="p-2">
          <img src={item?.companyLogo} alt="" className="h-[50px] w-[50px]" />
          <p className="text-[14px] font-normal font-poppins">
            {item?.companyName}
          </p>
          <p className="text-[23px] font-medium font-poppins">{item?.role}</p>
          <p className="text-[12px] font-medium font-poppins">
            {item?.location}
          </p>
          <p className="text-[10px] font-normal font-poppins">
            {formatRelativeDate(item?.createdAt)}
          </p>
        </div>
        {user ? (
          !user?.isEmployer && (
            <div className="my-4">
              <Button
                onClick={() => {
                  if (user?.resume) {
                    apply({ jobId: item?._id, userId: user?._id });
                    dispatch(
                      actions.updateUser({
                        ...user,
                        appliedJobs: [...user?.appliedJobs, item?._id],
                      }),
                    );
                  } else {
                    toast({
                      description: 'Please upload your Resume First !',
                      variant: 'destructive',
                    });
                  }
                }}
                type="button"
                variant="special"
                className="px-5 py-2"
                disabled={user?.appliedJobs?.includes(item?._id)}
              >
                {user?.appliedJobs?.includes(item?._id)
                  ? 'Applied Already'
                  : 'Instant Apply'}
                {applyLoading && (
                  <Icons.Spinner className="animate-spin h-8 w-8" />
                )}
              </Button>
            </div>
          )
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="my-4">
              <Button type="button" variant="special" className="px-5 py-2">
                Apply
              </Button>
            </div>
          </Link>
        )}
        <div className="p-2 font-poppins">
          <h5 className="text-[19px] underline font-medium">About the Job</h5>
          <p className="text-[14px] font-normal">{item?.aboutTheJob}</p>
        </div>

        <div className="p-2 font-poppins">
          <h5 className="text-[19px] underline font-medium">
            Preferred Qualifications
          </h5>
          <div className="text-[14px] flex items-center space-x-5 text-gray-400 font-normal">
            {item?.basicQualifications?.map(eachQualification => {
              return (
                <div className="bg-gray-100 border border-gray-600 text-black rounded-full px-5 py-2">
                  {
                    settingConfig.qualifications?.filter(
                      i => i.key === eachQualification,
                    )?.[0]?.value
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2 font-poppins">
          <h5 className="text-[19px] underline font-medium">
            Required Experience
          </h5>
          <div className="text-[14px] flex items-center space-x-5 text-gray-400 font-normal">
            {item?.experience?.map(exp => {
              return (
                <div className="bg-gray-100 border border-gray-600 text-black rounded-full px-5 py-2">
                  {
                    settingConfig.requiredExperience?.filter(
                      i => i.key === exp,
                    )?.[0]?.value
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-2 font-poppins">
          <h5 className="text-[19px] underline font-medium">Required Skills</h5>
          <div className="text-[14px] flex items-center space-x-5 text-gray-400 font-normal">
            {item?.skills?.map(eachSkill => {
              return (
                <div className="bg-gray-100 border border-gray-600 text-black rounded-full px-5 py-2">
                  {
                    settingConfig.skills?.filter(i => i.key === eachSkill)?.[0]
                      ?.value
                  }
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-4 flex items-center space-x-5">
          <p className="text-gray-400 font-medium font-poppins text-[14px]">
            Salary -
          </p>
          <p className="text-teal-600 font-bold font-playWrite text-[18px]">
            {formatRupee(Number(item?.salary))}
          </p>
        </div>

        <div className="p-2 font-poppins">
          <h5 className="text-[19px] underline font-medium">
            About the Company
          </h5>
          <p className="text-[14px] font-normal">{item?.aboutTheCompany}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobItem;
