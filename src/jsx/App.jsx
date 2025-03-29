import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/b/:id" element={<Blog />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

function NotFound() {
	return (
		<div className="d-flex flex-column align-items-center justify-content-center vh-100 text-light">
			<h1 className="display-3 text-danger">404</h1>
			<p className="lead">Oops! Page not found.</p>
			<a href="/" className="btn btn-outline-secondary">Go Home</a>
		</div>
	);
}
