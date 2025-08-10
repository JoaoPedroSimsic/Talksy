import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginState {
	email: string;
	password: string;
	error: string | null;
	loading: boolean;
}

function isObjectWithMessage(err: unknown): err is { message: string } {
	return (
		typeof err === "object" &&
		err !== null &&
		"message" in err &&
		typeof (err as { message: unknown }).message === "string"
	);
}

function isObjectWithErrors(err: unknown): err is { errors: string[] } {
	return (
		typeof err === "object" &&
		err !== null &&
		"errors" in err &&
		Array.isArray((err as { errors: unknown }).errors) &&
		(err as { errors: unknown[] }).errors.every(
			(item) => typeof item === "string",
		)
	);
}

function getErrorMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (isObjectWithMessage(err)) return err.message;
	if (isObjectWithErrors(err)) return err.errors.join(", ");
	return "An unexpected error occurred.";
}

const LoginForm: React.FC = () => {
	const [loginState, setLoginState] = useState<LoginState>({
		email: "",
		password: "",
		error: null,
		loading: false,
	});

	const navigate = useNavigate();

	const backendUrl = "http://localhost:3000";
	const loginEndpoint = `${backendUrl}/auth/login`;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginState((prev) => ({
			...prev,
			[name]: value,
			error: null,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoginState((prev) => ({ ...prev, loading: true, error: null }));
		try {
			const response = await axios.post(
				loginEndpoint,
				{ email: loginState.email, password: loginState.password },
				{ withCredentials: true },
			);

			if (response.status === 200) {
				navigate("/dashboard");
			}
		} catch (err: unknown) {
			const errorMessage = getErrorMessage(err);
			setLoginState((prev) => ({ ...prev, error: errorMessage }));
		} finally {
			setLoginState((prev) => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className="bg-white relative flex flex-col items-center justify-center w-3/4 py-20 rounded-xl">
			<div className="flex lg:hidden absolute top-7 left-7 h-10 w-40">
				<img src="/assets/logo.svg" className="scale-70" alt="background" />
				<span className="flex items-center justify-center ml-1 text-xl font-bold">
					Talksy
				</span>
			</div>
			<div className="flex flex-col space-y-5 items-center justify-center my-7">
				<span className="text-3xl font-bold">Welcome Back</span>
				<span className="text-gray-500 text-sm">
					Enter your email and password to access your account.
				</span>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center h-full w-3/4 py-4"
			>
				<div className="w-full">
					<div className="mb-5">
						<label htmlFor="email" className="text-md">
							E-mail
						</label>
						<input
							className="w-full p-2 border border-solid border-gray-300 rounded-md"
							name="email"
							type="email"
							placeholder="Enter your email"
							value={loginState.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="text-md">
							Password
						</label>
						<input
							className="w-full my-2 p-2 border border-solid border-gray-300 rounded-md"
							name="password"
							type="password"
							placeholder="Enter your password"
							value={loginState.password}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>

				<div className="flex items-center justify-between w-full py-4">
					<div>
						<input
							type="checkbox"
							name="remember-me"
							className="checked:bg-primary cursor-pointer"
						/>
						<label htmlFor="remember-me" className="text-sm mx-2">
							Remember Me
						</label>
					</div>
					<div>
						<a className="text-primary text-sm cursor-pointer hover:text-secondary">
							Forgot Your Password?
						</a>
					</div>
				</div>

				{loginState.error && <p style={{ color: "red" }}>{loginState.error}</p>}

				<button
					type="submit"
					className="bg-primary w-full my-3 p-2 rounded-md text-white cursor-pointer hover:bg-secondary"
					disabled={loginState.loading}
				>
					{loginState.loading ? "Logging in" : "Submit"}
				</button>

				<div className="bg-gray-400 h-px w-3/4 my-6"></div>

				<div className="flex items-center justify-center my-2 w-full">
					<span className="text-sm">Don't Have An Account?</span>
					<a className="text-primary mx-1 text-sm cursor-pointer hover:text-secondary">
						Register Now.
					</a>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
