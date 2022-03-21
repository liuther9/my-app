import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	const { user_id, payment_type, address, order_list, total } = req.body
	
	//AUTHORIZATION
	const JWT = req.headers.authorization
	supabase.auth.setAuth(JWT ? JWT : '')

	//ADD NEW ORDER
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

	//SEND ORDER INFO TO TELEGRAM
	const order = data && data[0]
	const user_info = await supabase.from('USER_INFO').select('address, phone').eq('id', order.address).then(res => res.data)
	const user_phone = user_info ? user_info[0].phone : {}
	const user_address = user_info ? user_info[0].address : {}
	const { building, street, appartment } = user_address

	const sendMessage = `
		${order.order_list?.map((item: { name: string; quantity: string | number; }) => {
			return `Товар: ${item.name} ${item.quantity} шт.%0A`
			})}
		Общая сумма: ${order.total}%0A
		Адрес: ${street + ' ' + building + ', ' + (appartment && ('квартира ' + appartment))}%0A
		Телефон: ${user_phone}%0A
		Способ оплаты: ${order.payment_type}%0A
		Статус оплаты:${order.payed?'Оплачено':'Не оплачено'}
	`

	await fetch(`https://api.telegram.org/bot5095347305:AAHUpQYNmkqlYIj2-UEq-8FjNZvrVnru-9s/sendMessage?chat_id=695738150&text=${sendMessage}`)

	res.send(data)
}