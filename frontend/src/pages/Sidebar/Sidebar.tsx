import React, { useState, Dispatch, SetStateAction } from "react";
import { FiMessageSquare, FiHome, FiSettings } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";

interface SidebarProps {
	setPage: Dispatch<SetStateAction<string>>;
	currentPage: string;
}

const fontSize = 28;
// const buttonClass = `flex flex-1 justify-center item-center`

const Sidebar: React.FC<SidebarProps> = ({ setPage, currentPage }): React.ReactNode => {

	const highlightIcon = (page: string): string => 
		page === currentPage ? "text-primary" : "text-dark";

	return (
		<aside className={`flex justify-center items-center w-full h-full`}>
			<div className="bg-bright flex justify-between items-center h-1/3 w-4/6 py-2 px-4 rounded-2xl">
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage("home")}
				>
					<FiHome size={fontSize} className={`${highlightIcon("home")}`} />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage("messages")}
				>
					<FiMessageSquare size={fontSize} className={`${highlightIcon("messages")}`} />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage("groups")}
				>
					<GrGroup size={fontSize - 2} className={`${highlightIcon("groups")}`} />
				</button>
				<button
					className={`flex flex-1 justify-center item-center`}
					onClick={() => setPage("settings")}
				>
					<FiSettings size={fontSize} className={`${highlightIcon("settings")}`} />
				</button>
			</div>
		</aside >
	)
};

export default Sidebar;
