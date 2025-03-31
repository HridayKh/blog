import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Blog() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [blog, setBlog] = useState(null);
	const [image, setImage] = useState(null);

	// Fetch blog by ID
	useEffect(() => {
		fetch(`/api/blogById?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched Blog Data:", data); // Debugging log
				if (data && Object.keys(data).length > 0) {
					setBlog(data[0]);
				} else {
					console.error("Blog data is empty!");
				}
			})
			.catch(console.error);

	}, [id]);

	// Fetch image only when blog is loaded
	useEffect(() => {
		if (blog?.image_id) {
			fetch(`/api/imageInfo?id=${blog.image_id}`)
				.then((res) => res.json())
				.then((data) => setImage(data[0])) // API returns an array
				.catch(console.error);
		}
	}, [blog?.image_id]);

	const imgURL = image?.url || "https://placehold.co/600x400/111111/white/png?text=Image+Not+Found";
	const imgAlt = image?.alt || "Image Not Found";

	return (
		<div className="container mt-4">
			<button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/")}>
				← Home
			</button>

			{/* Show loading text if blog is still null */}
			{!blog || Object.keys(blog).length === 0 ? (
				<p className="text-center text-light">Loading...</p>
			) : (
				<div className="card bg-dark text-light p-4">
					<h1 className="text-primary text-center">{blog.title}</h1>
					<h5 className="text-secondary text-center">{blog.subtitle}</h5>

					{image && (
						<div className="text-center mb-3">
							<img
								src={image.url}
								alt={image.alt || "Image"}
								className="img-fluid rounded"
								style={{ minWidth: "300px", minHeight: "200px", maxWidth: "100%", height: "auto" }}
							/>
							{image.name && <span className="d-block mt-2 text-accent">{image.name}</span>}
						</div>
					)}


					<hr />

					<div className="text-light">
						<ReactMarkdown
							components={{
								code({ inline, className, children }) {
									const match = /language-(\w+)/.exec(className || "");
									return !inline && match ? (
										<SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div">
											{String(children).trim()}
										</SyntaxHighlighter>
									) : (
										<code className="bg-black px-1 rounded text-white pt-1 px-2">{children}</code>
									);
								},
							}}
						>
							{blog.content}
						</ReactMarkdown>
					</div>
				</div>
			)}
		</div>
	);
}
