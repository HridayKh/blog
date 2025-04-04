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

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const queryParams = {
				...formData,
				tags: formData.tags.replace(/\s+/g, ""), // Remove spaces
			};

			const response = await fetch("/api/createBlog", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(queryParams),
			});

			const data = await response.json();
			if (response.ok) setMessage("Blog created successfully!");
			else setMessage(`Error: ${data.message}`);
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		}
	};

	return (
		<div>
			<h2>Create Blog</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" placeholder="Title" onChange={handleChange} required />
				<br/>
				<br/>
				<input type="text" name="subtitle" placeholder="Subtitle" onChange={handleChange} required />
				<br/>
				<br/>
				<input type="text" name="tagline" placeholder="Tagline" onChange={handleChange} required />
				<br/>
				<br/>
				<textarea name="content" placeholder="Content" onChange={handleChange} required />
				<br/>
				<br/>
				<input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />
				<br/>
				<br/>
				<button type="submit">Submit</button>
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
