/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const Feed = lazyLoad(
  () => import('./index'),
  module => module.Feed,
);
