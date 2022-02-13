import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	const { user_id, payment_type, address, order_list, total } = req.body
	const JWT = req.headers.authorization
	supabase.auth.setAuth(JWT ? JWT : '')

	const {data, error} = await supabase.from('ORDERS').insert(
		[
			{
				user_id,
				order_list,
				payment_type,
				address,
				total,
			}
		],
	)

	if(error) return res.status(400).json({ error: error.message })

	const message = JSON.stringify(data)

	const sendMessage = `${data[0].order_list.map((item: { name: string; quantity: string | number; }) => 
	`${item.name} ${item.quantity} шт.%0A`)}%0A
	Общая сумма ${data[0].total}%0A
	${data[0].payed?'Оплачено':'Не оплачено'}%0A
	Способ оплаты ${data[0].payment_type}`

	fetch(`https://api.telegram.org/bot5095347305:AAHUpQYNmkqlYIj2-UEq-8FjNZvrVnru-9s/sendMessage?chat_id=695738150&text=${sendMessage}`)

	res.send(data)
}