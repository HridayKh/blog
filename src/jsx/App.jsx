import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/b/:id" element={<Blog />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</Router>
	);
}