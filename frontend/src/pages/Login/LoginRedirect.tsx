import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Login from "./Login";

const LoginRedirect: React.FC = () => {
	const { isAuth, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuth) {
		return <Navigate to="/" replace />;
	}

	return <Login />;
};

export default LoginRedirect;
