import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import parseAxiosError from "../../../helpers/parseAxiosError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

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

const validateEmail = (email: string): string | null => {
  if (!email) return "Email is required";
  if (!validator.isEmail(email)) return "Invalid email address";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

const LoginForm: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
    rememberMe: false,
    fieldErrors: {},
    loading: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const backendUrl = "http://localhost:3000";
  const loginEndpoint = `${backendUrl}/auth/login`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    navigate("/register");
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setLoginState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoginState((prev) => ({
      ...prev,
      fieldErrors: {},
    }));

    const emailError = validateEmail(loginState.email);
    const passwordError = validatePassword(loginState.password);

    if (emailError || passwordError) {
      setLoginState((prev) => ({
        ...prev,
        fieldErrors: {
          email: emailError ?? undefined,
          password: passwordError ?? undefined,
        },
      }));
      return;
    }

    setLoginState((prev) => ({ ...prev, loading: true }));

    try {
      await axios.post(
        loginEndpoint,
        { email: loginState.email, password: loginState.password, rememberMe: loginState.rememberMe},
        { withCredentials: true },
      );

      login();
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
              className={`w-full p-2 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md ${loginState.fieldErrors.email ? "border-red-500" : "border-gray-300"}`}
              name="email"
              type="text"
              placeholder="Enter your email"
              value={loginState.email}
              onChange={handleInputChange}
            />
            {loginState.fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {loginState.fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-md">
              Password
            </label>
            <input
              className={`w-full p-2 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md ${loginState.fieldErrors.password ? "border-red-500" : "border-gray-300"}`}
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginState.password}
              onChange={handleInputChange}
            />
            {loginState.fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {loginState.fieldErrors.password}
              </p>
            )}

						{/*add change visibility button*/}

          </div>
        </div>

        <div className="flex items-center justify-between w-full py-4">
          <div>
            <input
              type="checkbox"
              checked={loginState.rememberMe}
              onChange={handleCheckBoxChange}
              name="rememberMe"
              className="accent-primary cursor-pointer"
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
          <a
            onClick={handleRegister}
            className="text-primary mx-1 text-sm cursor-pointer hover:text-secondary"
          >
            Register Now.
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
