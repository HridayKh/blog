import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="container mt-3">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
				</div>
			</div>
		</>
	);
}

function BlogCard() {
	return (
		<div className="col">
			<Link to="/b/b1" className="text-decoration-none">
				<div className="card bg-dark h-100">
					<img src="https://placehold.co/15x10/505050/FFF" className="card-img-top" alt="Placeholder Image"/>
					<div className="card-body">
						<h2 className="card-title text-primary mb-0">Blog Title</h2>
						<p className="card-title text-secondary">Blog Subtitle</p>
						<p className="card-text">
							The blog tagline is used to avoid needing to extract text from the mdx blog itself and save on needing to do uselexx compute.....<span className="link">Read More</span>
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
