import { useState } from 'react'
import Image from 'next/image'
import styles from './productComponent.module.scss'

type Props = {
	product: {
		name: string,
		price: string | number,
		description?: string,
		image: string,
	}
}

const ProductComponent: React.FC<Props> = ({product}) => {
	const { name, price, image } = product
	const [showImg, setShowImg] = useState(false)

	return <div className={styles.product}>
		<div className={styles.button_container}>
			<button className={styles.name} onClick={() => setShowImg(!showImg)} onBlur={() => setShowImg(false)}>{name}</button>
			<div className={!showImg ? styles.modal_img : `${styles.modal_img} ${styles.modal_show}`}>
				{image && <Image alt='' src={image} width={300} height={200} objectFit='cover' />}
			</div>
		</div>
		<div className={styles.description}>Здесь будет описание данного продукта</div>
		<div className={styles.price}>{price} тенге</div>
	</div>
}

export default ProductComponent