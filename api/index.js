import { getBlogCount, getBlogsByDate, getBlogsByTags, getImageList, getBlogById, getTags } from "./get.js";
import { createBlog, createTag, uploadToOCI } from "./create.js";
import { updateBlog, updateImage, updateTag } from "./update.js";
import { getImage } from "./get";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const route = url.pathname.replace(/^\/api\/|\/$/g, "");
		if (["createBlog", "createTag", "updateBlog", "updateTag", "updateImage", "uploadImage"].includes(route)) {
			const auth = await isAuthenticated(request, env);
			if (!auth) {
				return new Response(JSON.stringify({ error: "Unauthorized" }), {
					status: 403, headers: {
						"content-type": "application/json"
					}
				});
			}
		}
		if (request.method === "POST" && route === "uploadImage") {
			const contentType = request.headers.get("content-type") || "";

			if (!contentType.startsWith("multipart/form-data")) {
				return new Response(JSON.stringify({ error: "Invalid Content-Type" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}

			try {
				const formData = await request.formData();
				const file = formData.get("file");

				if (!(file instanceof File)) {
					return new Response(JSON.stringify({ error: "No valid file uploaded" }), {
						status: 400,
						headers: { "Content-Type": "application/json" },
					});
				}
				return await uploadToOCI(file, env, Object.fromEntries(url.searchParams));

			} catch (error) {
				return new Response(JSON.stringify({ error: "Upload failed", details: error.message }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}
		}
		if (url.pathname.startsWith("/api/")) {
			const routeHandlers = {
				listBlogs: getBlogsByDate, // DONE
				listTags: getTags, // DONE
				listImages: getImageList, // DONE

				imageInfo: getImage, // TODO

				countBlogs: getBlogCount, // TODO
				blogById: getBlogById, // DONE
				blogsByTags: getBlogsByTags, // TODO

				createBlog: createBlog, // DASH TODO
				createTag: createTag, // DASH TODO
				// CREATE IMAGE // DASH TODO

				updateBlog: updateBlog, // DASH TODO
				updateTag: updateTag, // DASH TODO
				updateImage: updateImage, // DASH TODO

				default: async () =>
					new Response(
						JSON.stringify({
							message: "Unknown /api route",
							path: url.pathname,
						}),
						{ headers: { "Content-Type": "application/json" }, status: 404 }
					),
			};
			const handler = routeHandlers[route] || routeHandlers.default;
			const queryParams = Object.fromEntries(url.searchParams);
			return await handler(env, queryParams);
		}

		return env.ASSETS.fetch(request);
	},
};

async function isAuthenticated(request, env) {
	const authHeader = request.headers.get("Authorization");

	if (!authHeader) return false;

	const data = new TextEncoder().encode(authHeader);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
	return hashHex.trim() == `${env.ADMIN_PASSWORD}`.trim();
}
