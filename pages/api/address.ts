import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	if (!req.cookies.authSession) res.status(401).end('unauthorized')

	if(req.method === 'POST') {
		const { street, building, appartment, phone, user_id } = req.body

		const { data, error } = await supabase.from('address').insert(
			[
				{ user_id, street, building, appartment, phone }
			],
			{ returning: "minimal" },
		)
	
		if(error) return res.status(400).json({ error: error.message })

		res.send(data)
	}

	if(req.method === 'GET') {
		const { data, error } = await supabase.from('address').select('*').eq('user_id', req.query.id)

		if(error) return res.status(400).json({ error: error.message })

		res.send(data)
	}
}