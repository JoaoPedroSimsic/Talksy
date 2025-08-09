import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getCookie from "../../helpers/getCookie";

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = getCookie("authToken");
				if (token) {
					const response = await axios.get("http://localhost:3000/auth/me", {
						withCredentials: true,
					});
					if (response.status === 200) {
						navigate("/dashboard");
					}
				}
			} catch {
				console.log("auth");
			}
		};

		checkAuth();
	}, [navigate]);

	return (
		<div className="flex items-center justify-between h-screen">
			<div className="w-1/2 h-screen flex items-center justify-center">
				<LoginForm />
			</div>
			<div className="w-1/2 h-screen flex items-center justify-center">
				<div>adadsa</div>
			</div>
		</div>
	);
};

export default Login;
