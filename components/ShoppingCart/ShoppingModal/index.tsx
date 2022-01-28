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
	const {cart, addProduct, removeItem, clearCart} = useContext(AppContext)
	const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
			const handleRouteChange = () => setCartOpen(false)
			router.events.on('routeChangeComplete', handleRouteChange)

			return () => router.events.off("routeChangeComplete", handleRouteChange)
		}
  }, []);

	const proceedToCheckout = () => {
		const user = supabase.auth.user()
		user ? router.push('/cart') : router.push('/auth')
	}

	return <div className={s.wrapper}>
		<div className={!cartOpen ? s.container : `${s.container} ${s.active}`}>
			<button className={s.close + ' ' + s.small_btn} onClick={() => setCartOpen(false)}>x</button>
			<ul className={s.list}>
				{cart?.items.map((item: Product) => {
					return (
						<li
							key={item.id}
							className={s.item}
						>
							<h4>{item.name}</h4>
							<div className={s.item_amount}>
								<button onClick={() => addProduct && addProduct(item)} className={s.small_btn}>+</button>
								<span>{item.quantity} шт.</span>
								<button onClick={() => removeItem && removeItem(item)} className={s.small_btn}>-</button>
							</div>
						</li>
					)
				})}
			</ul>
			<div className={s.bottom_container}>
				<div className={cart?.itemCount && cart?.itemCount > 0 ? s.total_buy : s.total_buy + ' ' + s.total_buy_empty}>
					<span>Сумма {cart?.total} тенге</span>
					<button onClick={() => proceedToCheckout()}>Далее</button>
				</div>
				<button className={s.clear_btn} onClick={() => clearCart && clearCart()}>Удалить все</button>
			</div>
		</div>
	</div>
}

export default ShoppingModal
