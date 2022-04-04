import { useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from 'next/router'
import { User } from "@supabase/supabase-js"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { ImSpinner } from 'react-icons/im'
import { supabase } from "../../utils/supabaseClient"
import s from './auth.module.scss'

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
	const [loading, setLoading] = useState(false)

  const router = useRouter()

	// VALIDATE PHONE NUMBER
	const validationSchema = Yup.object().shape({
			phone: Yup.string()
					.transform(currentValue => currentValue.replaceAll(' ', ''))
					.required('Введите телефон')
					.min(11, 'Введите телефон'),
	});
	const formOptions = {
		resolver: yupResolver(validationSchema),
	}

	// EMAIL SUBMIT
  const { handleSubmit, formState: { errors }, register } = useForm<any>();
	const emailSubmit = async ({ email }: { email: string }) => {
		setLoading(true)
		let res = await supabase.auth.signIn({
			email
		})
		setLoading(false)
		setVerify(true)
	}

  // const { handleSubmit, formState: { errors }, control, register } = useForm<any>(formOptions);

	// SUBMIT PHONE NUMBER
	// const onSubmit: SubmitHandler<Inputs> = async data => {
	// 	const { phone } = data
	// 	setLoading(true)
	// 	let { user, error } = await supabase.auth.signIn({
	// 		phone,
	// 	})
	// 	setLoading(false)
	// 	!error && setVerify(true)
	// }

	// SUBMIT PHONE NUMBER AND SMS OTP //
	// const verifySubmit: SubmitHandler<VerifyInputs> = async data => {
	// 	const { phone, token } = data
	// 	setLoading(true)
	// 	let { session, error } = await supabase.auth.verifyOTP({
	// 		phone,
	// 		token,
	// 	})
	// 	!error && router.push('/cart')
	// }

	return <div className={s.wrapper}>
		{ loading && <ImSpinner size={30}/> }
		{ !loading && !verify &&
			<form onSubmit={handleSubmit(emailSubmit)}>
				<label>Введите номер телефона</label>
				<input type='email' placeholder="Введите почту" {...register('email', { required: true })} aria-invalid={errors.email ? 'true' : 'false'} />
				<div className={s.spacer}></div>
				<button type="submit">Далее</button>
			</form>
		}
		{ !loading && verify &&
			<div>
				<p>Перейдите по ссылке высланной на вашу почту</p>
			</div>
		}
		{/* { !loading && !verify &&
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Введите номер телефона</label>
				<Controller
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
				/>
				<div className={s.spacer}></div>
				<button type="submit">Далее</button>
			</form>
		} */}
		{/* { !loading && verify &&
			<form onSubmit={handleSubmit(verifySubmit)}>
				<label>Введите СМС код</label>
				<Controller
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
				/>
				<div className={s.spacer}></div>
				<button type="submit">Далее</button>
			</form>
		} */}
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
