import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes: React.FC = (): React.ReactNode => {
	const { isAuth, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuth) {
		return <Outlet />;
	}

	return <Navigate to='/login' replace />;
};

export default ProtectedRoutes;
