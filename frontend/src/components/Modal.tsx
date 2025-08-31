import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }): React.ReactNode => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEsc);

    return (): void => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50' onClick={onClose}>
      <div className='absolute inset-0 bg-black opacity-30'></div>

      <div
        className='relative bg-white w-2/3 p-6 rounded-2xl shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full flex justify-end items-center'>
          <button
            className='h-4 flex justify-center items-center text-gray-500 hover:text-gray-800 text-xl font-bold'
            onClick={onClose}
            aria-label='Close modal'
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
