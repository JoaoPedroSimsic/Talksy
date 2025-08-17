import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';

interface HeaderProps {
	page: string;
}

const pageTitles: Record<string, string> = {
	home: 'Home',
	profile: 'Your Profile',
	messages: 'Messages',
	groups: 'Groups',
	settings: 'Settings',
};

const Header: React.FC<HeaderProps> = ({ page }): React.ReactNode => {
	return (
		<div className='flex justify-between items-center h-7/10 w-9/10 bg-bright py-2 px-5 rounded-2xl'>
			<button>
				<FaArrowLeft size={20} className='text-dark' />
			</button>
			<span>{pageTitles[page] ?? page}</span>
			<button>
				<BsThreeDots size={20} className='text-dark' />
			</button>
		</div>
	);
};

export default Header;
