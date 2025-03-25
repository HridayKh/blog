import { getBlogCount, getBlogsByDate, getBlogsByTags, getSpecificBlog } from "./get.js";
import { createBlog, createTag } from "./create.js";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			const route = url.pathname.replace(/^\/api\/|\/$/g, "");

			const routeHandlers = {
				blogCount: getBlogCount,
				blogsByDate: getBlogsByDate,
				SpecificBlog: getSpecificBlog,
				blogsByTags: getBlogsByTags,
				createBlog: createBlog,
				createTag: createTag,
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