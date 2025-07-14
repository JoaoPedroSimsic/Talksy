import { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.get('http://localhost:3000/auth/me', {
					withCredentials: true,
				});
				if (response.status === 200) {
					navigate('/dashboard');
				}
			} catch {
				console.log('auth');
			}
		};

		checkAuth();
		}, [navigate]);

	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Login;
