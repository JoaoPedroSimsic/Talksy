import axios from "axios";

	const handleLogout = async (): Promise<void> => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		const endpoint = `${backendUrl}/auth/logout`;

		try {
			await axios.get(endpoint, { withCredentials: true });
			window.location.reload();
		} catch (err) {
			console.error('Logout failed', err);
		}
	};


export default handleLogout;
