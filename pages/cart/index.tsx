import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from 'next/router'
import { fetchApi } from "api"
import AddressForm from "components/AddressComponents/AddressForm"
import AddressList from "components/AddressComponents/AddressList"
import OrderNavigationBar from "components/OrderNavigationBar"
import RadioButton from "components/RadioButton"
import AppContext from "store/Context/AppContext"
import { FiLoader } from "react-icons/fi"
import s from './cart.module.scss'

type Props = {
	user_id: any,
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
]


const Cart: NextPage<Props> = ({ user_id }) => {
	const [selectedRadio, setSelectedRadio] = useState('')
	const [pageSwitched, setPageSwitched] = useState(false)
	const [paymentType, setPaymentType] = useState<'cash' |'card'>('cash')
	const [userId, setUserId] = useState('')
	const [loading, setLoading] = useState(false)

  const router = useRouter()

	const { cart, clearCart } = useContext(AppContext)

  const { mutate } = useSWRConfig()
	const fetcher = (url: string) => fetch(url + `?id=${localStorage.getItem('user_id') || ''}`).then((res) => res.json());
	const { data, error } = useSWR('/api/address', fetcher)

  const handleRadioChange = (item: string) => setSelectedRadio(item)
	useEffect(() => {handleRadioChange((data && data.length > 0) ? data.slice(-1)[0].id : '')}, [data])

	useEffect(() => {
		setUserId(localStorage.getItem('user_id') || '')
	}, [])

	const submitOrder = async () => {
		const res = await fetchApi('/api/order', {
			user_id: userId,
			order_list: cart?.items,
			payment_type: paymentType,
			address: selectedRadio,
			total: cart?.total,
		})
		if (res.status === 200) {
			clearCart && clearCart()
			router.push('/orderinfo')
		}
	}

	const nextButtonAction = () => pageSwitched === false ? setPageSwitched(true) : submitOrder()

	return <div className={s.wrapper}>
		<main className={s.container}>
			<OrderNavigationBar
				setPageSwitched={setPageSwitched}
				pageSwitched={pageSwitched}
				nextButtonAction={nextButtonAction}
				addressSelected={selectedRadio.length > 0}
			/>
			<div style={{ position: 'absolute' }} className={!pageSwitched ? (s.page + ' ' + s.page_switched) : s.page}>
				<div className={s.payment_container}>
					<h2>Способ оплаты:</h2>
					{ paymentTypes.map(payment => 
							<RadioButton
								key={payment.name}
								label={payment.label}
								name={payment.name}
								value={paymentType === payment.name}
								onChange={() => setPaymentType(payment.name)}
							/>
					)}
				</div>
			</div>
			<div className={!pageSwitched ? s.page : s.page + ' ' + s.page_switched}>
				{ data?.length > 0 && 
					<AddressList
						selectedRadio={selectedRadio}
						handleRadioChange={handleRadioChange}
						data={data}
					/>
				}
				{ loading && <FiLoader /> }
				<AddressForm user_id={userId} mutate={mutate} setLoading={setLoading} />
			</div>
		</main>
	</div>
}

export default Cart
