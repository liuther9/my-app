import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/setCookie";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = req.headers.token
	const { data, error } = await supabase.auth.api.getUser(typeof token === 'string' ? token : '')

	if(error) return res.status(401).json({ error: error.message })

	setCookie(res, 'token', data)

	return res.end(res.getHeader('Set-Cookie'))
}
