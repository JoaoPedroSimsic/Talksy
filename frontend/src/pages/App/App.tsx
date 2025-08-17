import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../../components/Header';
import HomePage from '../Home/Home';
import SettingsPage from '../Settings/Settings';

const App: React.FC = (): React.ReactNode => {
	const [page, setPage] = useState('home');

	const renderPage = (): React.ReactNode => {
		switch (page) {
			case 'home':
				return <HomePage />;
			case 'settings':
				return <SettingsPage />;
			default:
				return <HomePage />;
		}
	};

	return (
		<div className='flex flex-col lg:flex-row h-screen w-screen bg-[radial-gradient(circle,rgba(86,86,237,0.5),white)]'>
			<header className='flex justify-center items-center lg:hidden h-1/10 w-screen'>
				<Header page={page}/>
			</header>

			<div className='flex justify-center items-center lg:flex-col h-1/5 w-full lg:h-screen order-last lg:order-first'>
				<Sidebar setPage={setPage} currentPage={page} />
			</div>

			<main className='flex w-screen h-screen lg:h-screen'>{renderPage()}</main>
		</div>
	);
};

export default App;
