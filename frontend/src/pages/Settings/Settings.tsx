import React, { useState } from 'react';

import OptionCard from './components/OptionCard';
import LogoutModal from './components/LogoutModal';

import handleLogout from './utils/Logout';

const Settings: React.FC = (): React.ReactNode => {
	const [logoutModal, showLogoutModal] = useState(false);

	const settingsOptions = [
		{ title: 'Change Email', description: 'Change your email' },
		{ title: 'Change Password', description: 'Update your password' },
		{
			title: 'Logout',
			description: 'Log out of your current account',
			onClick: (): void => showLogoutModal(true),
		},
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

			{logoutModal && <LogoutModal />}	

		</div>
	);
};

export default Settings;
