import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phone } = req.body
	let { user, error } = await supabase.auth.signIn({
		phone: phone,
	})

	if (error) res.status(401).end(error)

	res.status(200).send(user)
	supabase.auth.api.setAuthCookie(req, res)
}