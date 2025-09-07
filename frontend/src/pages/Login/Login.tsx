import React from 'react';

import FakeChat from '../../components/FakeChat';
import LoginForm from './components/LoginForm';
import Logo from '../../components/Logo';

const Login: React.FC = (): React.ReactNode => {
	return (
		<div className='flex w-full items-center justify-between h-screen'>
			<div className='bg-[var(--bg-dark)] desktop:bg-[var(--bg-dark)] relative w-full desktop:w-1/2 h-screen flex items-center justify-center overflow-hidden'>
				<div className='hidden z-1 desktop:flex absolute top-10 left-10 h-10 w-40'>
					<Logo />
				</div>
				<LoginForm />
			</div>
			<div className='relative h-full w-1/2 bg-[var(--bg)] hidden desktop:flex flex-col justify-end overflow-hidden shadow-lg'>
				<FakeChat />
			</div>
		</div>
	);
};

export default Login;
