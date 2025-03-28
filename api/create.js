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
export async function uploadToOCI(file, env, queryParams) {
    const resp2 = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/images?select=id`, {
        method: "HEAD",
        headers: {
            "apikey": env.VITE_SUPABASE_ANON_KEY,
            "Prefer": "count=exact"
        }
    });

    const contentRange = resp2.headers.get("content-range");
    const totalCount = contentRange ? parseInt(contentRange.split("/")[1], 10) : 0;

    const fileExt = file.name.split(".").pop() || "";
    const objectName = `i${totalCount + 1}.${fileExt}`;
    
    try {
        const response = await fetch(`${env.VITE_OCI_PAR_URL}/${encodeURIComponent(objectName)}`, {
            method: "PUT",
            headers: {
                "Content-Type": file.type || "application/octet-stream"
            },
            body: await file.arrayBuffer(),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unknown error");
            return new Response(JSON.stringify({ error: "Failed to upload", details: errorText }), {
                headers: { "content-type": "application/json" },
            });
        }

        const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/images`, {
            method: "POST",
            headers: {
                "apikey": env.VITE_SUPABASE_ANON_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: `i${totalCount + 1}`,
                name: queryParams.name || file.name,
                alt: queryParams.alt || queryParams.name || file.name,
                url: `${env.VITE_OCI_URL}/${objectName}`,
            })
        });

        return new Response(JSON.stringify({ message: "successful" }), {
            headers: { "content-type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Network error during upload", details: error.message }), {
            headers: { "content-type": "application/json" },
        });
    }
}
