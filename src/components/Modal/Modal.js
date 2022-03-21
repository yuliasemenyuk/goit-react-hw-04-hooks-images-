import { useEffect } from "react";
import { createPortal } from "react-dom";
import propTypes from "prop-types";
import style from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal ({onClose, largeImageURL, tags}) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }
  );

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <div className={style.overlay} onClick={handleOverlayClick}>
        <div className={style.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }

Modal.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired
};