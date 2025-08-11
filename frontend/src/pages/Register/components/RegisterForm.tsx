import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
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

const RegisterForm: React.FC = () => {
	const [registerState, setRegisterState] = useState<RegisterState>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: null,
		loading: false,
	});

	const navigate = useNavigate();

	const backendUrl = "http://localhost:3000";
	const loginEndpoint = `${backendUrl}/users`;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRegisterState((prev) => ({
			...prev,
			[name]: value,
			error: null,
		}));
	};

	const handleSignIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		navigate("/login");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRegisterState((prev) => ({ ...prev, loading: true, error: null }));

		if (registerState.password !== registerState.confirmPassword) {
			setRegisterState((prev) => ({
				...prev,
				loading: false,
				error: "Passwords do not match!",
			}));
			return;
		}

		try {
			await axios.post(
				loginEndpoint,
				{
					username: registerState.username,
					email: registerState.email,
					password: registerState.password,
				},
				{ withCredentials: true },
			);
		} catch (err: unknown) {
			const errorMessage = getErrorMessage(err);
			setRegisterState((prev) => ({ ...prev, error: errorMessage }));
		} finally {
			setRegisterState((prev) => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className="bg-white relative flex flex-col items-center justify-center max-h-[95%] lg:h-auto w-3/4 py-20 rounded-xl">
			<div className="flex lg:hidden absolute top-7 left-7 h-10 w-40">
				<img src="/assets/logo.svg" className="scale-70" alt="background" />
				<span className="flex items-center justify-center ml-1 text-xl font-bold">
					Talksy
				</span>
			</div>
			<div className="flex flex-col space-y-5 items-center justify-center my-7">
				<span className="text-3xl font-bold">Create an Account</span>
				<span className="text-gray-500 text-sm">
					Join the chat. It's free and easy to create an account.
				</span>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center justify-center h-full w-3/4 py-4"
			>
				<div className="w-full">
					<div className="mb-5">
						<label htmlFor="username" className="text-md">
							Username
						</label>
						<input
							className="w-full p-2 border border-solid border-gray-300 rounded-md"
							name="username"
							type="text"
							placeholder="Enter your email"
							value={registerState.username}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="mb-5">
						<label htmlFor="email" className="text-md">
							E-mail
						</label>
						<input
							className="w-full p-2 border border-solid border-gray-300 rounded-md"
							name="email"
							type="email"
							placeholder="Enter your email"
							value={registerState.email}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="mb-5">
						<label htmlFor="password" className="text-md">
							Password
						</label>
						<input
							className="w-full p-2 border border-solid border-gray-300 rounded-md"
							name="password"
							type="password"
							placeholder="Enter your email"
							value={registerState.password}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword" className="text-md">
							Confirm Password
						</label>
						<input
							className="w-full my-2 p-2 border border-solid border-gray-300 rounded-md"
							name="confirmPassword"
							type="password"
							placeholder="Enter your password"
							value={registerState.confirmPassword}
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

				{registerState.error && (
					<p style={{ color: "red" }}>{registerState.error}</p>
				)}

				<button
					type="submit"
					className="bg-primary w-full my-3 p-2 rounded-md text-white cursor-pointer hover:bg-secondary"
					disabled={registerState.loading}
				>
					{registerState.loading ? "Registering..." : "Register"}
				</button>

				<div className="bg-gray-400 h-px w-3/4 my-6"></div>

				<div className="flex items-center justify-center my-2 w-full">
					<span className="text-sm">Already Have An Account?</span>
					<a
						onClick={handleSignIn}
						className="text-primary mx-1 text-sm cursor-pointer hover:text-secondary"
					>
						Sign In.
					</a>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
