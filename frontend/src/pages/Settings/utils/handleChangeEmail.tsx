import axios from 'axios';

const handleChangeEmail = async (newEmail: string): Promise<void> => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const endpoint = `${backendUrl}/auth/email`;

  try {
    await axios.put(
      endpoint,
      {
        newEmail,
      },
      { withCredentials: true },
    );
  } catch (err) {
    console.error('Email change failed', err);
  }
};

export default handleChangeEmail;
