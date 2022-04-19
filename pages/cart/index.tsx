import { User } from "@supabase/supabase-js"
import { GetServerSideProps, NextPage } from "next"
import { useContext, useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { useRouter } from 'next/router'
import { getCookie } from "cookies-next"
import jwt from 'jsonwebtoken'
import { fetchApi } from "../../api"
import AddressForm from "../../components/AddressComponents/AddressForm"
import AddressList from "../../components/AddressComponents/AddressList"
import OrderNavigationBar from "../../components/OrderNavigationBar"
import RadioButton from "../../components/RadioButton"
import AppContext from "../../store/Context/AppContext"
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

  const router = useRouter()

	const { cart, clearCart } = useContext(AppContext)

  const { mutate } = useSWRConfig()
	const fetcher = (url: string) => fetch(url + `?id=${user_id.user_id}`).then((res) => res.json());
	const { data, error } = useSWR('/api/address', fetcher)

  const handleRadioChange = (item: string) => setSelectedRadio(item)
	useEffect(() => {
		handleRadioChange((data && data.length > 0) ? data.slice(-1)[0].id : '')
	}, [data])

	const submitOrder = async () => {
		const res = await fetchApi('/api/order', {
			user_id: user_id.user_id,
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
			<div style={{ position: 'absolute' }} className={!pageSwitched ? s.page + ' ' + s.page_switched : s.page}>
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
				<AddressForm user_id={user_id.user_id} mutate={mutate} />
			</div>
		</main>
	</div>
}

export default Cart

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	let id
	jwt.verify(req.cookies.accessToken, process.env.JWT_AUTH_TOKEN || '', async (err, user_id) => {
		if (user_id) {
			id = user_id
		}
	});
	if (!getCookie('authSession', { req, res })) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			}
		}
	}

	return {
		props: {
			user_id: id,
		}
	}
}
