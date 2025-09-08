import React from 'react';

import AuthLayout from '../AuthLayout';
import RegisterForm from './components/RegisterForm';

const Register: React.FC = (): React.ReactNode => {
  return (
    <AuthLayout>
			<RegisterForm />
		</AuthLayout>
  );
};

export default Register;
