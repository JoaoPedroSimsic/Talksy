import React from 'react';

import FakeChat from '../../components/FakeChat';
import RegisterForm from './components/RegisterForm';
import Logo from '../../components/Logo';

const Register: React.FC = (): React.ReactNode => {
  return (
    <div className='flex w-full items-center justify-between h-screen'>
      <div className='bg-[var(--bg-dark)] desktop:bg-[var(--bg-dark)] relative w-full desktop:w-1/2 h-screen flex items-center justify-center overflow-hidden'>
        <div className='hidden desktop:flex z-1 absolute top-7 left-7 h-10 w-40'>
					<Logo />
        </div>
        <RegisterForm />
      </div>
			<div className='relative hidden desktop:flex h-full w-1/2 bg-[var(--bg)] flex-col justify-end overflow-hidden shadow-lg'>
				<FakeChat />
			</div>
    </div>
  );
};

export default Register;
