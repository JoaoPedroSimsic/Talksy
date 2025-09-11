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
		<div className='bg-[var(--bg)]'>
			<h2 className='text-[var(--text)] text-lg font-bold mb-4'>Change Email</h2>
			<p className='text-[var(--text-muted)] mb-4'>Enter your new email address below:</p>

			<input
				type='email'
				value={newEmail}
				onChange={(e) => setNewEmail(e.target.value)}
				className={`focus:outline-none w-full mb-4 p-2 border border-solid text-[var(--text)] rounded-[var(--round)] border-[var(--border)] bg-[var(--bg-light)]`}
				placeholder='newemail@example.com'
				required
			/>

			{error && <p className='text-[var(--danger)] text-sm mb-5'>{error}</p>}

			<div className='flex justify-center space-x-3'>
				<button
					className='px-15 py-2 mt-2 rounded-full bg-[var(--bg)] text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--bg-light)] transition disabled:opacity-50'
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
