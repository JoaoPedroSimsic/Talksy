import { useAuth } from "../context/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
	const { isAuth, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuth) {
		return <Outlet />;
	}

	return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
