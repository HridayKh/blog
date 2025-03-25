export async function getBlogCount(request, env, queryParams) {
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?select=id`, {
		method: "HEAD",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Prefer": "count=exact",
		}
	});

	const contentRange = resp.headers.get("content-range");
	const totalCount = contentRange ? contentRange.split("/")[1] : 0;

	return new Response(JSON.stringify({ count: totalCount }), {
		headers: {
			"content-type": "application/json",
		},
	});

}
