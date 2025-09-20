import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { PageProvider } from './contexts/Page/PageProvider';
import ProtectedRoutes from './components/ProtectedRoutes';

import LoginRedirect from './pages/Auth/Login/LoginRedirect';
import RegisterPage from './pages/Auth/Register/Register';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar';

import HomePage from './pages/Home/Home';
import ProfilePage from './pages/Profile/Profile';
import SettingsPage from './pages/Settings/Settings';

import './style.css';

const AppContent: React.FC = (): React.ReactNode => {
	const location = useLocation();
	const hideLayout = ['/login', '/register'].includes(location.pathname);

	return (
		<div className='flex flex-col desktop:flex-row h-screen w-screen bg-[var(--bg)]'>
			{!hideLayout && (
				<header className='flex justify-center items-center desktop:hidden w-screen h-1/10'>
					<Header />
				</header>
			)}

			{!hideLayout && (
				<div className='flex justify-center items-center desktop:flex-col h-15 w-screen desktop:h-screen order-last desktop:order-first px-10'>
					<Sidebar />
				</div>
			)}

			<main className='flex w-screen h-screen desktop:h-screen'>
				<Routes>
					<Route path='/login' element={<LoginRedirect />} />
					<Route path='/register' element={<RegisterPage />} />

					<Route element={<ProtectedRoutes />}>
						<Route path='/' element={<HomePage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/settings' element={<SettingsPage />} />
					</Route>

					<Route path='*' element={<div>404 Page not found</div>} />
				</Routes>
			</main>
		</div>
	);
};

const App: React.FC = (): React.ReactNode => {
	return (
		<PageProvider>
			<AppContent />
		</PageProvider>
	);
};

export default App;
