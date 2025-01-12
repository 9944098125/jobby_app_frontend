import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const ImagesCarousel = ({ images }: { images: string[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Main Carousel */}
      <Carousel
        interval={4000}
        transitionTime={1000}
        stopOnHover
        infiniteLoop
        swipeable
        autoPlay
        axis="horizontal"
        showThumbs={false}
        showStatus={false}
      >
        {images?.map((image, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => openModal(idx)} // Open modal on click
          >
            <img
              src={image || ''}
              alt={`Carousel ${idx}`}
              className="h-full w-full max-h-[650px]"
            />
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        center
        styles={{
          modal: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
          closeButton: { display: 'none' },
        }}
        showCloseIcon={false}
      >
        <div className="relative">
          {/* Carousel inside Modal */}
          <Carousel
            selectedItem={currentImageIndex} // Start at clicked image
            infiniteLoop
            showThumbs={false}
            showStatus={false}
          >
            {images?.map((image, idx) => (
              <div key={idx}>
                <img
                  src={image || ''}
                  alt={`Modal Carousel ${idx}`}
                  className="h-auto w-full max-h-[650px]"
                />
              </div>
            ))}
          </Carousel>

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full z-50"
            onClick={closeModal}
          >
            X
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ImagesCarousel;
