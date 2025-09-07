import React, { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	success?: boolean;
	loading?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	label,
	error,
	success,
	loading,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='mb-5'>
			{label && <label className='text-[var(--text)] text-md block mb-1'>{label}</label>}
			<div className='relative'>
				<input
					{...props}
					type={showPassword ? 'text' : 'password'}
					className={`w-full p-2 pr-12 text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] border border-solid rounded-md transition-colors duration-300 ease-in-out 
						${loading ? 'bg-[var(--bg-dark)]' : 'bg-[var(--bg)]'}
            ${error ? 'border-[var(--danger)]' : success ? 'border-[var(--success)]' : 'border-[var(--border)]'} `}
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute right-3 top-2 cursor-pointer'
				>
					{showPassword ? (
						<MdOutlineVisibilityOff size={25} className='text-[var(--primary)]' />
					) : (
						<MdOutlineVisibility size={25} className='text-[var(--primary)]' />
					)}
				</button>
			</div>
			{error && <p className='text-[var(--danger)] text-sm mt-1'>{error}</p>}
		</div>
	);
};

export default PasswordInput;
