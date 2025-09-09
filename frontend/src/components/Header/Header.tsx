import React from 'react';
import HomeHeader from './HomeHeader/HomeHeader';

interface HeaderProps {
	page: string;
}

const Header: React.FC<HeaderProps> = ({ page }): React.ReactNode => {
	let component;

	switch (page) {
		case 'home':
			component = <HomeHeader />;
			break;
		default:
			component = <span>no page</span>;
	}

	return (
		<div className='bg-[var(--bg)] flex justify-between items-center h-full w-full py-2'>
			{component}
		</div>
	);
};

export default Header;
