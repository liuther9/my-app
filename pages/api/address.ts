import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	if(req.method === 'POST') {
		const address = req.body.address
		const phone = req.body.phone
		const user_id: string = req.body.user_id
	
		const { data, error } = await supabase.from('USER_INFO').insert(
			[
				{ user_id, address, phone }
			],
			{ returning: 'minimal' },
		)
	
		if(error) return res.status(400).json({ error: error.message })
	
		res.send(data)
	}

	if(req.method === 'GET') {
		const { data, error } = await supabase.from('USER_INFO').select('*').eq('user_id', req.query.id)

		if(error) return res.status(400).json({ error: error.message })

		res.send(data)
	}
}