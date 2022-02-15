import { useState } from 'react'
import { Product } from '../../../types'
import ProductModal from '../../ProductComponent/ProductModal'
import Image from 'next/image'
import s from './searchproduct.module.scss'

type Props = {
	product: Product,
	setShowModal: any,
	setProduct: any,
}

const SearchProduct: React.FC<Props> = ({ product, setShowModal, setProduct }) => {
	const showModal = () => {
		setProduct(product)
		setShowModal(true)
	}
	
	return <div className={s.product_wrapper} key={product.id}>
		<div className={s.product} onClick={showModal}>
			<div className={s.product_image}>
				{product.image && <Image src={product.image} layout='fill' objectFit='cover'/>}
			</div>
			<div className='spacer'></div>
			<h4 className={s.product_name}>{product.name}</h4>
		</div>
	</div>
}

export default SearchProduct