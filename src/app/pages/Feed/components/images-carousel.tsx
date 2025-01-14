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
      <div className="w-full p-4 flex gap-5">
        {images.slice(0, 2).map((image, idx) => (
          <div
            key={idx}
            className="cursor-pointer"
            onClick={() => openModal(idx)} // Open modal on click
          >
            <img
              src={image || ''}
              alt={`Image ${idx}`}
              className="h-[250px] w-[250px] rounded-[9px]"
            />
          </div>
        ))}
        {images.length > 2 && (
          <div
            className="relative cursor-pointer"
            onClick={() => openModal(2)} // Open modal for additional images
          >
            <img
              src={images[2] || ''}
              alt="More Images"
              className="h-[250px] w-[250px] rounded-[9px] opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-xl font-bold">
              +{images.length - 2} More
            </div>
          </div>
        )}
      </div>

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
                  alt=""
                  className="h-auto w-full max-h-screen"
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
