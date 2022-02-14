import React, { useContext, useState } from 'react'
import styles from './productComponent.module.scss'
import { Product } from '../../types'
import AppContext from '../../store/Context/AppContext'
import Image from 'next/image'
import ProductModal from './ProductModal'

type Props = {
	product: Product,
}

const ProductComponent: React.FC<Props> = React.memo(({product}) => {
	const { name, price, image, id } = product
	const [showModal, setShowModal] = useState(false)

	const {cart, addProduct} = useContext(AppContext)

	return <div className={styles.product}>
		<ProductModal
			product={product}
			showModal={showModal}
			setShowModal={setShowModal}
		/>
		<div className={styles.image} onClick={() => setShowModal(true)}>
			{image && <Image alt={name} src={image} layout='fill' objectFit='cover' priority />}
		</div>
		<div className={styles.item_info}>
			<article className={styles.item_about}>
				<h2 className={styles.name}>{name}</h2>
				<span className={styles.price}>{price} тг</span>
			</article>
			<div className={styles.item_bottom_container}>
				<button onClick={() => addProduct && addProduct(product)}>Купить</button>
			</div>
		</div>
	</div>
})

export default ProductComponent
