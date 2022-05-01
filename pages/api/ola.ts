import { NextApiRequest, NextApiResponse } from "next"
var js2xmlparser = require("js2xmlparser");

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
	const request = {
		Request: {
			Operation: 'CreateOrder',
			Language: 'RU',
			Order: {
				OrderType: 'Purchase',
				Merchant: 'NOOTS03013416',
				Amount: 50,
				Currency: 398,
				Description: 'xxxxxxxx',
				ApproveURL: 'https://www.noots.kz',
				CancelURL: '/testshopPageReturn.jsp',
				DeclineURL: '/testshopPageReturn.jsp',
				AddParams: {
					"FA-DATA": `Phone=${22211444}`,
					OrderExpirationPeriod: 30
				},
			}
		}
	};

	const xmlRequest = js2xmlparser.parse('TKKPG', request);
	try {
		const response = await fetch('https://epaypost.fortebank.com/Exec', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/xml'
				},
				body: xmlRequest
		})
		res.status(200).send('GOOD')
	} catch (error) {
		res.status(400).send(error)
	}
}