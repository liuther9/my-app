import { NextApiRequest, NextApiResponse } from "next"
import sha256 from 'crypto-js/sha256';
import HmacSHA256 from "crypto-js/hmac-sha256";
import hex from 'crypto-js/enc-hex'
import Jwt from "jsonwebtoken";
import  { setCookies } from 'cookies-next'
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { auth_date, first_name, id, username, hash } = req.body;
	const botToken = sha256('5095347305:AAHUpQYNmkqlYIj2-UEq-8FjNZvrVnru-9s')
	const hmacData = HmacSHA256(`auth_date=${auth_date}\nfirst_name=${first_name}\nid=${id}\nusername=${username}`, botToken)
	const hashedData = hex.stringify(hmacData)

	const JWT_AUTH_TOKEN = 'j+/yZnChcsWFI5fG2ziRn1vWzDy6gE3K+AK8YfiV3nM='
	const JWT_REFRESH_TOKEN = '+6+Ib8y8IzAzSq+lEVxF85be6TjzgWWM5KB8z5ysLwU='

	const accessToken = Jwt.sign({ user_id: id }, JWT_AUTH_TOKEN, { expiresIn: '1d' });
	const refreshToken = Jwt.sign({ user_id: id }, JWT_REFRESH_TOKEN, { expiresIn: '1y' });

	// const refreshTokenDb = await supabase.from('refresh_tokens').select('*').eq('refresh_token', refreshToken)
	// console.log(refreshTokenDb)
	
	// if(refreshTokenDb.error) return res.status(400).json({ error: refreshTokenDb.error.message })
	// if (refreshTokenDb.data?.length === 0) {
	// 	const { data, error } = await supabase.from('refresh_tokens').insert(
	// 		[
	// 			{ refresh_token: refreshToken }
	// 		],
	// 		{ returning: "minimal" },
	// 	)
	// 	if(error) return res.status(400).json({ error: error.message })
	// }

	const checkUser = await supabase.from('users').select('*').eq('username', username)
	if (checkUser.data?.length === 0) {
		const user = await supabase.from('users').insert(
			[
				{ username, auth_date, user_id: id }
			],
			{ returning: 'minimal' }
		)
	}

	setCookies('accessToken', accessToken, {
		req,
		res,
		expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
		sameSite: true,
		httpOnly: true
	})
	setCookies('refreshToken', refreshToken, {
		req,
		res,
		expires: new Date(new Date().getTime() + 31557600000),
		sameSite: 'strict',
		httpOnly: true
	})
	setCookies('authSession', true, {
		req,
		res,
		expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
		sameSite: 'strict'
	})
	setCookies('refreshTokenID', true, {
		req,
		res,
		expires: new Date(new Date().getTime() + 31557600000),
		sameSite: 'strict'
	})
	res.status(202).send({ msg: 'Device verified' });
}