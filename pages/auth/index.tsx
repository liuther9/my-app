import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { FormEvent, useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup'
import { supabase } from "../../utils/supabaseClient"
import s from './auth.module.scss'
import { ImSpinner } from 'react-icons/im'
import TelegramLoginButton from "../../components/TelegramLoginButton"
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import * as Yup from 'yup'

type Props = {
	user: User,
	loggedIn: boolean,
}
type Inputs = {
	phone: string,
};
interface VerifyInputs extends Inputs {
	token: string,
};

const Cart: NextPage<Props> = ({ user, loggedIn }) => {
	const [verify, setVerify] = useState(false)
	const [linkSent, setLinkSent] = useState(false)
	const [loading, setLoading] = useState(false)

	const validationSchema = Yup.object().shape({
			phone: Yup.string()
					.transform(currentValue => currentValue.replaceAll(' ', ''))
					.required('Введите телефон')
					.min(11, 'Введите телефон'),
			// password: Yup.string()
			// 		.required('Введите пароль')
			// 		.min(6, 'Не менее 6 символов')
	});
	const formOptions = {
		resolver: yupResolver(validationSchema),
	}
  const { handleSubmit, formState: { errors }, control, reset, getValues } = useForm<any>(formOptions);

	// const submitForm = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault()
	// 	setLoading(true)
	// 	let { user, error, session } = await supabase.auth.signIn({ email })
	// 	if(error === null) {
	// 		setLinkSent(true)
	// 		setLoading(false)
	// 	}
	// }

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setLoading(true)
		await fetch('/api/auth', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify(data)
		})
		setVerify(true)
		setLoading(false)
	}

	const verifySubmit: SubmitHandler<VerifyInputs> = async data => {
		setLoading(true)
		await fetch('/api/verify', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify(data)
		})
		setLoading(false)
		reset({ phone: '' })
	}
	// const saveUser = async (user: any) => {
	// 	await fetch('/api/auth', {
	// 		method: 'POST',
	// 		headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `${session?.access_token}` }),
	// 		credentials: 'same-origin',
	// 		body: JSON.stringify(user)
	// 	})
	// }

	return <div className={s.wrapper}>
		{ loading && !linkSent && <ImSpinner size={30}/> }
		{ !linkSent && !loading &&
			<form onSubmit={!verify ? handleSubmit(onSubmit) : handleSubmit(verifySubmit)}>
				<label>Введите почту чтобы продолжить</label>
      	{/* <TelegramLoginButton botName="nootskz_bot" dataOnauth={saveUser}/> */}
				{ !verify && <Controller
					control={control}
					name='phone'
					render={({ field: { onChange, onBlur, ref, value } }) => (
						<NumberFormat
							format='+7 ### ### ## ##'
							mask=''
							placeholder='+7 (000) 000 00 00'
							id='phone'
							onBlur={onBlur}
							onChange={onChange}
							ref={ref}
							value={value}
							aria-invalid={errors.phone ? 'true' : 'false'}
						/>
					)}
				/>}
				{ verify && <Controller
					control={control}
					name='token'
					render={({ field: { onChange, onBlur, ref, value } }) => (
						<NumberFormat
							format='######'
							mask='*'
							placeholder='******'
							id='token'
							onBlur={onBlur}
							onChange={onChange}
							ref={ref}
							value={value}
							aria-invalid={errors.token ? 'true' : 'false'}
						/>
					)}
				/>}
				{errors.phone && <p>{errors.phone?.message}</p>}
				
				{/* <input type='email' value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" spellCheck="false" autoCorrect="off" placeholder="Почта / Логин" required/> */}
				<div className={s.spacer}></div>
				<input type="submit" />
				<button>Далее</button>
			</form>
		}
		<button onClick={() => console.log(getValues(['phone', 'token']))}>Далее</button>
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
