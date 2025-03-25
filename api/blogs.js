export default async function getBlogsCount(env) {

	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?select=id`, {
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
