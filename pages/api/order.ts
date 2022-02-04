import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	const { user_id, payed, address, order_list } = req.body

	const {data, error} = await supabase.from('ORDERS').insert(
		[
			{
				user_id,
				order_list,
				payed,
				address,
			}
		],
		{ returning: 'minimal' },
	)

	if(error) return res.status(400).json({ error: error.message })

	res.send(data)
}