import { Fragment } from "react"
import NumberFormat from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import s from './addressform.module.scss'
import { ScopedMutator } from "swr/dist/types"
import { supabase } from "../../../utils/supabaseClient"

type Props = {
	user_id: string,
	mutate: ScopedMutator<any>,
}

const AddressForm:React.FC<Props> = ({ user_id, mutate }) => {
  const { register, handleSubmit, getValues, control, reset, formState: { errors } } = useForm();

	const onSubmit = async () => {
		const values = getValues(["street", "building", "appartment", "phone"])
		const res = await fetch('/api/address', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ user_id, street: values[0], building: values[1], appartment: values[2], phone: values[3], })
		})
		reset()
		reset({ phone: '' })
		mutate('/api/address')
	}

	return <Fragment>
		<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
			<label>Новый адрес</label>
			<div className="spacer"></div>
			<input
				{...register("street", { minLength: 1, required: true })}
				placeholder="Улица"
				aria-invalid={errors.street ? 'true' : 'false'}
			/>
			<div className="spacer"></div>

			<div className={s.address_details}>
				<input
					{...register("building", { minLength: 1, required: true })}
					placeholder="Дом"
					aria-invalid={errors.building? 'true' : 'false'}
				/>
				<div className="spacer"></div>

				<input
					{...register("appartment", { required: false })}
					placeholder="Квартира"
				/>
			</div>
			<div className="spacer"></div>
			<Controller
				name="phone"
				control={control}
				rules={{
					required: true,
					minLength: 17,
				}}
				render={({ field: {ref, value, onChange} }) => {
					return (
						<NumberFormat
							ref={ref}
							value={value}
							onChange={onChange}
							format="+7 (###) ###-####"
							mask=""
							placeholder="+7 (###) ###-####"
							aria-invalid={errors.phone ? 'true' : 'false'}
						/>
					)
				}}
			/>
			<div className="spacer"></div>
			<button className={s.button}>
				Добавить адрес
			</button>
		</form>
	</Fragment>
}

export default AddressForm
