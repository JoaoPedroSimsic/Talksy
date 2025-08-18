import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface OptionCardProps {
	title: string;
	description?: string;
	onClick?: () => void;
	buttonText?: string;
	important?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ title, description, onClick }) => {
	return (
		<div className='flex justify-center items-center bg-bright w-9/10 m-1 py-3 pl-5 pr-3 rounded-2xl'>
			<div className='flex justify-between items-center h-full w-full'>
				<div className='flex flex-col'>
					<span className='whitespace-nowrap text-sm'>{title}</span>
					{description && (
						<span className='whitespace-nowrap text-sm text-black/50'>{description}</span>
					)}
				</div>
				<button
					onClick={onClick}
					className={`bg-bright text-light-primary flex justify-end items-center h-full w-20 p-2 text-sm rounded-full`}
				>
					<IoIosArrowForward />
				</button>
			</div>
		</div>
	);
};

export default OptionCard;
