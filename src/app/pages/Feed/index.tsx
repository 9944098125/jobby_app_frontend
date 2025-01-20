import { useGlobalSlice } from 'app/slice';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AddFeedItem from './components/add-feed-item';
import { toast } from 'app/components/ui/use-toast';
import FeedItem from './components/feed-item';
import { useDispatch, useSelector } from 'react-redux';
import { selectFeedEdit, selectUser } from 'app/slice/selectors';
import { Sheet, SheetTrigger } from 'app/components/ui/sheet';
import FeedSheet from './components/feed-sheet';
import { useForm } from 'react-hook-form';

export function Feed() {
  const {
    useCreateFeedMutation,
    useLazyGetFeedsQuery,
    useUpdateFeedMutation,
    useDeleteFeedMutation,
    useRewriteFeedDescMutation,
  } = useGlobalSlice();

  const [
    rewriteFeedDesc,
    {
      isLoading: rewriteLoading,
      data: rewriteData,
      isSuccess: rewriteSuccess,
      isError: rewriteError,
      error: rewriteErrorMessage,
    },
  ] = useRewriteFeedDescMutation();

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

  const dispatch = useDispatch();
  const { actions } = useGlobalSlice();

  const user = useSelector(selectUser);
  const editFeed = useSelector(selectFeedEdit);
  const form = useForm();

  const [feedDescription, setFeedDescription] = useState({
    rawData: '',
    formattedData: '',
  });
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
      setFeedDescription({
        rawData: '',
        formattedData: '',
      });
      form.reset();
      setUploadedUrls([]);
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
    if (updateSuccess) {
      setShowFeedModal(false);
      toast({
        description: 'Updated the Feed Item Successfully',
        variant: 'success',
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateError || updateErrorMessage) {
      toast({
        description: updateErrorMessage?.[0],
        variant: 'destructive',
      });
    }
  }, [updateError, updateErrorMessage]);

  useEffect(() => {
    getFeeds({});
  }, [createSuccess, updateSuccess, deleteSuccess]);

  useEffect(() => {
    if (rewriteSuccess || rewriteData) {
      setFeedDescription({
        rawData: rewriteData?.description.replace(/<[^>]*>?/gm, ''),
        formattedData: rewriteData?.description,
      });
    }
  }, [rewriteSuccess, rewriteData]);

  useEffect(() => {
    if (editFeed) {
      console.log('editFeed', editFeed);
      setShowFeedModal(true);
    }
  }, [editFeed]);

  useEffect(() => {
    if (!showFeedModal) {
      dispatch(actions.setEditFeed({ data: null }));
    }
  }, [showFeedModal]);

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        description: 'Delete the Feed Successfully',
        variant: 'success',
      });
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteError || deleteErrorMessage) {
      toast({
        description: deleteErrorMessage as string,
        variant: 'destructive',
      });
    }
  }, [deleteError, deleteErrorMessage]);

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
            <div>
              <Sheet open={showFeedModal} onOpenChange={setShowFeedModal}>
                {user && (
                  <SheetTrigger asChild>
                    <AddFeedItem clickAddFeed={() => setShowFeedModal(true)} />
                  </SheetTrigger>
                )}
                {showFeedModal && (
                  <FeedSheet
                    show={showFeedModal}
                    setShow={setShowFeedModal}
                    heading="Add Your Post"
                    uploadImages={uploadImages}
                    urls={uploadedUrls}
                    handleRemoveImage={handleRemoveImage}
                    uploading={uploading}
                    create={createFeed}
                    isLoading={createLoading}
                    description={feedDescription}
                    setDescription={setFeedDescription}
                    rewrite={rewriteFeedDesc}
                    rewriteLoading={rewriteLoading}
                    updateFeed={updateFeed}
                    setUrls={setUploadedUrls}
                    updateLoading={updateLoading}
                  />
                )}
              </Sheet>
            </div>
            {feedData?.feedItems?.map(item => {
              return (
                <FeedItem
                  _id={item._id}
                  title={item.title}
                  description={item.description}
                  user={item.owner}
                  createdAt={item.createdAt}
                  images={item.images}
                  reference={item.reference}
                  showOptions={showCrudOptions}
                  setShowOptions={setShowCrudOptions}
                  feedItem={item}
                  deleteFeed={deleteFeed}
                  deleteLoading={deleteLoading}
                />
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
