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
			{image && <Image src={image} layout='fill' objectFit='cover' />}
		</div>
		<div className={styles.item_info}>
			<div className={styles.item_about}>
				<h2 className={styles.name}>{name}</h2>
				<div className={styles.price} onClick={() => addProduct && addProduct(product)}>{price} тг</div>
			</div>
			<div className={styles.item_rating}>
				***
			</div>
		</div>
	</div>
})

export default ProductComponent
