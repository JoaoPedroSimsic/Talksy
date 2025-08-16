import React from 'react';

import LoginRedirect from './pages/Login/LoginRedirect';
import RegisterPage from './pages/Register/Register';
import AppPage from './pages/App/App';

import { Route, Routes } from 'react-router-dom';

import ProtectedRoutes from './components/ProtectedRoutes';

import './style.css';

const App: React.FC = (): React.ReactNode => {
	return (
		<Routes>
			<Route path='/login' element={<LoginRedirect />} />
			<Route path='/register' element={<RegisterPage />} />

			<Route element={<ProtectedRoutes />}>
				<Route path='/' element={<AppPage />} />
			</Route>

			<Route path='*' element={<div>404 Page not found</div>} />
		</Routes>
	);
};

export default App;
