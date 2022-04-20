import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../utils/supabaseClient"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	const { user_id, payment_type, address, order_list, total } = req.body
	
	//AUTHORIZATION
	if (!req.cookies.authSession) res.status(401).end('unauthorized')

	//ADD NEW ORDER
	const {data, error} = await supabase.from('order').insert(
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
	const user_address = await supabase.from('address').select('street, building, appartment, phone').eq('id', address).then(res => res.data)
	const u_address = user_address ? user_address[0] : {}
	const {phone, building, street, appartment} = u_address

	const sendMessage = `
		Товар: ${order.order_list?.map((item: { name: string; quantity: string | number; }) => {
			return `%0A${item.name} ${item.quantity} шт.`
			})}%0A%0A
		Общая сумма: ${order.total}%0A
		Адрес: ${street + ' ' + building + ', ' + (appartment && ('квартира ' + appartment))}%0A
		Телефон: ${phone}%0A
		Способ оплаты: ${order.payment_type}%0A
		Статус оплаты:${order.payed?'Оплачено':'Не оплачено'}
	`

	const botToken = process.env.BOT_TOKEN
	const chat_id = '5201903283'
	const chat_id_1 = '695738150'

	await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chat_id}&text=${sendMessage}`)

	res.send(data)
}