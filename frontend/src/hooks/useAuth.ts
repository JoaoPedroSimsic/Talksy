import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import type { AuthContextType } from '../contexts/authContext';

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
