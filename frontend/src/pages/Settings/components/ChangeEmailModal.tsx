import React, { useState } from 'react';
import BaseModal from '../../../components/BaseModal';
import validateEmail from '../../../utils/validateEmail';

interface ChangeEmailModalProps {
	onClose: () => void;
	onConfirm: (newEmail: string) => Promise<void>;
}

const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({ onClose, onConfirm }) => {
	const [newEmail, setNewEmail] = useState('');
	const [error, setError] = useState('');

	const handleConfirm = async (): Promise<void> => {
		if (!newEmail) throw new Error('Please enter a valid email');

		const emailError = validateEmail(newEmail);
		if (emailError) throw new Error(emailError);

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
		</BaseModal>
	);
};

export default ChangeEmailModal;
