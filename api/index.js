export default {
  fetch(request, env) {
    const url = new URL(request.url);

	console.log(env.VITE_SUPABASE_URL)

    if (url.pathname.startsWith("/api")) {

      return Response.json({
        name: "Cloudflare",
      });
	  
    }

    return env.ASSETS.fetch(request);
  },
}
