import { getBlogCount, getBlogsByDate, getBlogsByTags, getImageList, getSpecificBlog, getTags } from "./get.js";
import { createBlog, createTag, uploadToOCI } from "./create.js";
import { updateBlog, updateTag } from "./update.js";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (request.method === "POST" && new URL(request.url).pathname === "/api/uploadImage") {
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
			const route = url.pathname.replace(/^\/api\/|\/$/g, "");
			const routeHandlers = {
				blogCount: getBlogCount,
				blogsByDate: getBlogsByDate,
				SpecificBlog: getSpecificBlog,
				blogsByTags: getBlogsByTags,
				tagList: getTags,
				imageList: getImageList,

				createBlog: createBlog,
				createTag: createTag,

				updateBlog: updateBlog,
				updateTag: updateTag,

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