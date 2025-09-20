import { createContext } from 'react';

export type AuthContextType = {
	isAuth: boolean;

	isLoading: boolean;

	login: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
