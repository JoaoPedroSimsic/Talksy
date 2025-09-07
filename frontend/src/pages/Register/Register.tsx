import React from 'react';

import FakeChat from '../../components/FakeChat';
import RegisterForm from './components/RegisterForm';
import Logo from '../../components/Logo';

const Register: React.FC = (): React.ReactNode => {
  return (
    <div className='flex w-full items-center justify-between h-screen'>
      <div className='bg-[var(--primary)] lg:bg-[var(--bg-dark)] relative w-full lg:w-1/2 h-screen flex items-center justify-center overflow-hidden'>
        <img
          src='/assets/background.svg'
          className='lg:hidden absolute scale-150'
          alt='background'
        />
        <div className='hidden lg:flex z-1 absolute top-10 left-10 h-10 w-40'>
					<Logo />
          <span className='flex items-center justify-center ml-1 text-[var(--text)] text-xl font-bold'>
            Talksy
          </span>
        </div>
        <RegisterForm />
      </div>
			<div className='relative h-full w-1/2 bg-[var(--bg)] flex flex-col justify-end overflow-hidden shadow-lg'>
				<FakeChat />
			</div>
    </div>
  );
};

export default Register;
