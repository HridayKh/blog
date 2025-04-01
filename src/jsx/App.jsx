import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Main from "../dash/Main";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/b/:id" element={<Blog />} />
				<Route path="/DASH" element={<Main />} />
			</Routes>
		</Router>
	);
}
