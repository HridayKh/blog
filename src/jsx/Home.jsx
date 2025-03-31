import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
	const blogs = useDataFetcher("listBlogs?limit=none");
	const images = useDataFetcher("listImages"); // Fetch all images at once

	// Create a map for faster image lookup
	const imageMap = images.reduce((acc, img) => {
		acc[img.id] = img;
		return acc;
	}, {});

	console.log(blogs);
	console.log(images);

	return (
		<>
			<Navbar />
			<div className="container mt-3">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
					{blogs.map((blog) => (
						<BlogCard
							key={blog.id}
							title={blog.title}
							subtitle={blog.subtitle}
							tagline={blog.tagline}
							tags={blog.tags}
							date={blog.publish_date}
							img={imageMap[blog.image_id] || {}}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function BlogCard({ title, subtitle, tagline, tags, date, img }) {
	const placeholdImage = "https://placehold.co/600x400/111111/white/png?text=Image+Not+Found";
	return (
		<div className="col">
			<Link to="/b/b1" className="text-decoration-none">
				<div className="card bg-dark h-100">
					<img src={img.url || placeholdImage} className="card-img-top border-bottom border-muted" alt={img.alt || "Image Unavailable"} style={{ height: "35vh", width:"100%"}} />
					<div className="card-body">
						<h2 className="card-title text-primary mb-0">{title}</h2>
						<p className="card-title text-secondary">{subtitle}</p>
						<p className="card-text m-0">
							{tagline}.....<span className="link">Read More</span>
						</p>
						<hr className="my-2" />
						<div className="d-flex justify-content-between ">
							<div className="text-accent">
								{tags.map((tag, index) => (
									<span key={index} className="badge border border-white-50 text-white-50 rounded-pill me-1">
										{tag}
									</span>
								))}
							</div>
							<small className="text-white-50">{daysAgo(date)}</small>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

function daysAgo(dateString) {
	const givenDate = new Date(dateString);
	const today = new Date();

	const diffTime = today - givenDate;
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 30) return `${diffDays} days ago`;
	if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
	return `${Math.floor(diffDays / 365)} years ago`;
}

function useDataFetcher(path) {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("/api/" + path)
			.then((res) => res.json())
			.then(setData)
			.catch(console.error);
	}, [path]);

	return data;
}
