import React, { Dispatch, SetStateAction } from 'react';
import { FiMessageSquare, FiHome, FiSettings } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { FaRegUser } from 'react-icons/fa6';

interface SidebarProps {
	setPage: Dispatch<SetStateAction<string>>;
	currentPage: string;
}

const fontSize = 23;
// const buttonClass = `flex flex-1 justify-center item-center`

const Sidebar: React.FC<SidebarProps> = ({ setPage, currentPage }): React.ReactNode => {
	return (
		<aside className={`flex justify-center items-center w-full h-full`}>
			<div className='bg-[var(--bg)] flex justify-between items-center h-full w-full py-2 px-4'>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage('home')}
				>
					<FiHome size={fontSize} className='text-[var(--text)]' />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage('messages')}
				>
					<FiMessageSquare size={fontSize} className='text-[var(--text)]' />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage('groups')}
				>
					<GrGroup size={fontSize - 2} className='text-[var(--text)]' />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage('profile')}
				>
					<FaRegUser size={fontSize - 4} className='text-[var(--text)]' />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage('settings')}
				>
					<FiSettings size={fontSize - 2} className="text-[var(--text)]" />
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
