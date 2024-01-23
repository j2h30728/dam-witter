import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) => {
  const modalRoot = document.querySelector('#modal-root')!;
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
        className="px-6 bg-white rounded-lg shadow-lg"
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
