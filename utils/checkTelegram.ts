import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Hex from 'crypto-js/enc-hex'

const checkTelegram = ({ auth_date, first_name, username, hash, id }: {id: any, auth_date: any, first_name: any, username: any, hash: any}) => {
	const data_check_string = `auth_date=${auth_date}\nfirst_name=${first_name}\nid=${id}\nusername=${username}`
	const secret_key = sha256(process.env.NEXT_PUBLIC_BOT_TOKEN ? process.env.NEXT_PUBLIC_BOT_TOKEN : '')
	console.log(hmacSHA512(data_check_string, secret_key).toString(Hex))
	if (hmacSHA512(data_check_string, secret_key).toString(Hex) == hash) {
		console.log('LOOGGGGED IN')
	}
}

export default checkTelegram