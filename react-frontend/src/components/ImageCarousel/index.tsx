import { useEffect, useState } from "react";

import styles from "./ImageCarousel.module.css";
import { ApiService } from "../../services/ApiService";

interface Image {
  fields: { file: { url: string } };
}
interface Entry {
  fields: { name: string; images: [] };
}

export const ImageCarousel = () => {
  const [images, setImages] = useState<Image[]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      const instrumentsEntry: Entry = await ApiService.getEntry("instruments");
      if (instrumentsEntry) {
        setImages(instrumentsEntry.fields.images);
      }
    };
    getImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 && images ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      images && prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  if (images) {
    return (
      <div className={styles.imageCarouselContainer}>
        <button
          className={`${styles.arrowButton} ${styles.left}`}
          onClick={goToPrevSlide}
        >
          {/* TODO: Replace */}
          &#9665;
        </button>

        {images && (
          <img
            src={`https:${images[currentIndex].fields.file.url}`}
            alt={`Slide ${currentIndex + 1}`}
            className={styles.carouselItem}
            loading="lazy"
          ></img>
        )}
        <button
          className={`${styles.arrowButton} ${styles.right}`}
          onClick={goToNextSlide}
        >
          &#9655;
        </button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
