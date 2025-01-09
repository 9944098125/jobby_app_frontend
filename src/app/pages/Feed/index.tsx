import { useGlobalSlice } from 'app/slice';
import React from 'react';
import { Helmet } from 'react-helmet-async';

export function Feed() {
  const {
    useCreateFeedMutation,
    useLazyGetFeedsQuery,
    useUpdateFeedMutation,
    useDeleteFeedMutation,
  } = useGlobalSlice();

  const [
    createFeed,
    {
      isLoading: createLoading,
      isSuccess: createSuccess,
      isError: createError,
      error: createErrorMessage,
    },
  ] = useCreateFeedMutation();

  const [
    getFeeds,
    {
      isLoading: getLoading,
      isSuccess: getSuccess,
      data: feedData,
      isError: getError,
      error: getErrorMessage,
    },
  ] = useLazyGetFeedsQuery();

  const [
    updateFeed,
    {
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      isError: updateError,
      error: updateErrorMessage,
    },
  ] = useUpdateFeedMutation();

  const [
    deleteFeed,
    {
      isLoading: deleteLoading,
      isSuccess: deleteSuccess,
      isError: deleteError,
      error: deleteErrorMessage,
    },
  ] = useDeleteFeedMutation();

  return (
    <React.Fragment>
      <Helmet>
        <title>Feed</title>
        <meta name="description" content="Feed" />
      </Helmet>
      <div className="w-full min-h-screen flex items-center justify-center">
        <h5 className="text-2xl font-poppins font-medium">Feed</h5>
      </div>
    </React.Fragment>
  );
}
