import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { phone, token } = req.body
	let { session, error } = await supabase.auth.verifyOTP({
		phone: phone,
		token: token,
	})
	if (error) res.status(401).end(error)
	res.status(200).send(session)
	// supabase.auth.api.setAuthCookie(req, res)
}