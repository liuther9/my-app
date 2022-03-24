import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import jwt from 'jsonwebtoken';
import sha256 from 'crypto-js/sha256';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex'
import { serialize } from 'cookie'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if(req.method === 'POST') {
		const { auth_date, first_name, id, username, hash } = req.body

		// CHECK USER
		const data_check_string = `auth_date=${auth_date}\nfirst_name=${first_name}\nid=${id}\nusername=${username}`
		const secret_key = sha256(process.env.BOT_TOKEN ? process.env.BOT_TOKEN : '')
		if (hmacSHA256(data_check_string, secret_key).toString(Hex) == hash) {
			res.status(401)
			res.end('Data is NOT from Telegram')
		}
		try {
			const user = await supabase.from('USERS').select('*').eq('id', id)
			// TOKEN SIGN
			if (!user.data) {
				const token = jwt.sign(id, process.env.JWT_SECRET ? process.env.JWT_SECRET : '', { expiresIn: 60*60*24 });
				res.status(200).setHeader('Set-Cookie', serialize('tgToken', token, { path: "/" }));
			}
			if ( (+(new Date()) - auth_date) > 60*60*24) {
				const token = jwt.sign(id, process.env.JWT_SECRET ? process.env.JWT_SECRET : '', { expiresIn: 60*60*24 });
				res.status(200).setHeader('Set-Cookie', serialize('tgToken', token, { path: "/" }));
			}
		} catch (error) {
			res.status(402).send(error)
		}
		
		// UPDATE USER
		try {
			await supabase.from('USERS').upsert({
				id,
				username,
				first_name,
				auth_date
			}, { returning: 'minimal' })
		} catch (error) {
			res.status(403).send(error)
		}
	}
	
	// supabase.auth.api.setAuthCookie(req, res)
}