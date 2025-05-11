import React, { useState, useEffect } from "react";

export function CreateBlog() {
	const [tagList, setTagList] = useState([]);
	useEffect(() => {
		setLoading(true);
		fetch("/api/listTags")
			.then((res) => res.json())
			.then(setTagList)
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []); // empty array to run once
	const [formData, setFormData] = useState({
		title: "",
		subtitle: "",
		tagline: "",
		content: "",
		tags: "",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Check if at least one tag is selected
		if (formData.tags.trim() === "") {
			setMessage("You must select at least one tag.");
			setLoading(false);
			return; // Prevent form submission
		}

		try {
			const formattedTags = formData.tags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag !== "")
				.join(",");
			const params = new URLSearchParams({
				title: formData.title,
				subtitle: formData.subtitle,
				tagline: formData.tagline,
				content: formData.content,
				tags: formattedTags,
			}).toString();
			const password = sessionStorage.getItem("password")?.trim();
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
				{/*<input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />*/}
				<label>Choose Tags:</label>
				<br />
				<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
					{tagList.map((tag) => {
						const selectedIds = formData.tags.split(",").filter((id) => id);
						const isSelected = selectedIds.includes(tag.id.toString());
						return (
							<label
								key={tag.id}
								style={{
									backgroundColor: tag.hex,
									color: "#000",
									border: isSelected ? "5px solid #505050" : "0px solid #000",
									borderRadius: "12px",
									padding: "5px 10px",
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									value={tag.id}
									checked={isSelected}
									onChange={(e) => {
										const current = formData.tags.split(",").filter((t) => t);
										const updated = e.target.checked
											? [...current, tag.id.toString()]
											: current.filter((t) => t !== tag.id.toString());
										setFormData((prev) => ({ ...prev, tags: updated.join(",") }));
									}}
									style={{ display: "none" }}
								/>
								{tag.name}
							</label>
						);
					})}
				</div>

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
	const [formData, setFormData] = useState({
		name: "",
		color: "",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const params = new URLSearchParams({
				name: formData.title,
				color: formData.subtitle,
			}).toString();
			const password = sessionStorage.getItem("password")?.trim();
			const response = await fetch(`/api/createTag?${params}`, {
				method: "POST",
				headers: { "Authorization": encodeURIComponent(password) },
			});
			const data = await response.json();
			if (data.stat == "ok") setMessage("Blog created successfully!");
			else setMessage(`Error: ${data}`);
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
				{/*<input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} />*/}
				<label>Choose Tags:</label>
				<br />
				<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
					{tagList.map((tag) => {
						const selectedIds = formData.tags.split(",").filter((id) => id);
						const isSelected = selectedIds.includes(tag.id.toString());
						return (
							<label
								key={tag.id}
								style={{
									backgroundColor: tag.hex,
									color: "#000",
									border: isSelected ? "5px solid #505050" : "0px solid #000",
									borderRadius: "12px",
									padding: "5px 10px",
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									value={tag.id}
									checked={isSelected}
									onChange={(e) => {
										const current = formData.tags.split(",").filter((t) => t);
										const updated = e.target.checked
											? [...current, tag.id.toString()]
											: current.filter((t) => t !== tag.id.toString());
										setFormData((prev) => ({ ...prev, tags: updated.join(",") }));
									}}
									style={{ display: "none" }}
								/>
								{tag.name}
							</label>
						);
					})}
				</div>

				<br /><br />
				<button type="submit" disabled={loading}>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}

export function CreateImage() {
	return (<div>
		CreateImage
	</div>);
}
