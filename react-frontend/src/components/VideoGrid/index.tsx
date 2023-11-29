import styles from "./VideoGrid.module.css";
import { useEffect, useState } from "react";
// import Modal from "./Modal/Modal";
import { Modal } from "../../components";
import { ApiService } from "../../services/ApiService";

interface Video {
  fields: {
    name: string;
    videoLink: string;
    thumbnail: {
      fields: {
        title: string;
        file: { url: string };
      };
    };
  };
}

interface Thumbnails {
  fields: { name: string; videos: Video[] };
}

export const VideoGrid = () => {
  const [thumbnails, setThumbnails] = useState<Video[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLink, setVideoLink] = useState<string>("");

  useEffect(() => {
    const getThumbnails = async () => {
      const thumbnailsEntry = await ApiService.getEntry("thumbnails");
      if (thumbnailsEntry) {
        setThumbnails(thumbnailsEntry.fields.videos);
      }
    };
    getThumbnails();
  }, []);

  const openModal = (videoLink: string) => {
    setVideoLink(videoLink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (thumbnails) {
    return (
      <div className={styles.videoGrid}>
        {thumbnails.map((thumbnail: Video, index: number) => (
          <img
            src={`https:${thumbnail.fields.thumbnail.fields.file.url}`}
            alt={`${thumbnail.fields.thumbnail.fields.title}`}
            className={styles.thumbnail}
            key={index}
            onClick={() => openModal(thumbnail.fields.videoLink)}
            loading="lazy"
          ></img>
        ))}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <iframe
            width="800"
            height="450"
            src={videoLink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            frameBorder={0}
            loading="lazy"
          ></iframe>
        </Modal>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default VideoGrid;
