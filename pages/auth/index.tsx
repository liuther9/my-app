import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { FormEvent, useState } from "react"
import { supabase } from "../../utils/supabaseClient"
import s from './auth.module.scss'
import { ImSpinner } from 'react-icons/im'

type Props = {
	user: User,
	loggedIn: boolean,
}

const Cart: NextPage<Props> = ({ user, loggedIn }) => {
	const [email, setEmail] = useState('')
	const [linkSent, setLinkSent] = useState(false)
	const [loading, setLoading] = useState(false)

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		let { user, error, session } = await supabase.auth.signIn({ email })
		if(error === null) {
			setLinkSent(true)
			setLoading(false)
		}
		console.log('NEW USER', user, error, session)
	}

	return <div className={s.wrapper}>
		{ loading && !linkSent && <ImSpinner size={30}/> }
		{ !linkSent && !loading &&
			<form onSubmit={submitForm}>
				<label>Введите почту чтобы продолжить</label>
				<input type='email' value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" spellCheck="false" autoCorrect="off" placeholder="Почта / Логин" required/>
				<div className={s.spacer}></div>
				<button>Далее</button>
			</form>
		}
		{ linkSent && !loading &&
			<p>Ссылка для входа в профиль отправлена. Проверьте вашу почту...</p>
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
