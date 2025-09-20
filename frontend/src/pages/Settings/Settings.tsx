import React, { useState } from 'react';

import OptionCard from './components/OptionCard';
import BottomSheet from '../../components/BottomSheet';
import ChangeEmailPage from './pages/ChangeEmailPage';
import ChangePasswordModal from './components/ChangePasswordModal';
import LogoutModal from './components/LogoutModal';

import handleChangeEmail from './utils/handleChangeEmail';
import handleChangePassword from './utils/handleChangePassword';
import handleLogout from './utils/handleLogout';

import { HiOutlineMail } from 'react-icons/hi';
import { LuKeyRound } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { MdOutlineNoAccounts } from 'react-icons/md';

const Settings: React.FC = (): React.ReactNode => {
	const [changeEmail, showChangeEmail] = useState(false);
	const [changePassword, showChangePassword] = useState(false);
	const [logoutModal, showLogoutModal] = useState(false);
	const [deleteModal, showDeleteModal] = useState(false);

	const settingsOptions = [
		{
			icon: HiOutlineMail,
			title: 'Change Email',
			description: 'Change your email',
			onClick: (): void => showChangeEmail(true),
		},
		{
			icon: LuKeyRound,
			title: 'Change Password',
			description: 'Update your password',
			onClick: (): void => showChangePassword(true),
		},
		{
			icon: MdLogout,
			title: 'Logout',
			description: 'Log out of your current account',
			onClick: (): void => showLogoutModal(true),
		},
		{
			icon: MdOutlineNoAccounts,
			title: 'Delete Account',
			description: 'Delete your current account forever',
			onClick: (): void => showDeleteModal(true),
		},
	];

	return (
		<div className='flex flex-col items-center h-full w-full'>
			{settingsOptions.map((opt, index) => (
				<OptionCard
					key={index}
					icon={opt.icon}
					title={opt.title}
					description={opt.description}
					onClick={opt.onClick}
				/>
			))}

			{changeEmail && (
				<ChangeEmailPage
					onClose={() => showChangeEmail(false)}
					onConfirm={handleChangeEmail}
				/>
			)}

			<BottomSheet isOpen={changePassword} onClose={(): void => showChangePassword(false)}>
				<ChangePasswordModal
					onClose={() => showChangePassword(false)}
					onConfirm={handleChangePassword}
				/>
			</BottomSheet>

			<BottomSheet isOpen={logoutModal} onClose={(): void => showLogoutModal(false)}>
				<LogoutModal onClose={() => showLogoutModal(false)} onConfirm={handleLogout} />
			</BottomSheet>

		</div>
	);
};

export default Settings;
