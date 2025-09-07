import React, { useState } from 'react';
import axios from 'axios';
import parseAxiosError from '../../../helpers/parseAxiosError';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '../../../components/PasswordInput';
import Logo from '../../../components/Logo';
import { useAuth } from '../../../context/useAuth';
import validateEmail from '../../../utils/validateEmail';
import validatePassword from '../../../utils/validatePassword';

interface RegisterState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	fieldErrors: {
		username?: string;
		email?: string;
		password?: string;
	};
	loading: boolean;
}

const RegisterForm: React.FC = (): React.ReactNode => {
	const [registerState, setRegisterState] = useState<RegisterState>({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		fieldErrors: {},
		loading: false,
	});

	const [success, setSuccess] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const registerEndpoint = `${backendUrl}/users`;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setRegisterState((prev) => ({
			...prev,
			[name]: value,
			fieldErrors: {
				...prev.fieldErrors,
				[name]: undefined,
			},
		}));
	};

	const handleSignIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		navigate('/login');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setRegisterState((prev) => ({ ...prev, loading: true, fieldErrors: {} }));

		const errors: RegisterState['fieldErrors'] = {};

		const emailError = validateEmail(registerState.email);
		if (emailError) errors.email = emailError;

		const passwordError = validatePassword(registerState.password);
		if (passwordError) errors.password = passwordError;

		const username = registerState.username;

		if (username.length < 3 || username.length > 40) {
			errors.username = 'Username must be between 3 and 40 characters long';
		}

		if (registerState.password !== registerState.confirmPassword) {
			errors.password = 'Passwords do not match';
		}

		if (Object.keys(errors).length > 0) {
			setRegisterState((prev) => ({
				...prev,
				loading: false,
				fieldErrors: errors,
			}));
			return;
		}

		try {
			await axios.post(
				registerEndpoint,
				{
					username: registerState.username,
					email: registerState.email,
					password: registerState.password,
				},
				{ withCredentials: true },
			);

			setSuccess(true);

			await axios.post(
				`${backendUrl}/auth/login`,
				{
					email: registerState.email,
					password: registerState.password,
				},
				{ withCredentials: true },
			);

			setTimeout(() => {
				login();
			}, 1500);

			setTimeout(() => {
				setSuccess(false);
			}, 3000);

			navigate('/');
		} catch (err: unknown) {
			const errors = parseAxiosError(err);
			setRegisterState((prev) => ({
				...prev,
				fieldErrors: { email: errors[0], password: errors[0] },
			}));
		} finally {
			setRegisterState((prev) => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className='bg-[var(--bg)] relative flex flex-col items-center justify-center max-h-[95%] desktop:h-auto w-4/6 py-10 rounded-xl'>
			<div className='flex desktop:hidden absolute top-7 left-7 h-10 w-40'>
				<Logo />
				<span className='hidden laptop:flex items-center justify-center ml-1 text-[var(--text)] text-xl font-bold'>Talksy</span>
			</div>
			<div className='flex flex-col space-y-5 items-center justify-center desktop:my-3'>
				<span className='text-[var(--text)] text-3xl font-bold'>Create an Account</span>
				<span className='text-[var(--text-muted)] text-sm'>
					Join the chat. It's free and easy to create an account.
				</span>
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center h-full w-3/4 py-4'
			>
				<div className='w-full'>
					<div className='mb-5'>
						<label htmlFor='username' className='text-md text-[var(--text)] block mb-1'>
							Username
						</label>
						<input
							className={`w-full p-2 focus:outline-none focus:ring-1 text-[var(--text)] focus:ring-[var(--primary)] border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.username ? 'border-[var(--danger)]' : success ? 'border-[var(--success)]' : 'border-[var(--border)]'} ${registerState.loading ? 'bg-[var(--bg-dark)] cursor-not-allowed' : 'bg-[var(--bg)]'}`}
							name='username'
							type='text'
							placeholder='Enter your username'
							value={registerState.username}
							onChange={handleInputChange}
						/>
						{registerState.fieldErrors.username && (
							<p className='text-[var(--danger)] text-sm mt-1'>{registerState.fieldErrors.username}</p>
						)}
					</div>
					<div className='mb-5'>
						<label htmlFor='email' className='text-md text-[var(--text)] block mb-1'>
							E-mail
						</label>
						<input
							className={`w-full p-2 focus:outline-none focus:ring-1 text-[var(--text)] focus:ring-[var(--primary)] border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.email ? 'border-[var(--danger)]' : success ? 'border-[var(--success)]' : 'border-[var(--border)]'} ${registerState.loading ? 'bg-[var(--bg-dark)] cursor-not-allowed' : 'bg-[var(--bg)]'}`}
							name='email'
							type='text'
							placeholder='Enter your email'
							value={registerState.email}
							onChange={handleInputChange}
							required
						/>
						{registerState.fieldErrors.email && (
							<p className='text-[var(--danger)] text-sm mt-1'>{registerState.fieldErrors.email}</p>
						)}
					</div>
					<div className='mb-5'>
						<PasswordInput
							name='password'
							label='Password'
							placeholder='Enter your password'
							value={registerState.password}
							onChange={handleInputChange}
							disabled={registerState.loading}
							error={registerState.fieldErrors.password}
						/>
					</div>
					<div className='mb-5'>
						<PasswordInput
							name='confirmPassword'
							label='Confirm Password'
							placeholder='Confirm your password'
							value={registerState.confirmPassword}
							onChange={handleInputChange}
							disabled={registerState.loading}
							error={registerState.fieldErrors.password}
						/>
					</div>

					<button
						type='submit'
						className={`w-full my-3 p-2 rounded-md text-[var(--bg)] cursor-pointer transition-colors duration-300 ease-in-out ${success ? 'bg-[var(--success)] hover:bg-[var(--success-dark)] shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-[var(--primary)] hover:bg-[var(--secondary)]'}`}
						disabled={registerState.loading}
					>
						{registerState.loading ? 'Logging in' : success ? 'Success' : 'Submit'}
					</button>
				</div>

				<div className='bg-[var(--border)] h-px w-3/4 my-6'></div>

				<div className='flex items-center justify-center my-2 w-full'>
					<span className='text-[var(--text)] text-sm'>Already Have An Account?</span>
					<a
						onClick={handleSignIn}
						className='text-[var(--primary)] mx-1 text-sm cursor-pointer hover:text-[var(--secondary)]'
					>
						Sign In.
					</a>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
