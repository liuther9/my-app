import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"
import { supabase } from "../../utils/supabaseClient"
import s from './cart.module.scss'

type Props = {
	user: User,
	loggedIn: boolean,
}

const Profile: NextPage<Props> = ({ user, loggedIn }) => {
	const [street, setStreet] = useState('')
	const [building, setBuilding] = useState('')
	const [appartment, setAppartment] = useState('')
	const [phone, setPhone] = useState('')

	{console.log(user)}
	return <div className={s.wrapper}>
		<form>
			<input type='text' value={street} onChange={e => setStreet(e.target.value)} placeholder="Улица"/>
			<div className="spacer"></div>
			<div className={s.address_details}>
				<input type='text' value={building} onChange={e => setBuilding(e.target.value)} placeholder="Дом"/>
				<div className="spacer"></div>
				<input type='text' value={appartment} onChange={e => setAppartment(e.target.value)} placeholder="Квартира"/>
			</div>
			<div className="spacer"></div>
			<input type='phone' value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон"/>
			<div className="spacer"></div>
			<button>Заказать</button>
		</form>
	</div>
}

export default Profile

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (!user) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			}
		}
	}
	return {
		props: {
			user,
			loggedIn: !!user,
		}
	}
}
