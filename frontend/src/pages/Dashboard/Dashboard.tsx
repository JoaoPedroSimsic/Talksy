import axios from 'axios';

const Dashboard: React.FC = (): React.ReactNode => {
  const handleLogout = async (): Promise<void> => {
    const endpoint = 'http://localhost:3000/auth/logout';

    try {
      await axios.get(endpoint, { withCredentials: true });
      window.location.reload();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };
  // <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>

  return (
    <div className='lg:flex'>
      <div className='flex-1 bg-red-500'>nav</div>
      <div className='flex-2 bg-green-500'>chats</div>
      <div className='flex-7 bg-blue-500'>messages</div>
    </div>
  );
};

export default Dashboard;
