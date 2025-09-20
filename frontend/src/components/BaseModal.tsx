import React, { useState } from 'react';

interface BaseModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  description,
  onClose,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  children,
}): React.ReactNode => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      await onConfirm();
    } catch (err) {
      setError('Something went wrong, please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--bg-dark)] p-6 rounded-[var(--round)] shadow-lg">
      <h2 className="text-[var(--text)] text-lg font-bold mb-2">{title}</h2>
      {description && <p className="text-[var(--text-muted)] mb-4">{description}</p>}

      {children}

      {error && <p className="text-[var(--danger)] text-sm mb-4">{error}</p>}

      <div className="flex justify-end space-x-3 mt-4">
        <button
          className="px-4 py-2 rounded-[var(--round)] bg-gray-200 hover:bg-gray-300 transition"
          onClick={onClose}
          disabled={loading}
        >
          {cancelLabel}
        </button>
        <button
          className="px-4 py-2 rounded-[var(--round)] bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Saving...' : confirmLabel}
        </button>
      </div>
    </div>
  );
};

export default BaseModal;

