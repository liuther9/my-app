import { SetStateAction } from 'react'
import s from './shoppingButton.module.scss'
import { BsShop } from 'react-icons/bs'

type Props = {
	items: number,
	cartOpen: boolean,
	setCartOpen: React.Dispatch<SetStateAction<boolean>>
}

const ShoppingButton: React.FC<Props> = ({items, cartOpen, setCartOpen}) => {
	return <div className={s.wrapper} onClick={() => setCartOpen(!cartOpen)}>
		<div className={!cartOpen ? s.btn : `${s.btn_active} + ${s.btn}`}>
			<BsShop />
		</div>
		<div>{items && items > 0 ? items : ''}</div>
	</div>
}

export default ShoppingButton
