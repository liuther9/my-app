import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { FormEvent, useState } from "react"
import useSWR from "swr"
import RadioButton from "../../components/RadioButton"
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
	const [selectedRadio, setSelectedRadio] = useState('')

	const newAddress = 'new'

  const handleRadioChange = (item: string) => setSelectedRadio(item)

	const fetcher = (url: string) => fetch(url + `?id=${user.id}`).then((res) => res.json());

	const { data, error } = useSWR('/api/address', fetcher)

	const onSubmit = async () => {
		if(selectedRadio === newAddress) {
			const res = await fetch('/api/address', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				credentials: 'same-origin',
				body: JSON.stringify({ user_id: user.id, address: { street, building, appartment }, phone })
			})
		}
	}

	return <div className={s.wrapper}>
		<div className={s.container}>

			<div className={s.address_list}>
				<h3>Выберите адрес:</h3>
				{data?.map((address: any) => 
					<div className={s.address_list_item} key={address.id}>
						<RadioButton
							label={`${address.address.street} ${address.address.building}, квартира ${address.address.appartment}`}
							value={selectedRadio === address.id}
							name='radio'
							onChange={() => handleRadioChange(address.id)}
						/>
					</div>
				)}
				<RadioButton
					label='Новый адрес'
					value={selectedRadio === newAddress}
					name='radio'
					onChange={() => handleRadioChange(newAddress)}
				/>
			</div>

			<div className="spacer"></div>

			<form onSubmit={onSubmit} className={selectedRadio === 'new' ? s.form + ' ' + s.form_open : s.form}>
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
				<button
					className={s.button}
					onClick={onSubmit}
					disabled={(selectedRadio === newAddress && (street === '' || building === '' || phone === '' || appartment === '')) || selectedRadio === ''}
				>
					Далее
				</button>
			</form>
			
		</div>
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
