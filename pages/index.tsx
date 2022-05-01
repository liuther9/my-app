import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { GiCookie } from 'react-icons/gi'
import { MdCake } from 'react-icons/md'
import { supabase } from '../utils/supabaseClient'
import ProductComponent from '../components/ProductComponent'
import Search from '../components/Search'
import ProductModal from '../components/ProductComponent/ProductModal'
import { Product } from '../types'
import styles from '../styles/Home.module.scss'
import siteMetadata from '../components/HeadSeo/siteMetaData'
import HeadSeo from '../components/HeadSeo'

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

  // CATEGORIES
  const categoryList = [
    {
      name: 'Торты',
      icon: <MdCake size={22} color='#f7aefa' />,
    },
    {
      name: 'Десерты',
      icon: <GiCookie size={22} color='#b38c24' />,
    },
  ]

  // MEMOIZED SETSTATE
  const openModal = useCallback((open) => setShowModal(open), [])
  const chooseProductModal = useCallback((product) => setProduct(product), [])

  // FILTERING DISPLAYED PRODUCTS
  const filterProducts = (category: string) => {
    setSelectedCategory(category)
    setProducts(data.filter(product => product.category === category))
  }

  useEffect(() => filterProducts(categories[0]), [categories])

  return (
    <main className={styles.container}>
    <HeadSeo
      title={`Лучшие торты Астана Noots кондитерская`}
      description={`Вкусные торты в Нурсултане по лучшим ценам. Закажите прямо сейчас.`}
      canonicalUrl={siteMetadata.siteUrl}
      ogType={"website"}
    />
		  {product && <ProductModal product={product} showModal={showModal} setShowModal={setShowModal} />}
      
      <Search products={data} setShowModal={setShowModal} setProduct={setProduct} />
      <button onClick={() => fetch('/api/ola')}>asd</button>
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
              setShowModal={openModal}
              setProduct={chooseProductModal}
            />
          )}
        </div>
      </section>

    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
