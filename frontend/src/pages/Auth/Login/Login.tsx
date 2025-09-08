import React from 'react';

import AuthLayout from '../AuthLayout';
import LoginForm from './components/LoginForm';

const Login: React.FC = (): React.ReactNode => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};

export default Login;
