import React, { useState } from 'react';

import validateEmail from '../../../utils/validateEmail';

interface ModalProps {
  onClose: () => void;
  onConfirm: (newEmail: string) => Promise<void>;
}

const ChangeEmailModal: React.FC<ModalProps> = ({ onClose, onConfirm }): React.ReactNode => {
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async (): Promise<void> => {
    if (!newEmail) {
      setError('Please enter a valid email');
      return;
    }

    const emailError = validateEmail(newEmail);
    if (emailError) {
      setError(emailError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onConfirm(newEmail);
      onClose();
    } catch {
      setError('Failed to update email. Try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white'>
      <h2 className='text-lg font-semibold mb-4'>Change Email</h2>
      <p className='text-gray-600 mb-4'>Enter your new email address below:</p>

      <input
        type='email'
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className='w-full border rounded-lg px-3 py-2 mb-3'
        placeholder='newemail@example.com'
        required
      />

      {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

      <div className='flex justify-end space-x-3'>
        <button
          className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition'
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50'
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};

export default ChangeEmailModal;
