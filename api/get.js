export async function getBlogCount(env, queryParams) {
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?select=id,archived&archived=neq.true`, {
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
export async function getBlogsByDate(env, queryParams) {
	const limit = parseInt(queryParams.limit, 10) || 10;
	const offset = parseInt(queryParams.offset, 10) || 0;
	
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?order=publish_date.desc&limit=${limit}&offset=${offset}&archived=neq.true`, {
		method: "GET",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY
		}
	});

	const data = await resp.json();

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});
}
export async function getBlogById(env, queryParams) {
	const id = queryParams.id; // id is in format b1, b2, etc
	if (id === undefined || id === "" || id === null || /^b\d+$/.test(id) === false) {
		return new Response(JSON.stringify({ message: "invalid or missing blog ID" }), {
			headers: {
				"content-type": "application/json",
			},
			status: 400,
		});
	}
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?id=eq.${id}`, {
		method: "GET",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY
		}
	});

	const data = await resp.json();

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});

}
export async function getBlogsByTags(env, queryParams) {
	const tags = queryParams.tags.split(",");
	const andOr = queryParams.andOr || "and";
	const limit = parseInt(queryParams.limit, 10) || 10;
	const offset = parseInt(queryParams.offset, 10) || 0;
	

	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/rpc/filter_by_json_values_${andOr}?limit=${limit}&offset=${offset}`, {
		method: "POST",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ input_values: tags })
	});

	const data = await resp.json();

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});

}
export async function getTags(env, queryParams) {
	const limit = queryParams.limit || 10;
	const offset = queryParams.offset || 0;
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/tags?order=id.desc&name=neq.[DELETED]`, {
		method: "GET",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY
		}
	});

	const data = await resp.json();

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});
}
export async function getImageList(env, queryParams) {
	const limit = parseInt(queryParams.limit, 10) || 10;
	const offset = parseInt(queryParams.offset, 10) || 0;

	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/images?order=id.desc&name=neq.[DELETED]`, {
		method: "GET",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY
		}
	});

	const data = await resp.json();

	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});
}