import React, { useState } from 'react';
import axios from 'axios';
import parseAxiosError from '../../../helpers/parseAxiosError';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import validateEmail from '../../../utils/validateEmail';
import validatePassword from '../../../utils/validatePassword';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

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
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const backendUrl = 'http://localhost:3000';
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
    <div className='bg-white relative flex flex-col items-center justify-center w-3/4 py-20 rounded-xl'>
      <div className='flex lg:hidden absolute top-7 left-7 h-10 w-40'>
        <img src='/assets/logo.svg' className='scale-70' alt='background' />
        <span className='flex items-center justify-center ml-1 text-xl font-bold'>Talksy</span>
      </div>
      <div className='flex flex-col space-y-5 items-center justify-center my-7'>
        <span className='text-3xl font-bold'>Welcome Back</span>
        <span className='text-gray-500 text-sm'>
          Enter your email and password to access your account.
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center h-full w-3/4 py-4'
      >
        <div className='w-full'>
          <div className='mb-5'>
            <label htmlFor='email' className='text-md'>
              E-mail
            </label>
            <input
              className={`w-full p-2 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${loginState.fieldErrors.email ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${loginState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
              name='email'
              type='text'
              placeholder='Enter your email'
              value={loginState.email}
              onChange={handleInputChange}
              disabled={loginState.loading}
            />
            {loginState.fieldErrors.email && (
              <p className='text-red-500 text-sm mt-1'>{loginState.fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor='password' className='text-md'>
              Password
            </label>
            <div className='relative'>
              <input
                className={`w-full p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${loginState.fieldErrors.password ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${loginState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={loginState.password}
                onChange={handleInputChange}
                disabled={loginState.loading}
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
            {loginState.fieldErrors.password && (
              <p className='text-red-500 text-sm mt-1'>{loginState.fieldErrors.password}</p>
            )}
          </div>
        </div>

        <div className='flex items-center justify-between w-full py-4'>
          <div>
            <input
              type='checkbox'
              checked={loginState.rememberMe}
              onChange={handleCheckBoxChange}
              name='rememberMe'
              className='accent-primary cursor-pointer'
              disabled={loginState.loading}
            />
            <label htmlFor='remember-me' className='text-sm mx-2'>
              Remember Me
            </label>
          </div>
          <div>
            <a className='text-primary text-sm cursor-pointer hover:text-secondary'>
              Forgot Your Password?
            </a>
          </div>
        </div>

        <button
          type='submit'
          className={`w-full my-3 p-2 rounded-md text-white cursor-pointer transition-colors duration-300 ease-in-out 
						${
              success
                ? 'bg-green-500 hover:bg-green-600 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                : 'bg-primary hover:bg-secondary'
            }`}
          disabled={loginState.loading}
        >
          {loginState.loading ? 'Logging in' : success ? 'Success' : 'Submit'}
        </button>

        <div className='bg-gray-400 h-px w-3/4 my-6'></div>

        <div className='flex items-center justify-center my-2 w-full'>
          <span className='text-sm'>Don't Have An Account?</span>
          <a
            onClick={handleRegister}
            className='text-primary mx-1 text-sm cursor-pointer hover:text-secondary'
          >
            Register Now.
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
