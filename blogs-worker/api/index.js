import * as Sentry from "@sentry/cloudflare";

export default Sentry.withSentry(
	() => ({
		dsn: "https://43ab0940ee2e4178cab2bec3ca70bfe9@o4509022198431744.ingest.de.sentry.io/4509022212128848",
		tracesSampleRate: 1.0, // Adjust to control how much tracing data to collect
	}),
	{
		async fetch(request, env) {
			const url = new URL(request.url);

			if (url.pathname.startsWith("/api/")) {
				throw new Error("Test error: Sentry setup complete!");;

				return Response.json({
					name: "Cloudflare",
				});
			}

			return env.ASSETS.fetch(request);
		},
	}
);
