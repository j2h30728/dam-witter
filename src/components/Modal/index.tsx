import useLockBodyScroll from '@/libs/client/useLockBodyScroll';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const modalRoot = document.querySelector('#modal-root');
  useLockBodyScroll();

  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-20"
      onClick={onClose}
    >
      <div className="z-20 w-4/5 max-w-screen-sm truncate" onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
