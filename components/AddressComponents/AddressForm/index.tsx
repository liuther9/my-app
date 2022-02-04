import { Fragment } from "react"
import NumberFormat from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import s from './addressform.module.scss'
import { ScopedMutator } from "swr/dist/types"
import { supabase } from "../../../utils/supabaseClient"

type Props = {
	id: string,
	mutate: ScopedMutator<any>,
}

const AddressForm:React.FC<Props> = ({ id, mutate }) => {
  const { register, handleSubmit, getValues, control, reset } = useForm();

	const onSubmit = async () => {
		const session = supabase.auth.session()
		const values = getValues(["street", "building", "appartment", "phone"])
		const res = await fetch('/api/address', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `${session?.access_token}` }),
			credentials: 'same-origin',
			body: JSON.stringify({ user_id: id, address: { street: values[0], building: values[1], appartment: values[2], }, phone: values[3], })
		})
		reset()
		reset({ phone: '' })
		mutate('/api/address')
	}

	return <Fragment>
		<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
			<label>Новый адрес</label>
			<div className="spacer"></div>
			<input  {...register("street", { minLength: {value: 1, message: 'Обязательное поле'}, required: true })} placeholder="Улица"/>
			<div className="spacer"></div>
			<div className={s.address_details}>
				<input {...register("building", { minLength: {value: 1, message: 'Обязательное поле'}, required: true })} placeholder="Дом"/>
				<div className="spacer"></div>
				<input {...register("appartment", { required: false })} placeholder="Квартира"/>
			</div>
			<div className="spacer"></div>
			<Controller
				name="phone"
				control={control}
				rules={{
					required: true,
					minLength: 17,
				}}
				render={({ field: {ref, value, onChange} }) => <NumberFormat ref={ref} value={value} onChange={onChange} format="+7 (###) ###-####" mask="" placeholder="+7 (###) ###-####"/>}
			/>
			<div className="spacer"></div>
			<button
				className={s.button}
				onClick={() => console.log(getValues(["street", "building", "appartment", "phone"]))}
			>
				Добавить
			</button>
		</form>
	</Fragment>
}

export default AddressForm
