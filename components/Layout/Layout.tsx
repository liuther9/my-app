import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'
import { Product } from '../../types'
import Auth from '../../utils/Auth'
import AppContext from '../Context/AppContext'
import ShoppingButton from '../ShoppingCart/ShoppingButton'
import ShoppingModal from '../ShoppingCart/ShoppingModal'
import Footer from './Footer'
import Header from './Header'
import s from './layout.module.scss'

interface IType {
	children: React.ReactNode,
}
type Cart = {
	items: Product[],
	total: number,
	itemCount: number,
}

const initialState = { items: [], total: 0, itemCount: 0 }

const Layout:React.FC<IType> = ({children}) => {
	const [cart, setCart] = useState<Cart>(initialState)
	const [cartOpen, setCartOpen] = useState(false)
	const { session } = Auth()

	useEffect(() => {cart.itemCount === 0 && setCartOpen(false)}, [cart.itemCount])
	useEffect(() => {
		const cartItems = JSON.parse(window.localStorage.getItem('cart') || JSON.stringify(cart))
		setCart(cartItems)
	}, [])
	useEffect(() => {
		window.localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const router = useRouter()

	// ADD PRODUCT TO THE CART
	const addProduct = (item: Product) => {
    let { items, total } = cart
    const addedItem = items?.find((i) => i.id === item.id);

		if (!addedItem) {
      item.quantity = 1;
      setCart({
				items: [...items, item],
				total: total + item.price,
				itemCount: cart.itemCount + 1,
			})
    } else {
      setCart({
				items: items.map((item) =>
					item.id === addedItem.id
						? Object.assign({}, item, { quantity: item.quantity && item.quantity + 1 })
						: item
				),
				total: total + item.price,
				itemCount: cart.itemCount + 1,
			})
		}
	}
	//------------------------------------------------------------------------------------

	// REMOVE PRODUCT FROM THE CART
	const removeItem = (item: Product) => {
    let { items, total } = cart
    const addedItem = items?.find((i) => i.id === item.id)

    if (addedItem?.quantity && addedItem?.quantity > 1) {
      setCart({
					items: items.map((item: Product) =>
						item.id === addedItem.id
							? Object.assign({}, item, { quantity: item.quantity && item.quantity - 1 })
							: item
					),
					total: total - item.price,
					itemCount: cart.itemCount - 1,
      })
    } else {
      const products: Product[] = [...items];
      const index = products.findIndex((i: Product) => i.id === addedItem?.id);

      products.splice(index, 1);
      setCart({
				items: products,
				total: total - item.price,
				itemCount: cart.itemCount - 1,
			});
    }
  }
	//------------------------------------------------------------------------------------

	// CLEAR CART
	const clearCart = () => setCart(initialState)
	//------------------------------------------------------------------------------------

	return <AppContext.Provider value={{
		cart,
		addProduct,
		removeItem,
		clearCart,
	}}>
		<div className={s.wrapper}>
			<Header />
			{router.pathname !== '/cart' && cart.itemCount !== 0 &&
				<Fragment>
					<ShoppingButton items={cart.itemCount} cartOpen={cartOpen} setCartOpen={setCartOpen} />
					<ShoppingModal items={cart.itemCount} cartOpen={cartOpen} setCartOpen={setCartOpen} />
				</Fragment>
			}
			<div className={s.container}>
				{children}
			</div>
			<Footer />
		</div>
	</AppContext.Provider>
}

export default Layout
