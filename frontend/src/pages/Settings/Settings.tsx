import React from 'react';
import axios from 'axios';

const Settings: React.FC = (): React.ReactNode => {
	const handleLogout = async (): Promise<void> => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		const endpoint = `${backendUrl}/auth/logout`;

		try {
			await axios.get(endpoint, { withCredentials: true });
			window.location.reload();
		} catch (err) {
			console.error('Logout failed', err);
		}
	};

	return (
		<div className='lg:flex'>
			<button
				onClick={handleLogout}
				className='absolute top-5 left-5 cursor-pointer bg-red-500 text-white px-4 py-2 rounded'
			>
				Logout
			</button>
			<div className='flex-1 bg-red-500'>nav</div>
			<div className='flex-2 bg-green-500'>chats</div>
			<div className='flex-7 bg-blue-500'>messages</div>
		</div>
	);
};

export default Settings;
