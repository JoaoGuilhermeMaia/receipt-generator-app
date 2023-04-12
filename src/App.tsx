import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
import CreateAccount from "./pages/createAccount/CreateAccount";

export default function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/"  element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create-account" element={<CreateAccount />} />
			</Routes>
		</BrowserRouter>
	)
}