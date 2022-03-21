import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { supabase } from '../utils/supabaseClient'
import ProductComponent from '../components/ProductComponent'
import Search from '../components/Search'
import { Product } from '../types'
import { GiFullPizza, GiCookie } from 'react-icons/gi'
import { MdCake } from 'react-icons/md'
import ProductModal from '../components/ProductComponent/ProductModal'

type Props = {
  children: React.ReactNode,
  data: Product[] | [],
  categories: string[],
}

const Home: NextPage<Props> = ({data, categories}) => {
  const [products, setProducts] = useState<any[]>([])
  const [product, setProduct] = useState<Product>()
	const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categoryList = [
    {
      name: 'Пицца',
      icon: <GiFullPizza size={22} color='#f0be62' />,
    },
    {
      name: 'Десерты',
      icon: <GiCookie size={22} color='#b38c24' />,
    },
    {
      name: 'Торты',
      icon: <MdCake size={22} color='#f7aefa' />,
    },
  ]

  const filterProducts = useCallback((category: string) => {
    setSelectedCategory(category)
    setProducts(data.filter(product => product.category === category))
  }, [data])

  useEffect(() => filterProducts(categories[1]), [categories, filterProducts])

  return (
    <main className={styles.container}>
		  {product && <ProductModal product={product} showModal={showModal} setShowModal={setShowModal} />}
      
      <Search products={data} setShowModal={setShowModal} setProduct={setProduct} />

      <div className='spacer'></div>

      <section className={styles.top_menu}>
        <div className={styles.categories_container}>
          {categoryList.map(category => 
            <button
              key={category.name}
              onClick={() => filterProducts(category.name)}
              className={selectedCategory === category.name ? styles.button + ' ' + styles.active : styles.button}
            >
              <span>{category.name}</span>
              {category.icon}
            </button>)
          }
        </div>
      </section>

      <section className={styles.main}>
        <div className={styles.main_container}>
          {products.map(product => 
            <ProductComponent
              key={product.id}
              product={product}
              setShowModal={setShowModal}
              setProduct={setProduct}
            />
          )}
        </div>
      </section>

    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, status, error } = await supabase.from('products').select('id, title, price, name, category, description, weight')

  const categories = data && Array.from(new Set(data.map(product => product.category)))
  
  if (error && status !== 406) throw error

  return {
    props: {
      data: data ? data : [],
      categories,
    },
  }
}

export default Home
