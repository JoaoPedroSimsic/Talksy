import React, { ReactNode } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header: React.FC = (): ReactNode => {
	return (
		<div className="flex justify-between items-center px-10 py-5 w-full">
			<span className="text-[var(--text)] text-xl font-bold">Talsky</span>
			<FaMagnifyingGlass size={20} className="text-[var(--text)]"/>
		</div>
	)
}

export default Header;
