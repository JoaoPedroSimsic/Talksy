import {
	useState,
	useEffect,
	ReactNode,
} from "react";
import { AuthContext } from "./useAuth";

import axios from "axios";

export interface AuthContextType {
	isAuth: boolean;
	isLoading: boolean;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuth, setIsAuth] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const authCheckEndpoint = "http://localhost:3000/auth/check";

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await axios.get(authCheckEndpoint, {
					withCredentials: true,
				});

				if (response.status === 200) {
					setIsAuth(true);
				}
			} catch {
				setIsAuth(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const value = { isAuth, isLoading };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

