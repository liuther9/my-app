import { GetServerSideProps, NextPage } from "next"
import { useRouter } from 'next/router'
import { User } from "@supabase/supabase-js"
import s from './auth.module.scss'
import TelegramLoginButton, { TelegramUser } from "../../components/TelegramLoginButton"
import { getCookie } from "cookies-next"

type Props = {
	user: User,
	loggedIn: boolean,
}

const Cart: NextPage<Props> = () => {
  const router = useRouter()

	const onSubmit = async (user: TelegramUser) => {
		const { auth_date, first_name, id, username, hash } = user

		const res = await fetch('/api/sendOtp', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			credentials: 'same-origin',
			body: JSON.stringify({ auth_date, first_name, id, username, hash })
		})

		const responseData: any = await res.json()

		if (responseData.msg === 'Device verified') router.push('/cart')
	}

	return <div className={s.wrapper}>
		<TelegramLoginButton
			botName="nootskz_bot"
			dataOnauth={onSubmit}
			usePic={true}
		/>
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
