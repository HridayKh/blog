import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
	const [searchParams] = useSearchParams();
	const selectedTagIds = searchParams.get("tags")?.split(",").filter(Boolean) || [];
	const mode = searchParams.get("mode") || "and";

	// Fetch all blogs and tags
	const blogs = useDataFetcher("listBlogs?limit=none");
	const images = useDataFetcher("listImages");
	const tagsList = useDataFetcher("listTags"); // Fetch tags to map IDs to names

	// 🛠 Map tag IDs to full tag objects
	const tagMap = tagsList.reduce((acc, tag) => {
		acc[tag.id] = tag;
		return acc;
	}, {});

	// 🛠 Filter blogs based on selected tags & mode
	const filteredBlogs = blogs.filter((blog) => {
		if (selectedTagIds.length === 0) return true; // No filter, show all blogs
		const blogTagIds = blog.tags || [];

		if (mode === "or") {
			// OR Mode: At least one tag should match
			return blogTagIds.some((tagId) => selectedTagIds.includes(tagId));
		} else {
			// AND Mode: Blog must have ALL selected tags
			return selectedTagIds.every((tagId) => blogTagIds.includes(tagId));
		}
	});

	// 🛠 Map image IDs to images
	const imageMap = images.reduce((acc, img) => {
		acc[img.id] = img;
		return acc;
	}, {});

	return (
		<>
			<Navbar />
			<div className="container mt-3">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
					{filteredBlogs.map((blog) => (
						<BlogCard
							key={blog.id}
							id={blog.id}
							title={blog.title}
							subtitle={blog.subtitle}
							tagline={blog.tagline}
							tags={blog.tags.map((id) => tagMap[id] || { name: "Unknown", hex: "#999" })} // Convert tag IDs to objects
							date={blog.publish_date}
							img={imageMap[blog.image_id] || {}}
						/>
					))}
				</div>
			</div>
		</>
	);
}

function BlogCard({ id, title, subtitle, tagline, tags, date, img }) {
	const placeholdImage = "https://placehold.co/600x400/111111/white/png?text=Image+Not+Found";
	return (
		<div className="col">
			<Link to={`/b/${id}`} className="text-decoration-none">
				<div className="card bg-dark h-100">
					<img src={img.url || placeholdImage} className="card-img-top border-bottom border-muted" alt={img.alt || "Image Unavailable"} style={{ height: "35vh", width: "100%" }} />
					<div className="card-body d-flex flex-column">
						<h2 className="card-title text-primary mb-0">{title}</h2>
						<p className="card-title text-secondary">{subtitle}</p>
						<p className="card-text m-0 flex-grow-1">
							{tagline}.....<span className="link">Read More</span>
						</p>
						<hr className="my-2" />
						<div className="d-flex justify-content-between">
							{/* 🛠 Show proper tag names and colors */}
							<div className="d-flex flex-wrap gap-1">
								{tags.map((tag, index) => (
									<span key={index} className="badge text-dark" style={{ backgroundColor: tag.hex }}>
										{tag.name}
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
