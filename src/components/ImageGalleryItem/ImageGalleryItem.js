import {useState} from "react";
import propTypes from "prop-types";
import Modal from "../Modal/Modal";
import style from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem ({webformatURL, tags, largeImageURL}) {
  const [showModal, setShowModal] = useState(false);

   const toggleModal = () => {
      setShowModal((showModal) => !showModal);
  };

    return (
      <li className={style.ImageGalleryItem}>
        <img
          className={style.ImageGalleryItem_image}
          onClick={toggleModal}
          src={webformatURL}
          alt={tags}
        />

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={toggleModal}
          />
        )}
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  toggleModal: propTypes.func,  
  largeImageURL: propTypes.string.isRequired,
  webformatURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
};