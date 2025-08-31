import axios from 'axios';

const handleChangePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const endpoint = `${backendUrl}/auth/password`;

  try {
    await axios.put(
      endpoint,
      {
				oldPassword,
				newPassword,
      },
      { withCredentials: true },
    );
  } catch (err) {
    console.error('Email change failed', err);
  }
};

export default handleChangePassword;
