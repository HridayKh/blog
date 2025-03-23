import { Blogs } from "./blogs";

export default {
	fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api")) {
			const [, route] = url.pathname.split("/").filter(Boolean);
			const routeHandlers = {
				test: handleTest,
				default: (() => {
					return Response.json({
						message: "Unknown /api route",
						path: url.pathname,
					});
				}),
			};
			const handler = routeHandlers[route] || routeHandlers.default;
			const queryParams = Array.from(url.searchParams.entries());
			return handler(request, env, url, queryParams);
		}
		return env.ASSETS.fetch(request);
	},
};

function handleTest(request, env, url, queryParams) {
	const x = Blogs(env).getBlogCount();
	return Response.json({
		message: `Count: ${x}`,
		queryParams,
	});
}