import React, { useState } from 'react';

import OptionCard from './components/OptionCard';
import Modal from '../../components/Modal';
import ChangeEmailModal from './components/ChangeEmailModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import LogoutModal from './components/LogoutModal';

import handleChangeEmail from './utils/handleChangeEmail';
import handleChangePassword from './utils/handleChangePassword';
import handleLogout from './utils/handleLogout';

const Settings: React.FC = (): React.ReactNode => {
	const [changeEmail, showChangeEmail] = useState(false);
	const [changePassword, showChangePassword] = useState(false);
	const [logoutModal, showLogoutModal] = useState(false);
	const [deleteModal, showDeleteModal] = useState(false);

	const settingsOptions = [
		{
			title: 'Change Email',
			description: 'Change your email',
			onClick: (): void => showChangeEmail(true),
		},
		{
			title: 'Change Password',
			description: 'Update your password',
			onClick: (): void => showChangePassword(true),
		},
		{
			title: 'Logout',
			description: 'Log out of your current account',
			onClick: (): void => showLogoutModal(true),
		},
		{
			title: 'Delete Account',
			description: 'Delete your current account forever',
			onClick: (): void => showDeleteModal(true), 
		}
	];

	return (
		<div className='flex flex-col items-center h-full w-full'>
			{settingsOptions.map((opt, index) => (
				<OptionCard
					key={index}
					title={opt.title}
					description={opt.description}
					onClick={opt.onClick}
				/>
			))}

			<Modal isOpen={changeEmail} onClose={(): void => showChangeEmail(false)}>
				<ChangeEmailModal onClose={() => showChangeEmail(false)} onConfirm={handleChangeEmail} />
			</Modal>

			<Modal isOpen={changePassword} onClose={(): void => showChangePassword(false)}>
				<ChangePasswordModal
					onClose={() => showChangePassword(false)}
					onConfirm={handleChangePassword}
				/>
			</Modal>

			<Modal isOpen={logoutModal} onClose={(): void => showLogoutModal(false)}>
				<LogoutModal onClose={() => showLogoutModal(false)} onConfirm={handleLogout} />
			</Modal>
		</div>
	);
};

export default Settings;
