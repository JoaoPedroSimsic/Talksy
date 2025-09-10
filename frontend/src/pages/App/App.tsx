import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import HomePage from '../Home/Home';
import ProfilePage from '../Profile/Profile';
import SettingsPage from '../Settings/Settings';

const App: React.FC = (): React.ReactNode => {
	const [page, setPage] = useState('home');

	const renderPage = (): React.ReactNode => {
		switch (page) {
			case 'home':
				return <HomePage />;
			case 'settings':
				return <SettingsPage />;
			case 'profile':
				return <ProfilePage />;
			default:
				return <HomePage />;
		}
	};

	return (
		<div className='flex flex-col desktop:flex-row h-screen w-screen bg-[var(--bg)]'>
			{page !== 'settings' && (
				<header className='flex justify-center items-center desktop:hidden h-1/10 w-screen'>
					<Header page={page} />
				</header>
			)}

			<div className='flex justify-center items-center desktop:flex-col h-1/12 w-screen desktop:h-screen order-last desktop:order-first px-10'>
				<Sidebar setPage={setPage} currentPage={page} />
			</div>

			<main className='flex w-screen h-screen desktop:h-screen'>{renderPage()}</main>
		</div>
	);
};

export default App;
