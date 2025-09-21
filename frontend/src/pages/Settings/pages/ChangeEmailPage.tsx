import React, { useState } from 'react';

import AuxHeader from '@/components/Header/AuxHeader';
import PasswordInput from '@/components/Inputs/PasswordInput';

import validateEmail from '../../../utils/validateEmail';

const ChangeEmailPage: React.FC<ChangeEmailModalProps> = ({ onClose, onConfirm }) => {
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
		<div className='h-full w-full'>
			<AuxHeader pageName='Change Email' />
			<div className='w-full p-10'>
				<form>
					<PasswordInput label='Senha' />
				</form>
			</div>
		</div>
	);
};

export default ChangeEmailPage;
