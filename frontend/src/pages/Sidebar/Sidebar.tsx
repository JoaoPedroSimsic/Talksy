import React, { Dispatch, SetStateAction } from 'react';

interface SidebarProps {
	setPage: Dispatch<SetStateAction<string>>;
}

const Sidebar: React.FC = ({ setPage }: SidebarProps): React.ReactNode => {
	return (
		<aside></aside>
	)
};

export default Sidebar;
