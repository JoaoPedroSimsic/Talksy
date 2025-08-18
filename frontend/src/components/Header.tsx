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
		<div className='flex justify-between items-center h-7/10 w-9/10 py-2'>
			<button className='bg-bright flex justify-center items-center h-10 w-10 rounded-full'>
				<FaArrowLeft size={20} className='text-dark' />
			</button>
			<span className='bg-bright flex justify-center items-center h-10 w-auto px-5 rounded-full text-sm'>{pageTitles[page] ?? page}</span>
			<button className='bg-bright flex justify-center items-center h-10 w-10 rounded-full'>
				<BsThreeDots size={20} className='text-dark' />
			</button>
		</div>
	);
};

export default Header;
