import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ togleModal, largeImage }) {
  useEffect(() => {
    const handleKeyClose = e => {
      if (e.keyCode === 27) {
        togleModal();
      }
    };

    document.addEventListener('keydown', handleKeyClose);

    return () => {
      document.removeEventListener('keydown', handleKeyClose);
    };
  }, [togleModal]);

  const handleClickOverlayClose = e => {
    if (e.target === e.currentTarget) {
      togleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClickOverlayClose}>
      <div className="Modal">
        <img src={largeImage} alt="large_image" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
};
