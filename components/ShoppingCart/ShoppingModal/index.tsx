import { useRouter } from 'next/router'
import { SetStateAction, useContext, useEffect } from 'react'
import { Product } from '../../../types'
import { supabase } from '../../../utils/supabaseClient'
import AppContext from '../../Context/AppContext'
import s from './shoppingModal.module.scss'

type Props = {
	items: number,
	cartOpen: boolean,
	setCartOpen: React.Dispatch<SetStateAction<boolean>>
}

const ShoppingModal: React.FC<Props> = ({items, cartOpen, setCartOpen}) => {
	const {cart, addProduct, removeItem} = useContext(AppContext)
	const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
			const handleRouteChange = () => setCartOpen(false)
			router.events.on('routeChangeComplete', handleRouteChange)

			return () => router.events.off("routeChangeComplete", handleRouteChange)
		}
  }, []);

	const proceedToCheckout = async () => {
		const user = await supabase.auth.user()
		user ? router.push('/cart') : router.push('/auth')
	}

	return <div className={s.wrapper}>
		<div className={!cartOpen ? s.container : `${s.container} ${s.active}`} onBlur={() => setCartOpen(false)}>
			<div className={s.close} onClick={() => setCartOpen(false)}>X</div>
			<div className={s.list}>
				{cart?.items.map((item: Product) => {
					return (
						<div
							key={item.id}
							onClick={() => removeItem && removeItem(item)}
							className={s.item}
						>
							<div>{item.name}</div>
							<div>{item.quantity} шт.</div>
						</div>
					)
				})}
			</div>
			<div className={cart?.itemCount && cart?.itemCount > 0 ? s.total_buy : s.total_buy_empty}>
				<div>Сумма {cart?.total} тенге</div>
				<button onClick={() => proceedToCheckout()}>Далее</button>
			</div>
		</div>
	</div>
}

export default ShoppingModal
