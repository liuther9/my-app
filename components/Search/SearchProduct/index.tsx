import { useState } from 'react'
import { Product } from '../../../types'
import ProductModal from '../../ProductComponent/ProductModal'
import Image from 'next/image'
import s from './searchproduct.module.scss'

type Props = {
	product: Product,
}

const SearchProduct: React.FC<Props> = ({ product }) => {
	const [showModal, setShowModal] = useState(false)
	
	return <div className={s.product_wrapper} key={product.id}>
		<ProductModal product={product} showModal={showModal} setShowModal={setShowModal} />
		<div className={s.product} onClick={() => setShowModal(true)}>
			<div className={s.product_image}>
				{product.image && <Image src={product.image} layout='fill' objectFit='cover'/>}
			</div>
			<div className='spacer'></div>
			<h4 className={s.product_name}>{product.name}</h4>
		</div>
	</div>
}

export default SearchProduct