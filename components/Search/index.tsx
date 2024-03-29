import { useRef, useEffect, useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { Product } from 'types'
import s from './search.module.scss'
import SearchProduct from './SearchProduct'

type Props = {
	products: Product[],
	setShowModal: any,
	setProduct: any,
}

const Search:React.FC<Props> = ({ products, setShowModal, setProduct }) => {
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
		<GoSearch />
		<div
			className={dropdown ? `${s.results} ${s.active}` : s.results}
			ref={dropdownRef}
			tabIndex={0}
			onBlur={() => setTimeout(() => !inputRef.current?.contains(document.activeElement) && setDropdown(false), 10)}
		>
			{filteredResults.map(product => 
				<SearchProduct
					product={product}
					key={product.id}
					setShowModal={setShowModal}
					setProduct={setProduct}
				/>
			)}
		</div>
	</section>
}

export default Search
