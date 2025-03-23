import { createClient } from '@supabase/supabase-js'

export class Blogs {
	constructor(env) {
		this.supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY)
	}

	static async getBlogCount() {
		const { data, error } = await supabase
			.from('blogs', {head: true, count: 'exact'})
			.select('id')
		if (error) {
			console.error(error)
			return
		}
		console.log(data)
	}
}