import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import DashboardPage from '../Dashboard/Dashboard';

const App: React.FC = (): React.ReactNode => {
	const [page, setPage] = useState('dashboard');

	const renderPage = (): React.ReactNode => {
		switch (page) {
			case "dashboard":
				return <DashboardPage />;
			default:
				return <DashboardPage />;
		}
	}

	return (
		<div className='flex h-screen'>
			<Sidebar setPage={setPage} />

			<main className='flex'>
				{renderPage()}
			</main>
		</div>
	);
};

export default App;
