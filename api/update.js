export async function updateBlog(env, queryParams) {
    const updateData = {};
    const allowedColumns = ["title", "subtitle", "tagline", "content", "tags", "archived"];

    for (const key of allowedColumns) {
        if (queryParams[key] !== undefined) {
            updateData[key] = queryParams[key];
        }
    }

    // 🚨 Check for missing ID
    if (!queryParams.id) {
        return new Response(JSON.stringify({ message: "Missing blog ID" }), {
            headers: { "content-type": "application/json" },
            status: 400
        });
    }

    // 🚨 Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
        return new Response(JSON.stringify({ message: "No valid fields to update" }), {
            headers: { "content-type": "application/json" },
            status: 400
        });
    }

    // 🔥 Perform update request
    const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/blogs?id=eq.${queryParams.id}`, {
        method: "PATCH",
        headers: {
            "apikey": env.VITE_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    });

    // 🚨 Handle response properly
    if (!resp.ok) {
        return new Response(JSON.stringify({ message: "Update failed", error: await resp.json() }), {
            headers: { "content-type": "application/json" },
            status: resp.status
        });
    }

    return new Response(JSON.stringify({ message: "Update successful", updatedFields: updateData }), {
        headers: { "content-type": "application/json" },
        status: 200
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

    // 🚨 Check for missing ID
    if (!queryParams.id) {
        return new Response(JSON.stringify({ message: "Missing tag ID" }), {
            headers: { "content-type": "application/json" },
            status: 400
        });
    }

    // 🚨 Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
        return new Response(JSON.stringify({ message: "No valid fields to update" }), {
            headers: { "content-type": "application/json" },
            status: 400
        });
    }

    // 🔧 Ensure HEX value is correctly formatted
    if (updateData.hex && !/^#?[0-9A-Fa-f]{6}$/.test(updateData.hex)) {
        return new Response(JSON.stringify({ message: "Invalid hex color format" }), {
            headers: { "content-type": "application/json" },
            status: 400
        });
    }

    // ✅ Add "#" if missing
    if (updateData.hex && !updateData.hex.startsWith("#")) {
        updateData.hex = `#${updateData.hex}`;
    }

    // 🔥 Perform update request
    const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/tags?id=eq.${queryParams.id}`, {
        method: "PATCH",
        headers: {
            "apikey": env.VITE_SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    });

    // 🚨 Handle response properly
    if (!resp.ok) {
        return new Response(JSON.stringify({ message: "Update failed", error: await resp.json() }), {
            headers: { "content-type": "application/json" },
            status: resp.status
        });
    }

    return new Response(JSON.stringify({ message: "Update successful", updatedFields: updateData }), {
        headers: { "content-type": "application/json" },
        status: 200
    });
}
export async function updateImage(env, queryParams) {
	const updateData = {};
	const allowedColumns = ["name", "alt", "url"];

	for (const key of allowedColumns) {
		if (queryParams[key] !== undefined) {
			updateData[key] = queryParams[key];
		}
	}

	// 🚨 Check for missing ID
	if (!queryParams.id) {
		return new Response(JSON.stringify({ message: "Missing image ID" }), {
			headers: { "content-type": "application/json" },
			status: 400
		});
	}

	// 🚨 Check if there's anything to update
	if (Object.keys(updateData).length === 0) {
		return new Response(JSON.stringify({ message: "No valid fields to update" }), {
			headers: { "content-type": "application/json" },
			status: 400
		});
	}

	// 🔥 Perform update request
	const resp = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/images?id=eq.${queryParams.id}`, {
		method: "PATCH",
		headers: {
			"apikey": env.VITE_SUPABASE_ANON_KEY,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(updateData)
	});

	// 🚨 Handle response properly
	if (!resp.ok) {
		return new Response(JSON.stringify({ message: "Update failed", error: await resp.json() }), {
			headers: { "content-type": "application/json" },
			status: resp.status
		});
	}

	return new Response(JSON.stringify({ message: "Update successful", updatedFields: updateData }), {
		headers: { "content-type": "application/json" },
		status: 200
	});
}
