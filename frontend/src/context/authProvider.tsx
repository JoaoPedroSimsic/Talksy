import React from 'react';
import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './useAuth';

import axios from 'axios';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const authCheckEndpoint = `${backendUrl}/auth/check`;

	const checkAuthStatus = async (): Promise<void> => {
		try {
			await axios.get(authCheckEndpoint, {
				withCredentials: true,
			});

			console.log('auth checked successfully');
			setIsAuth(true);
		} catch {
			setIsAuth(false);
		} finally {
			setIsLoading(false);
		}
	};

	const login = (): void => {
		setIsAuth(true);
	};

	useEffect(() => {
		checkAuthStatus();
	});

	const value = { isAuth, isLoading, login };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
