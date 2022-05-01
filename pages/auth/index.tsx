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
	const [user, setUser] = useState({})

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	const onSubmit = async (user: TelegramUser) => setUser(user)

	useEffect(() => {
		setLoading(true)
		const submit = async () => {
			try {
				const res = await fetch('/api/sendOtp', {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
					credentials: 'same-origin',
					body: JSON.stringify(user)
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

		Object.keys(user).length !== 0 && submit()
	}, [user])

	return <div className={s.wrapper}>
		<TelegramLoginButton
			botName="nootskz_bot"
			dataOnauth={user => onSubmit(user)}
			requestAccess={false}
		/>
		<div className="spacer"></div>
		{ loading && 
			<FiLoader />
		}
	</div>
}

export default Cart

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
