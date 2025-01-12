import { useGlobalSlice } from 'app/slice';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AddFeedItem from './components/add-feed-item';
import FeedModal from './components/feed-modal';
import { toast } from 'app/components/ui/use-toast';
import FeedItem from './components/feed-item';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/slice/selectors';

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

  const user = useSelector(selectUser);

  const [showFeedModal, setShowFeedModal] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showCrudOptions, setShowCrudOptions] = useState<{
    feedId: string;
    bool: boolean;
  }>({
    feedId: '',
    bool: false,
  });

  const uploadImages = async (files: File[]) => {
    if (!files) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'save_qa'); // Replace with your upload preset
      formData.append('cloud_name', 'dakda5ni3'); // Replace with your Cloudinary cloud name

      return fetch('https://api.cloudinary.com/v1_1/dakda5ni3/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then(async response => {
          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }
          const data = await response.json();
          return data.secure_url;
        })
        .catch(err => {
          console.error('Error uploading image:', err);
          return null;
        });
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(url => url !== null) as string[];
      setUploadedUrls(prevUrls => [...(prevUrls || []), ...successfulUploads]);
      console.log('Uploaded URLs:', successfulUploads);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (createSuccess) {
      setShowFeedModal(false);
      toast({
        description: 'Created a Post Successfully !',
        variant: 'success',
      });
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createError || createErrorMessage) {
      toast({
        description: createErrorMessage as string,
        variant: 'destructive',
      });
    }
  }, [createError, createErrorMessage]);

  useEffect(() => {
    getFeeds({});
  }, [createSuccess]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Feed</title>
        <meta name="description" content="Feed" />
      </Helmet>
      <div className="min-h-screen flex justify-center">
        <div className="w-full md:w-4/6 px-2 md:px-0">
          <div className="mt-[80px] px-5">
            {/* adding feed items */}
            {user && (
              <AddFeedItem clickAddFeed={() => setShowFeedModal(true)} />
            )}
            {showFeedModal && (
              <FeedModal
                show={showFeedModal}
                setShow={setShowFeedModal}
                heading="Add Your Post"
                uploadImages={uploadImages}
                urls={uploadedUrls}
                handleRemoveImage={handleRemoveImage}
                uploading={uploading}
                create={createFeed}
                isLoading={createLoading}
              />
            )}
            {feedData?.feedItems?.map(item => {
              return (
                <FeedItem
                  _id={item._id}
                  title={item.title}
                  description={item.description}
                  user={item.owner}
                  createdAt={item.createdAt}
                  images={item.images}
                  showOptions={showCrudOptions}
                  setShowOptions={setShowCrudOptions}
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
