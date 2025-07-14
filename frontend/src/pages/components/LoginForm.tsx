import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import validator from 'validator';

interface LoginState {
	email: string;
	password: string;
	error: string | null;
	loading: boolean;
}

interface LoginErrorResponse {
	errors?: string[];
	message?: string;
}

function isObjectWithMessage(err: unknown): err is { message: string } {
	return (
		typeof err === 'object' &&
		err !== null &&
		'message' in err &&
		typeof (err as { message: unknown }).message === 'string'
	);
}

function isObjectWithErrors(err: unknown): err is { errors: string[] } {
	return (
		typeof err === 'object' &&
		err !== null &&
		'errors' in err &&
		Array.isArray((err as { errors: unknown }).errors) &&
		(err as { errors: unknown[] }).errors.every(
			(item) => typeof item === 'string',
		)
	);
}

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	}
	if (isObjectWithMessage(err)) {
		return err.message;
	}
	if (isObjectWithErrors(err)) {
		return err.errors.join(', ');
	}
	return 'An unexpected error occurred.';
}

const LoginForm: React.FC = () => {
	const [loginState, setLoginState] = useState<LoginState>({
		email: '',
		password: '',
		error: null,
		loading: false,
	});

	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginState((prevState) => ({
			...prevState,
			[name]: value,
			error: null,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoginState((prevState) => ({
			...prevState,
			error: null,
			loading: true,
		}));

		const backendUrl = 'http://localhost:3000';
		const loginEndpoint = `${backendUrl}/auth/login`;

		try {
			const response = await axios.post(
				loginEndpoint,
				{
					email: loginState.email,
					password: loginState.password,
				},
				{ withCredentials: true },
			);

			console.log('Login successful', response.data);
			alert('Success');
		} catch (err: unknown) {
			console.error('Login error:', err);

			const errorMessage = getErrorMessage(err);

			setLoginState((prevState) => ({
				...prevState,
				error: errorMessage,
			}));
		} finally {
			setLoginState((prevState) => ({ ...prevState, loading: false }));
		}
	};

	const signUp = () => {
		navigate('/signup');
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md w-full max-w-md">
				<h3 className="text-2xl font-bold text-center">
					Log into your account
				</h3>
				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<div>
							<label className="block" htmlFor="email">
								Email
							</label>
							<input
								type="email"
								placeholder="Email"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								name="email"
								id="email"
								value={loginState.email}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="mt-4">
							<label className="block" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								placeholder="Password"
								className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								name="password"
								id="password"
								value={loginState.password}
								onChange={handleInputChange}
								required
							/>
						</div>
						{loginState.error && (
							<div className="mt-4 text-red-500 text-sm">
								{loginState.error}
							</div>
						)}
						<div className="flex items-baseline justify-between">
							<button
								type="submit"
								className={`px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 ${loginState.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
								disabled={loginState.loading}
							>
								{loginState.loading ? 'Logging...' : 'Login'}
							</button>
							{/* Add a link for forgot password or signup if needed */}
							<button onClick={signUp} className="text-sm text-blue-600 hover:underline">Sign up</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
