import React, { useContext, useState } from 'react'
import styles from './productComponent.module.scss'
import { Product } from '../../types'
import AppContext from '../../store/Context/AppContext'
import Image from 'next/image'

type Props = {
	product: Product,
	setShowModal: any,
	setProduct: any,
}

const ProductComponent: React.FC<Props> = React.memo(({ product, setShowModal, setProduct }) => {
	const { name, price, id, title, weight } = product

	const {cart, addProduct} = useContext(AppContext)

	const showModal = () => {
		setProduct(product)
		setShowModal(true)
	}

	return <div className={styles.product}>
		<div className={styles.image} onClick={showModal}>
			{<Image alt={name} src={`/products/${title}-1.webp`} layout='fill' objectFit='cover' priority />}
		</div>
		<div className={styles.item_info}>
			<article className={styles.item_about}>
				<h2 className={styles.name}>{name}</h2>
				{ weight &&<span className={styles.weight}>{weight} гр</span> }
			</article>
			<div className={styles.item_bottom_container}>
				<button onClick={() => addProduct && addProduct(product)}>Купить {price} тг</button>
			</div>
		</div>
	</div>
})

export default ProductComponent
