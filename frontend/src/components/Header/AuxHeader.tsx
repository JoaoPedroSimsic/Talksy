import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoIosArrowRoundBack } from 'react-icons/io';

interface AuxHeaderProps {
	pageName: string;
}

const AuxHeader: React.FC<AuxHeaderProps> = ({ pageName }): ReactNode => {
	const navigate = useNavigate();

	return (
		<div className='flex justify-start items-center p-5 w-full'>
			<IoIosArrowRoundBack 
				size={30} 
				className='text-[var(--text)] mr-4'
				onClick={() => navigate(-1)}
			/>
			<span 
				className="text-[var(--text)] text-md font-bold"
			>{pageName}</span>
		</div>
	);
};

export default AuxHeader;
