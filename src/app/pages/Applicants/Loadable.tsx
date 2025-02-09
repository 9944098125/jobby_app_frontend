import { lazyLoad } from 'utils/loadable';

export const Applicants = lazyLoad(
  () => import('./index'),
  module => module.Applicants,
);
