import { getBlogCount } from "./get.js";

export async function createBlog(env, queryParams) {
	const COUNT = await getBlogCount(request, env, queryParams);
	const countData = await COUNT.json();
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs`, {
		method: "POST",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			{
				id: `b${parseInt(countData.count) + 1}`,
				title: queryParams.title,
				subtitle: queryParams.subtitle,
				tagline: queryParams.tagline,
				content: queryParams.content,
				publish_date: new Date().toISOString().split('T')[0],
				tags: queryParams.tags ? queryParams.tags.split(",") : []
			})
	});

	return new Response("{\"message\":\"successful\"}", {
		headers: {
			"content-type": "application/json",
		},
	});

}
export async function createTag(env, queryParams) {
	const resp2 = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/tags?select=id`, {
		method: "HEAD",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Prefer": "count=exact"
		}
	});

	const contentRange = resp2.headers.get("content-range");
	const totalCount = contentRange ? parseInt(contentRange.split("/")[1], 10) : 0;

	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/tags`, {
		method: "POST",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json",
			"Prefer": "return=representation"  // This ensures Supabase returns the inserted row
		},
		body: JSON.stringify({
			id: `t${totalCount + 1}`,
			name: queryParams.name,
			hex: `#${queryParams.hex}`
		})
	});

	return new Response(JSON.stringify({ message: "successful" }), {
		headers: { "content-type": "application/json" },
	});

}
