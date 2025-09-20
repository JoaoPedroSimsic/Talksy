import React from 'react';
import { FiMessageSquare, FiHome, FiSettings } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa6';
import { usePage } from '../hooks/usePage';
import { useNavigate } from 'react-router-dom';
import type { Page } from '../types/Pages';

const fontSize = 23;

interface SidebarItem {
	page: Page;
	icon: React.ComponentType<{ size?: number; className?: string }>;
	size: number;
	path: string;
}

const items: SidebarItem[] = [
	{ page: 'home', icon: FiHome, size: fontSize, path: '/' },
	{ page: 'messages', icon: FiMessageSquare, size: fontSize, path: '/messages' },
	{ page: 'groups', icon: GrGroup, size: fontSize - 2, path: '/groups' },
	{ page: 'profile', icon: FaRegUser, size: fontSize - 4, path: '/profile' },
	{ page: 'settings', icon: FiSettings, size: fontSize - 2, path: '/settings' },
];

const Sidebar: React.FC = (): React.ReactNode => {
	const { currentPage, setCurrentPage } = usePage();
	const navigate = useNavigate();

	const handleClick = (page: Page, path: string): void => {
		setCurrentPage(page);
		navigate(path);
	};

	return (
		<aside className='flex justify-center items-center w-full h-full'>
			<div className='bg-[var(--bg)] flex justify-between items-center h-full w-full py-2 px-4'>
				{items.map((item) => {
					const Icon = item.icon;
					return (
						<button
							key={item.page}
							className={`flex h-10 w-10 justify-center items-center rounded-full ${currentPage === item.page ? 'bg-[var(--bg-dark)]' : ''
								}`}
							onClick={() => handleClick(item.page, item.path)}
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
