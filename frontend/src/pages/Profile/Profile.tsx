import React from 'react';
import axios from 'axios';

interface User {
  username: string;
  email: string;
  photo: string | null;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const userCheckEndpoint = `${backendUrl}/users/me`;

const fetchUser = async (): Promise<void> => {
  const response = axios.get<User>(userCheckEndpoint, {
		withCredentials: true,
	});
};

const Profile: React.FC = (): React.ReactNode => {
  return (
    <div className='px-5 h-full w-full'>
      <div className='h-full'></div>
    </div>
  );
};

export default Profile;
