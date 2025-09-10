import React, { Dispatch, SetStateAction } from 'react';
import { FiMessageSquare, FiHome, FiSettings } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa6';

interface SidebarProps {
	setPage: Dispatch<SetStateAction<string>>;
	currentPage: string;
}

const fontSize = 23;

const items = [
	{ page: 'home', icon: FiHome, size: fontSize },
	{ page: 'messages', icon: FiMessageSquare, size: fontSize },
	{ page: 'groups', icon: GrGroup, size: fontSize - 2 },
	{ page: 'profile', icon: FaRegUser, size: fontSize - 4 },
	{ page: 'settings', icon: FiSettings, size: fontSize - 2 },
];

const Sidebar: React.FC<SidebarProps> = ({ setPage, currentPage }): React.ReactNode => {
	return (
		<aside className={`flex justify-center items-center w-full h-full`}>
			<div className='bg-[var(--bg)] flex justify-between items-center h-full w-full py-2 px-4'>
				{items.map((item) => {
					const Icon = item.icon;
					return (
						<button
							key={item.page} 
							className={`flex h-10 w-10 justify-center items-center rounded-full ${currentPage === item.page ? 'bg-[var(--bg-dark)]' : ''}`}
							onClick={() => setPage(item.page)}
						>
							<Icon size={item.size} className='text-[var(--text)]' />
						</button>
					);
				})}
			</div>
		</aside>
	);
};

export default Sidebar;
