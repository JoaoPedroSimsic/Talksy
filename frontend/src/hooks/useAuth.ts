import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/authContext';
import type { AuthContextType } from '../contexts/Auth/authContext';

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
