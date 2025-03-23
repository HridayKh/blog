export default {
	fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api")) {
			const [, route] = url.pathname.split("/").filter(Boolean);
			const routeHandlers = {
				route1: handleRoute1,
				route2: handleRoute2,
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

function handleRoute1(request, env, url, queryParams) {
	return Response.json({
		message: "Handling /api/route1",
		resource: "route1",
		queryParams,
	});
}

function handleRoute2(request, env, url, queryParams) {
	return Response.json({
		message: "Handling /api/route2",
		resource: "route2",
		queryParams,
	});
}
