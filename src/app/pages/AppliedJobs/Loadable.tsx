import { lazyLoad } from 'utils/loadable';

export const AppliedJobs = lazyLoad(
  () => import('./index'),
  module => module.AppliedJobs,
);
