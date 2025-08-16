import { useState } from 'react';
import axios from 'axios';
import parseAxiosError from '../../../helpers/parseAxiosError';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import validateEmail from '../../../utils/validateEmail';
import validatePassword from '../../../utils/validatePassword';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

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

const RegisterForm: React.FC = () => {
  const [registerState, setRegisterState] = useState<RegisterState>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fieldErrors: {},
    loading: false,
  });

  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const backendUrl = 'http://localhost:3000';
  const registerEndpoint = `${backendUrl}/users`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className='bg-white relative flex flex-col items-center justify-center max-h-[95%] lg:h-auto w-3/4 py-20 rounded-xl'>
      <div className='flex lg:hidden absolute top-7 left-7 h-10 w-40'>
        <img src='/assets/logo.svg' className='scale-70' alt='background' />
        <span className='flex items-center justify-center ml-1 text-xl font-bold'>Talksy</span>
      </div>
      <div className='flex flex-col space-y-5 items-center justify-center lg:my-7'>
        <span className='text-3xl font-bold'>Create an Account</span>
        <span className='text-gray-500 text-sm'>
          Join the chat. It's free and easy to create an account.
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center h-full w-3/4 py-4'
      >
        <div className='w-full'>
          <div className='mb-5'>
            <label htmlFor='username' className='text-md'>
              Username
            </label>
            <input
              className={`w-full p-2 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.email ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${registerState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
              name='username'
              type='text'
              placeholder='Enter your email'
              value={registerState.username}
              onChange={handleInputChange}
            />
            {registerState.fieldErrors.username && (
              <p className='text-red-500 text-sm mt-1'>{registerState.fieldErrors.username}</p>
            )}
          </div>
          <div className='mb-5'>
            <label htmlFor='email' className='text-md'>
              E-mail
            </label>
            <input
              className={`w-full p-2 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.email ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${registerState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
              name='email'
              type='text'
              placeholder='Enter your email'
              value={registerState.email}
              onChange={handleInputChange}
              required
            />
            {registerState.fieldErrors.email && (
              <p className='text-red-500 text-sm mt-1'>{registerState.fieldErrors.email}</p>
            )}
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='text-md'>
              Password
            </label>
            <div className='relative'>
              <input
                className={`w-full p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.password ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${registerState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                value={registerState.password}
                onChange={handleInputChange}
                disabled={registerState.loading}
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
            {registerState.fieldErrors.password && (
              <p className='text-red-500 text-sm mt-1'>{registerState.fieldErrors.password}</p>
            )}
          </div>
          <div className='mb-5'>
            <label htmlFor='confirmPassword' className='text-md'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                className={`w-full p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-primary border border-solid rounded-md transition-colors duration-300 ease-in-out ${registerState.fieldErrors.password ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-300'} ${success ? 'ring-green-400' : 'focus:ring-primary'} ${success ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''} ${registerState.loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Enter your confirmPassword'
                value={registerState.confirmPassword}
                onChange={handleInputChange}
                disabled={registerState.loading}
              />
              {registerState.fieldErrors.password && (
                <p className='text-red-500 text-sm mt-1'>{registerState.fieldErrors.password}</p>
              )}
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-2 cursor-pointer'
              >
                {showConfirmPassword ? (
                  <MdVisibilityOff size={25} className='text-primary' />
                ) : (
                  <MdVisibility size={25} className='text-primary' />
                )}
              </button>
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
            disabled={registerState.loading}
          >
            {registerState.loading ? 'Logging in' : success ? 'Success' : 'Submit'}
          </button>
        </div>

        <div className='bg-gray-400 h-px w-3/4 my-6'></div>

        <div className='flex items-center justify-center my-2 w-full'>
          <span className='text-sm'>Already Have An Account?</span>
          <a
            onClick={handleSignIn}
            className='text-primary mx-1 text-sm cursor-pointer hover:text-secondary'
          >
            Sign In.
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
