import React, { useState } from 'react';
import BaseModal from '../../../components/BaseModal';
import validateEmail from '../../../utils/validateEmail';

interface ChangeEmailModalProps {
	onClose?: () => void;
	onConfirm?: (newEmail: string) => Promise<void>;
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({ onClose, onConfirm }) => {
	const [newEmail, setNewEmail] = useState('');
	const [error, setError] = useState('');

	const handleConfirm = async (): Promise<void> => {
		if (!newEmail) {
			setError('Enter a valid email');
			return;
		}

		const emailError = validateEmail(newEmail);

		if (emailError) {
			setError(emailError);
			return;
		}

		await onConfirm(newEmail);
	};

	return (
		<BaseModal
			title='Change Email'
			description='Enter your new email address below:'
			onClose={onClose}
			onConfirm={handleConfirm}
		>
			<input
				type='email'
				value={newEmail}
				onChange={(e) => setNewEmail(e.target.value)}
				className='focus:outline-none w-full mb-4 p-2 border border-solid text-[var(--text)] rounded-[var(--round)] border-[var(--border)] bg-[var(--bg-light)]'
				placeholder='newemail@example.com'
				required
			/>
      {error && <p className="text-[var(--danger)] text-sm mb-4">{error}</p>}
		</BaseModal>
	);
};

export default ChangeEmailModal;
