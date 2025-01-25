import { lazyLoad } from 'utils/loadable';

export const Jobs = lazyLoad(
  () => import('./index'),
  module => module.Jobs,
);
