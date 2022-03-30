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

	const { weight, name, description, title, price } = product

	useClickOutside([ref, buttonRef], showModal, () => setShowModal(false))

	return <div className={showModal ? `${s.wrapper} + ${s.open}` : s.wrapper}>
		<div ref={ref} className={s.container}>
			<div className={s.image}>
				<Image src={`/products/${title}-2.webp`} layout='fill' placeholder='blur' blurDataURL={`/products/${title}-1.webp`} objectFit='cover' />
			</div>
			<h4>{name}</h4>
			<p className={s.description}>{description}</p>
			{weight && <p className={s.description}>Вес: {weight} грамм</p>}
			<button ref={buttonRef} onClick={() => addProduct && addProduct(product)}>Купить {price} тг</button>
		</div>
	</div>
}

export default ProductModal
