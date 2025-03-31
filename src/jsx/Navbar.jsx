import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Navbar() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [tags, setTags] = useState([]);

	// Fetch tags from /api/listTags on mount
	useEffect(() => {
		fetch("/api/listTags")
			.then((res) => res.json())
			.then((data) => setTags(data))
			.catch((err) => console.error("Failed to fetch tags:", err));
	}, []);

	const selectedTagIds = searchParams.get("tags")?.split(",") || [];
	const mode = searchParams.get("mode") || "or";

	// Function to calculate contrast color (black or white) based on background brightness
	const getTextColor = (hex) => {
		if (!hex || typeof hex !== "string" || !hex.match(/^#?[a-fA-F0-9]{6}$/)) {
			return "#000"; // Default to black if hex is invalid
		}
		const rgb = hex.replace("#", "").match(/[a-fA-F0-9]{2}/g).map((val) => parseInt(val, 16));
		const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return brightness > 125 ? "#000" : "#fff"; // Light backgrounds get black text, dark ones get white
	};

	// Toggle tag selection
	const handleTagClick = (tagId) => {
		let updatedTags = selectedTagIds.includes(tagId)
			? selectedTagIds.filter((t) => t !== tagId) // Remove if already selected
			: [...selectedTagIds, tagId]; // Add new tag

		setSearchParams({ tags: updatedTags.join(","), mode });
	};

	// Toggle filter mode (AND <-> OR)
	const toggleMode = () => {
		setSearchParams({ tags: selectedTagIds.join(","), mode: mode === "or" ? "and" : "or" });
	};

	return (
		<nav className="navbar navbar-expand bg-dark px-5 mx-0 ps-1 pe-1" data-bs-theme="dark">
			<div className="container-fluid d-flex flex-column flex-sm-row justify-content-between">

				{/* Brand */}
				<h1 className="navbar-brand text-accent m-0 me-2" href="/">Hriday's Blogs</h1>

				{/* Tag Filters */}
				<div className="d-flex flex-wrap align-items-center gap-2">
					<button className="btn btn-success" onClick={toggleMode}>
						{mode.toUpperCase()}
					</button>

					<div className="vr text-accent"></div>

					{tags.map(({ id, name, hex }) => {
						const isSelected = selectedTagIds.includes(id);
						return (
							<button
								key={id}
								className="btn btn-sm"
								style={{
									backgroundColor: isSelected ? hex || "#ccc" : "transparent",
									color: isSelected ? getTextColor(hex) : hex || "#999",
									border: `2px solid ${hex || "#999"}`,
								}}
								onClick={() => handleTagClick(id)}>
								{name || "Unknown"}
							</button>
						);
					})}
				</div>

			</div>
		</nav>
	);
}
