import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { Product } from '../../types'
import s from './search.module.scss'

type Props = {
	products: Product[]
}

const Search:React.FC<Props> = ({ products }) => {
	const [value, setValue] = useState<string>('')
	const [dropdown, setDropdown] = useState(false)
	const [filteredResults, setFilteredResults] = useState<Product[]>([])
	const inputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const filter = () => {
		if(value.length > 0) {
			dropdown === false && setDropdown(true)
			setFilteredResults(products.filter(product => product.name.toLowerCase().includes(value.toLowerCase())))
		} else {
			setDropdown(false)
			setFilteredResults([])
		}
	}

	useEffect(() => filter(), [value])

	return <section className={s.wrapper}>
		<input
			ref={inputRef}
			autoCorrect='off'
			spellCheck={false}
			className={s.input}
			value={value}
			onChange={e => setValue(e.target.value)}
			onFocus={() => value.length > 0 && setDropdown(true)}
			onBlur={() => setTimeout(() => !dropdownRef.current?.contains(document.activeElement) && setDropdown(false), 10)}
		/>

		{dropdown && 
			<div
				className={s.results}
				ref={dropdownRef}
				tabIndex={0}
				onBlur={() => setTimeout(() => !inputRef.current?.contains(document.activeElement) && setDropdown(false), 10)}
			>
				{filteredResults.map(product => 
					<div className={s.product} key={product.id} onClick={() => {}}>
						<div className={s.product_image}>
							{product.image && <Image src={product.image} layout='fill' objectFit='cover'/>}
						</div>
						<div className='spacer'></div>
						<h4 className={s.product_name}>{product.name}</h4>
					</div>
				)}
			</div>
		}
	</section>
}

export default Search
