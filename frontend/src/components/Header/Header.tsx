import React from 'react';
import { usePage } from '../../hooks/usePage';
import HomeHeader from './HomeHeader/HomeHeader';

const Header: React.FC = (): React.ReactNode => {
	const { currentPage } = usePage();

	let component: React.ReactNode;

	switch (currentPage) {
		case 'home':
			component = <HomeHeader />;
			break;
		default:
			component = <span>No page</span>;
	}

	return (
		<div className='bg-[var(--bg)] flex justify-between items-center h-full w-full py-2'>
			{component}
		</div>
	);
};

export default Header;
