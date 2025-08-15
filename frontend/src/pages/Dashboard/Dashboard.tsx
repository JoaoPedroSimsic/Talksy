import axios from 'axios';

const Dashboard: React.FC = () => {
  const handleLogout = async (): Promise<void> => {
    const endpoint = 'http://localhost:3000/auth/logout';

		try {
			await axios.get(endpoint, { withCredentials: true });
			window.location.reload();
		} catch (err) {
			console.error('Logout failed', err);
		}

  };

  return (
    <div className='flex content-center items-center'>
      <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
    </div>
  );
};

export default Dashboard;
