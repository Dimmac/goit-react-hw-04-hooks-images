import { useEffect } from 'react';
import {Overlay, Modal} from './Modal.styled'

export default function ModalWindow({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
    return (
      <Overlay onClick={handleBackdropClick}>
        <Modal>{this.props.children}</Modal>
      </Overlay>
    );
  
}