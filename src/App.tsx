import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"
import CreateAccount from "./pages/createAccount/CreateAccount";
import SiderBar from "./components/SiderBar";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import CreateReceipt from "./pages/createReceipt/CreateReceipt";
import CreateCompany from "./pages/createCompany/CreateCompany";

export default function App() {

	return (
		<BrowserRouter>
			<SiderBar>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create-account" element={<CreateAccount />} />
					<Route path="/home" element={<Home />} />
					<Route path="/create-receipt" element={<CreateReceipt />} />
					<Route path="/create-company" element={<CreateCompany />} />
					<Route path="/create-receipt" element={<CreateReceipt />} />
				</Routes>
			</SiderBar>
		</BrowserRouter>
	)
}