import DashboardPage from "./pages/Dashboard/Dashboard";

import { Route, Routes } from "react-router-dom";

import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginRedirect from "./pages/Login/LoginRedirect";

import "./style.css";

function App() {
	return (
			<Routes>
					<Route path="/login" element={<LoginRedirect />} />

				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<DashboardPage />} />
				</Route>

				<Route path="*" element={<div>404 Page not found</div>} />
			</Routes>
	);
}

export default App;
