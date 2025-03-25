import { getBlogCount } from "./blogs.js";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			const route = url.pathname.replace(/^\/api\/|\/$/g, ""); // Extract clean route name

			const routeHandlers = {
				count: getBlogCount,
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
			return await handler(request, env, queryParams);
		}

		return env.ASSETS.fetch(request);
	},
};