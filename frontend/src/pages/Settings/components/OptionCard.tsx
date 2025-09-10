import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface OptionCardProps {
	icon?: React.ElementType;
	title: string;
	description: string;
	onClick: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ icon: Icon, title, description, onClick }): React.ReactNode => {
	return (
		<div className='flex justify-center items-center w-9/10 m-1 py-3 pl-5 pr-3'>
			<div className='flex justify-between items-center h-full w-full'>
				<div className='flex justify-start items-center w-80'>
					{Icon && <Icon size={25} className="text-[var(--text)] mr-5"/>}
					<div className='flex flex-col'>
						<span className='whitespace-nowrap text-sm text-[var(--text)]'>{title}</span>
						{description && (
							<span className='whitespace-nowrap text-sm text-[var(--text-muted)]'>
								{description}
							</span>
						)}
					</div>
				</div>
				<button
					onClick={onClick}
					className={`text-[var(--text)] flex justify-end items-center h-full w-20 p-2 text-sm rounded-full`}
				>
					<IoIosArrowForward />
				</button>
			</div>
		</div>
	);
};

export default OptionCard;
