import { NextApiRequest, NextApiResponse } from "next"
import Jwt from "jsonwebtoken";
import  { setCookies } from 'cookies-next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN || ''
	const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN || ''
	const refreshToken = req.cookies.refreshToken;
	
	if (!refreshToken) return res.status(403).send({ message: 'Refresh token not found, login again' });

	Jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
		if (!err) {
			const accessToken = Jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
				expiresIn: '24h'
			});
			setCookies('accessToken', accessToken, {
				req,
				res,
				expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
				sameSite: true,
				httpOnly: true
			})
			setCookies('authSession', true, {
				req,
				res,
				expires: new Date(new Date().getTime() + 30 * 1000),
				sameSite: 'strict'
			})
			return res.status(200)
		} else {
			return res.status(403).send({
				success: false,
				msg: 'Invalid refresh token'
			});
		}
	});
}