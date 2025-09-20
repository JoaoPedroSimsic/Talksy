import React, { useState } from 'react';
import axios from 'axios';
import parseAxiosError from '../../../../helpers/parseAxiosError';
import { useNavigate } from 'react-router-dom';

import PasswordInput from '../../../../components/PasswordInput';
import Logo from '../../../../components/Logo';
import { useAuth } from '../../../../hooks/useAuth';
import validateEmail from '../../../../utils/validateEmail';
import validatePassword from '../../../../utils/validatePassword';

interface LoginState {
	email: string;
	password: string;
	rememberMe: boolean;
	fieldErrors: {
		email?: string;
		password?: string;
	};
	loading: boolean;
}

const LoginForm: React.FC = (): React.ReactNode => {
	const [loginState, setLoginState] = useState<LoginState>({
		email: '',
		password: '',
		rememberMe: false,
		fieldErrors: {},
		loading: false,
	});

	const [success, setSuccess] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const loginEndpoint = `${backendUrl}/auth/login`;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setLoginState((prev) => ({
			...prev,
			[name]: value,
			fieldErrors: {
				...prev.fieldErrors,
				[name]: undefined,
			},
		}));
	};

	const handleRegister = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		navigate('/register');
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { checked, name } = e.target;
		setLoginState((prev) => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoginState((prev) => ({
			...prev,
			loading: true,
			fieldErrors: {},
		}));

		const errors: LoginState['fieldErrors'] = {};

		const emailError = validateEmail(loginState.email);
		if (emailError) errors.email = emailError;

		const passwordError = validatePassword(loginState.password);
		if (passwordError) errors.password = passwordError;

		if (Object.keys(errors).length > 0) {
			setLoginState((prev) => ({
				...prev,
				loading: false,
				fieldErrors: errors,
			}));
			return;
		}

		try {
			await axios.post(
				loginEndpoint,
				{
					email: loginState.email,
					password: loginState.password,
					rememberMe: loginState.rememberMe,
				},
				{ withCredentials: true },
			);

			setSuccess(true);

			setTimeout(() => {
				login();
			}, 1500);

			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} catch (err: unknown) {
			const errors = parseAxiosError(err);

			setLoginState((prev) => ({
				...prev,
				fieldErrors: {
					email: errors[0],
					password: errors[0],
				},
			}));
		} finally {
			setLoginState((prev) => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className='bg-[var(--bg)] relative flex flex-col items-center justify-center w-4/6  py-10 rounded-xl'>
			<div className='flex desktop:hidden absolute top-7 left-7 h-10 w-40'>
				<Logo />
				<span className='flex items-center text-[var(--text)] justify-center ml-1 text-xl font-bold'>
					Talksy
				</span>
			</div>
			<div className='flex flex-col space-y-5 items-center justify-center my-7'>
				<span className='text-[var(--text)] text-3xl font-bold'>Welcome Back</span>
				<span className='text-[var(--text-muted)] text-sm'>
					Enter your email and password to access your account.
				</span>
			</div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center h-full w-3/4 py-4'
			>
				<div className='w-full'>
					<div className='mb-5'>
						<label htmlFor='email' className='text-md text-[var(--text)] block mb-1'>
							E-mail
						</label>
						<input
							className={`w-full p-2 focus:outline-none focus:ring-1 text-[var(--text)] focus:ring-[var(--primary)] border border-solid rounded-md transition-colors duration-300 ease-in-out ${loginState.fieldErrors.email ? 'border-[var(--danger)]' : success ? 'border-[var(--success)]' : 'border-[var(--border)]'} ${loginState.loading ? 'bg-[var(--bg-dark)]' : 'bg-[var(--bg)]'}`}
							name='email'
							type='text'
							placeholder='Enter your email'
							value={loginState.email}
							onChange={handleInputChange}
							disabled={loginState.loading}
						/>
						{loginState.fieldErrors.email && (
							<p className='text-[var(--danger)] text-sm mt-1'>{loginState.fieldErrors.email}</p>
						)}
					</div>

					<div>
						<PasswordInput
							name='password'
							label='Password'
							placeholder='Enter your password'
							value={loginState.password}
							onChange={handleInputChange}
							disabled={loginState.loading}
							error={loginState.fieldErrors.password}
							success={success}
							loading={loginState.loading}
						/>
					</div>
				</div>

				<div className='flex items-center justify-between w-full py-4'>
					<div>
						<input
							type='checkbox'
							checked={loginState.rememberMe}
							onChange={handleCheckBoxChange}
							name='rememberMe'
							className='bg-[var(--bg)] accent-[var(--primary)] cursor-pointer'
							disabled={loginState.loading}
						/>
						<label htmlFor='remember-me' className='text-[var(--text)] text-sm mx-2'>
							Remember Me
						</label>
					</div>
					<div>
						<a className='text-[var(--primary)] hover:text-[var(--secondary)] text-sm cursor-pointer hover:text-secondary'>
							Forgot Your Password?
						</a>
					</div>
				</div>

				<button
					type='submit'
					className={`w-full my-3 p-2 bg-[var(--primary)] hover:bg-[var(--secondary)] rounded-md text-[var(--text)] cursor-pointer active:scale-99`}
					disabled={loginState.loading}
				>
					{loginState.loading ? 'Logging in' : success ? 'Success' : 'Submit'}
				</button>

				<div className='bg-[var(--border)] h-px w-3/4 my-6'></div>

				<div className='flex items-center justify-center my-2 w-full'>
					<span className='text-[var(--text)] text-sm'>Don't Have An Account?</span>
					<a
						onClick={handleRegister}
						className='text-[var(--primary)] mx-1 text-sm cursor-pointer hover:text-[var(--secondary)]'
					>
						Register Now.
					</a>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
