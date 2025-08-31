import React from 'react';

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<ModalProps> = ({ onClose, onConfirm }): React.ReactNode => {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
      <p className='text-gray-600 mb-6'>Are you sure you want to log out of your account?</p>

      {/* Buttons */}
      <div className='flex justify-end space-x-3'>
        <button
          className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition'
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className='px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
          onClick={onConfirm}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
