import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />  {/* 404 Page */}
			</Routes>
		</Router>
	);
}

function Home() {
	return 
		<div>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>
		</div>;
}

function About() {
	return (
		<div>
			<h1>About Page</h1>
			<p>Welcome to the About page!</p>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</nav>
		</div>
	);
}

function NotFound() {
	return <h1>NotFound</h1>;
}
