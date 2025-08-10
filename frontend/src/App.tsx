import LoginPage from "./pages/Login/Login";
import DashboardPage from "./pages/Dashboard/Dashboard";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />

				<Route path="/dashboard" element={<DashboardPage />} />

				<Route path="*" element={<div>404 Page not found</div>} />
			</Routes>
		</Router>
	);
}

export default App;
