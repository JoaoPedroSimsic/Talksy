import React, { useState } from 'react';

import PasswordInput from '../../../components/PasswordInput';
import validatePassword from '../../../utils/validatePassword';
import handleError from '../../../utils/handleError';

interface ModalProps {
	onClose: () => void;
	onConfirm: (oldPassword: string, newPassword: string) => Promise<void>;
}

const ChangePasswordModal: React.FC<ModalProps> = ({ onClose, onConfirm }): React.ReactNode => {
	const [oldPasswd, setOldPasswd] = useState('');
	const [newPasswd, setNewPasswd] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleConfirm = async (): Promise<void> => {
		if (!oldPasswd || !newPasswd) {
			setError('Old and new password required');
			return;
		}

		const passwdError = validatePassword(newPasswd);

		if (passwdError) {
			setError(passwdError);
			return;
		}

		setLoading(true);
		setError('');

		try {
			await onConfirm(oldPasswd, newPasswd);
			onClose();
		} catch (err) {
			handleError(err, setError);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-white'>
			<h2 className='text-lg font-semibold mb-4'>Change Email</h2>
			<p className='text-gray-600 mb-4'>Enter your new email address below:</p>

			<PasswordInput
				label="Current password:"
				value={oldPasswd}
				onChange={(e) => setOldPasswd(e.target.value)}
				placeholder='Current password'
				disabled={loading}
				error={error}
			/>

			<PasswordInput
				label="New password:"
				value={newPasswd}
				onChange={(e) => setNewPasswd(e.target.value)}
				placeholder='New password'
				disabled={loading}
				error={error}
			/>

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

export default ChangePasswordModal;
