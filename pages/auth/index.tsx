import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { FormEvent, useState } from "react"
import { supabase } from "../../utils/supabaseClient"
import s from './cart.module.scss'

type Props = {
	user: User,
	loggedIn: boolean,
}

const Cart: NextPage<Props> = ({ user, loggedIn }) => {
	const [email, setEmail] = useState('')
	const [linkSent, setLinkSent] = useState(false)

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let { user, error } = await supabase.auth.signIn({ email })
		error === null && setLinkSent(true)
		console.log('NEW USER', user, error)
	}

	return <div className={s.wrapper}>
		{ !linkSent &&
			<form onSubmit={submitForm}>
				<input type='text' value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" spellCheck="false" autoCorrect="off" placeholder="Почта / Логин"/>
				<div className={s.spacer}></div>
				<button>sign up</button>
			</form>
		}
		{ linkSent &&
			<div>Ссылка для входа в профиль отправлена. Проверьте вашу почту...</div>
		}
	</div>
}

export default Cart

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (user) {
		return {
			redirect: {
				destination: '/cart',
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
