import Image from 'next/image'
import { useContext, useRef } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import AppContext from '../../../store/Context/AppContext'
import { Product } from '../../../types'
import s from './productmodal.module.scss'

type Props = {
	product: Product,
	showModal: boolean,
	setShowModal: any,
}

const ProductModal:React.FC<Props> = ({ product, showModal, setShowModal }) => {
	const { addProduct } = useContext(AppContext)
	const ref = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	useClickOutside([ref, buttonRef], showModal, () => setShowModal(false))

	return <div className={showModal ? `${s.wrapper} + ${s.open}` : s.wrapper}>
		<div ref={ref} className={s.container}>
			<div className={s.image}>
				{product.image && <Image src={product.image} layout='fill' objectFit='cover' />}
			</div>
			<h4>{product.name}</h4>
			<p className={s.description}>Темская вкусая еда ешь ее каждый день</p>
			<button ref={buttonRef} onClick={() => addProduct && addProduct(product)}>Купить</button>
		</div>
	</div>
}

export default ProductModal
