import { useState } from "react";

export function CreateBlog() {
	const [formData, setFormData] = useState({
		title: "",
		subtitle: "",
		tagline: "",
		content: "",
		tags: "",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	// Handle input change
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		console.log(sessionStorage.getItem("password"));
		e.preventDefault();
		setLoading(true);

		try {
			// Format tags properly
			const formattedTags = formData.tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "")
				.join(",");

			// Convert formData to URL params
			const params = new URLSearchParams({
				title: formData.title,
				subtitle: formData.subtitle,
				tagline: formData.tagline,
				content: formData.content,
				tags: formattedTags,
			}).toString();
			// Make the request with GET method + URL params
			const password = sessionStorage.getItem("password")?.trim(); // Remove any accidental spaces/newlines

			const response = await fetch(`/api/createBlog?${params}`, {
				method: "POST",
				headers: { "Authorization": encodeURIComponent(password) },
			});


			const data = await response.json();
			if (response.ok) setMessage("Blog created successfully!");
			else setMessage(`Error: ${data.message}`);
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Create Blog</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" placeholder="Title" onChange={handleChange} required />
				<br /><br />
				<input type="text" name="subtitle" placeholder="Subtitle" onChange={handleChange} required />
				<br /><br />
				<input type="text" name="tagline" placeholder="Tagline" onChange={handleChange} required />
				<br /><br />
				<textarea name="content" placeholder="Content" onChange={handleChange} required />
				<br /><br />
				<input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
				<br /><br />
				<button type="submit" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}


export function CreateTag() {
	return (<div>
		CreateTag
	</div>);
}

export function CreateImage() {
	return (<div>
		CreateImage
	</div>);
}
