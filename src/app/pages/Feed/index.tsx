import { useGlobalSlice } from 'app/slice';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AddFeedItem from './components/add-feed-item';
import FeedModal from './components/feed-modal';

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

  const [showFeedModal, setShowFeedModal] = useState(false);

  return (
    <React.Fragment>
      <Helmet>
        <title>Feed</title>
        <meta name="description" content="Feed" />
      </Helmet>
      <div className="min-h-screen flex justify-center">
        <div className="w-full md:w-4/6 px-2 md:px-0">
          <div className="mt-[80px]">
            {/* adding feed items */}
            <AddFeedItem clickAddFeed={() => setShowFeedModal(true)} />
            {showFeedModal && (
              <FeedModal
                show={showFeedModal}
                setShow={setShowFeedModal}
                heading="Add Your Post"
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
