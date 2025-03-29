import { useSearchParams } from "react-router-dom";

export default function Navbar() {
	const [searchParams, setSearchParams] = useSearchParams();

	const tags = ["Tech", "JavaScript", "React", "Backend", "AI"];
	const selectedTags = searchParams.get("tags")?.split(",") || [];
	const mode = searchParams.get("mode") || "and";

	// Toggle tag selection
	const handleTagClick = (tag) => {
		let updatedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag) // Remove if already selected
			: [...selectedTags, tag]; // Add new tag

		setSearchParams({ tags: updatedTags.join(","), mode });
	};

	// Toggle filter mode (AND <-> OR)
	const toggleMode = () => {
		setSearchParams({ tags: selectedTags.join(","), mode: mode === "or" ? "and" : "or" });
	};

	return (
		<nav className="navbar navbar-expand bg-dark px-5 mx-0" data-bs-theme="dark">
			<div className="container-fluid d-flex flex-column flex-sm-row justify-content-between">
				
				{/* Brand */}
				<h1 className="navbar-brand text-accent m-0" href="/">Hriday's Blogs</h1>

				{/* Tag Filters */}
				<div className="d-flex flex-wrap align-items-center gap-2">
					<button
						className={`btn ${mode === "or" ? "btn-success" : "btn-success"}`}
						onClick={toggleMode}>
						{mode.toUpperCase()}
					</button>

					<div className="vr text-accent"></div>

					{tags.map((tag) => (
						<button
							key={tag}
							className={`btn btn-sm ${selectedTags.includes(tag) ? "btn-primary" : "btn-outline-secondary"}`}
							onClick={() => handleTagClick(tag)}>
							{tag}
						</button>
					))}
				</div>
				
			</div>
		</nav>
	);
}
