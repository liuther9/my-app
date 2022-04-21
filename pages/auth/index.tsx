import { useEffect, useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from 'next/router'
import { getCookie } from "cookies-next"
import { FiLoader } from 'react-icons/fi'
import s from './auth.module.scss'
import TelegramLoginButton, { TelegramUser } from "../../components/TelegramLoginButton"

const Cart: NextPage = () => {
	const [loading, setLoading] = useState(true)
  const router = useRouter()

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	const onSubmit = async (user: TelegramUser) => {
		const { auth_date, first_name, id, username, hash } = user
		setLoading(true)
		try {
			const res = await fetch('/api/sendOtp', {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				credentials: 'same-origin',
				body: JSON.stringify({ auth_date, first_name: first_name || '', id, username, hash })
			}).then(res => res.json())
			if (res.msg && res.msg === 'Device verified') {
				router.push('/cart')
			} else if (res.msg && res.msg === 'Incorrect user') {
				setLoading(false)
				alert('Не удалось подключиться')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return <div className={s.wrapper}>
		<TelegramLoginButton
			botName="nootskz_bot"
			dataOnauth={user => onSubmit(user)}
			usePic={true}
		/>
		<div className="spacer"></div>
		{ loading && 
			<FiLoader />
		}
	</div>
}

export default Cart

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	getCookie('authSession')
	if (getCookie('authSession', { req, res })) {
		return {
			redirect: {
				destination: '/cart',
				permanent: false,
			}
		}
	}

	return {
		props: {}
	}
}
