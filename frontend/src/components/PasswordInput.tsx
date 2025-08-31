import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, error, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='mb-5'>
			{label && <label className='text-md block mb-1'>{label}</label>}
			<div className='relative'>
				<input
					{...props}
					type={showPassword ? 'text' : 'password'}
					className={`w-full p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out 
            ${error ? 'border-red-500' : 'border-gray-300'} 
            ${props.disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute right-3 top-2 cursor-pointer'
				>
					{showPassword ? (
						<MdVisibilityOff size={25} className='text-primary' />
					) : (
						<MdVisibility size={25} className='text-primary' />
					)}
				</button>
			</div>
			{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
		</div>
	);
};

export default PasswordInput;
