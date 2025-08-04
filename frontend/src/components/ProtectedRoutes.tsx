import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import getCookie from '../helpers/getCookie';

const ProtectedRoutes: React.FC = () => {
	const token = getCookie('authToken');
	
	if (!token) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

export default ProtectedRoutes;
