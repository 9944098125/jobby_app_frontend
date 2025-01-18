import { lazyLoad } from 'utils/loadable';

export const Feed = lazyLoad(
  () => import('./index'),
  module => module.Feed,
);
