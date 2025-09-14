import React, { useState } from 'react';
import BaseModal from '../../../components/BaseModal';
import PasswordInput from '../../../components/PasswordInput';
import validatePassword from '../../../utils/validatePassword';
import handleError from '../../../utils/handleError';

interface ChangePasswordModalProps {
	onClose: () => void;
	onConfirm: (oldPassword: string, newPassword: string) => Promise<void>;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose, onConfirm }) => {
	const [oldPasswd, setOldPasswd] = useState('');
	const [newPasswd, setNewPasswd] = useState('');

	const handleConfirm = async (): Promise<void> => {
		if (!oldPasswd || !newPasswd) throw new Error('Old and new password required');

		const passwdError = validatePassword(newPasswd);
		if (passwdError) throw new Error(passwdError);

		await onConfirm(oldPasswd, newPasswd);
	};

	return (
		<BaseModal
			title='Change Password'
			description='Enter your current and new password below:'
			onClose={onClose}
			onConfirm={handleConfirm}
		>
			<PasswordInput
				label='Current password:'
				value={oldPasswd}
				onChange={(e) => setOldPasswd(e.target.value)}
				placeholder='Current password'
			/>
			<PasswordInput
				label='New password:'
				value={newPasswd}
				onChange={(e) => setNewPasswd(e.target.value)}
				placeholder='New password'
			/>
		</BaseModal>
	);
};

export default ChangePasswordModal;
