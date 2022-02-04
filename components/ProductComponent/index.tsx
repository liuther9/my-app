import React, { useContext } from 'react'
import styles from './productComponent.module.scss'
import { Product } from '../../types'
import AppContext from '../Context/AppContext'
import Image from 'next/image'

type Props = {
	product: Product,
}

const ProductComponent: React.FC<Props> = React.memo(({product}) => {
	const { name, price, image, id } = product

	const {cart, addProduct} = useContext(AppContext)

	return <div className={styles.product}>
		<div className={styles.image}>
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