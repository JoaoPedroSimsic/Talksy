import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
	return (
		<div className="flex w-full items-center justify-between h-screen">
			<div className="bg-primary lg:bg-white relative w-full lg:w-1/2 h-screen flex items-center justify-center overflow-hidden">
				<img
					src="/assets/background.svg"
					className="lg:hidden absolute scale-150"
					alt="background"
				/>
				<div className="hidden lg:flex absolute top-10 left-10 h-10 w-40">
					<img
						src="/assets/logo.svg"
						className="scale-70"
						alt="background"
					/>
					<span className="flex items-center justify-center ml-1 text-xl font-bold">Talksy</span>
				</div>
				<LoginForm />
			</div>
			<div className="lg:bg-primary h-screen lg:w-1/2 h-screen hidden lg:flex items-center justify-center rounded-l-3xl overflow-hidden">
				<img
					src="/assets/background.svg"
					className="scale-150"
					alt="background"
				/>
			</div>
		</div>
	);
};

export default Login;
