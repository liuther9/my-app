import { supabase } from "../utils/supabaseClient";

const session = supabase.auth.session()

export const fetchApi = async (url: string, body: {}) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `${session?.access_token}` }),
		credentials: 'same-origin',
		body: JSON.stringify(body)
	})
	return res
}
