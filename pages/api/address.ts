import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import cookie from 'cookie'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	// GET TOKEN
  let cookies = cookie.parse(req.headers.cookie || '')
	let token = cookies['sb-access-token']

	if(req.method === 'POST') {
		const { address, phone, user_id } = req.body
		supabase.auth.setAuth(token)

		const { data, error } = await supabase.from('USER_INFO').insert(
			[
				{ user_id, address, phone }
			],
			{ returning: "minimal" },
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