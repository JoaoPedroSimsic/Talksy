import { createContext, useContext } from "react";

export interface AuthContextType {
	isAuth: boolean;
	isLoading: boolean;
	login: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
