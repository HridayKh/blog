export async function updateBlog(env, queryParams) {
	const updateData = {};
	const allowedColumns = ["title", "subtitle", "tagline", "content", "tags", "archived"];
	for (const key of allowedColumns) {
		if (queryParams[key] !== undefined) {
			updateData[key] = queryParams[key];
		}
	}
	if (Object.keys(updateData).length === 0) {
		return new Response(JSON.stringify({ message: "No valid fields to update" }), {
			headers: { "content-type": "application/json" },
			status: 400
		});
	}

	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?id=eq.${queryParams.id}`, {
		method: "PATCH",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(updateData)
	});
	return new Response(JSON.stringify({ message: "successful" }), {
		headers: { "content-type": "application/json" },
	});

}
export async function updateTag(env, queryParams) {
	const updateData = {};
	const allowedColumns = ["name", "hex"];
	for (const key of allowedColumns) {
		if (queryParams[key] !== undefined) {
			updateData[key] = queryParams[key];
		}
	}
	if (Object.keys(updateData).length === 0) {
		return new Response(JSON.stringify({ message: "No valid fields to update" }), {
			headers: { "content-type": "application/json" },
			status: 400
		});
	}
	updateData["hex"] = `#${updateData["hex"]}`;
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/tags?id=eq.${queryParams.id}`, {
		method: "PATCH",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(updateData)
	});
	return new Response(JSON.stringify({ message: "successful" }), {
		headers: { "content-type": "application/json" },
	});
}
