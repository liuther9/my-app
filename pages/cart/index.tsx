import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import AddressForm from "../../components/AddressComponents/AddressForm"
import AddressList from "../../components/AddressComponents/AddressList"
import OrderNavigationBar from "../../components/OrderNavigationBar"
import RadioButton from "../../components/RadioButton"
import { supabase } from "../../utils/supabaseClient"
import s from './cart.module.scss'

type Props = {
	user: User,
	loggedIn: boolean,
}

interface IPaymentTypes {
	name: 'cash' | 'card',
	label: string,
}

const paymentTypes:IPaymentTypes[] = [
	{
		name: 'cash',
		label: 'Оплата наличными',
	},
	{
		name: 'card',
		label: 'Оплата картой',
	},
]


const Cart: NextPage<Props> = ({ user, loggedIn }) => {
	const [selectedRadio, setSelectedRadio] = useState('')
	const [pageSwitched, setPageSwitched] = useState(false)
	const [paymentType, setPaymentType] = useState<'cash' |'card'>('cash')

  const { mutate } = useSWRConfig()
	const fetcher = (url: string) => fetch(url + `?id=${user.id}`).then((res) => res.json());
	const { data, error } = useSWR('/api/address', fetcher)

  const handleRadioChange = (item: string) => setSelectedRadio(item)
	const submitOrder = async () => {
		// fetch('/api/order', {
		// 	method: 'POST',
			
		// })
	}
	const nextButtonAction = () => pageSwitched === false ? setPageSwitched(true) : submitOrder()

	useEffect(() => {handleRadioChange(data && data?.at(-1) && data.at(-1).id)}, [data])

	return <div className={s.wrapper}>
		<div className={s.container}>
			<OrderNavigationBar setPageSwitched={setPageSwitched} pageSwitched={pageSwitched} nextButtonAction={nextButtonAction} />
			<div style={{position: 'absolute'}} className={!pageSwitched ? s.page + ' ' + s.page_switched : s.page}>
				<div className={s.payment_container}>
					{ paymentTypes.map(payment => <RadioButton label={payment.label} name={payment.name} value={paymentType === payment.name} onChange={() => setPaymentType(payment.name)}/>) }
				</div>
			</div>
			<div className={!pageSwitched ? s.page : s.page + ' ' + s.page_switched}>
				{ data?.length > 0 && 
					<AddressList selectedRadio={selectedRadio} handleRadioChange={handleRadioChange} data={data} />
				}
				<AddressForm id={user.id} mutate={mutate} />
			</div>
		</div>
	</div>
}

export default Cart

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
