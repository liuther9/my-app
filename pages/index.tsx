import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import { supabase } from '../utils/supabaseClient'
import ProductComponent from '../components/ProductComponent'

type Props = {
  children: React.ReactNode,
  data: {
    id: number, 
    title: string,
    price: number,
    name: string,
    category: string,
  }[] | [],
  categories: string[],
}

const Home: NextPage<Props> = ({data, categories}) => {
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const filterProducts = useCallback((category: string) => {
    setSelectedCategory(category)
    setProducts(data.filter(product => product.category === category))
  }, [data])

  useEffect(() => {
    filterProducts(categories[0])
  }, [categories, filterProducts])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>МЕНЮ</h1>

      <div className={styles.top_menu}>
        <div className={styles.categories_container}>
          {categories.map(category => 
            <div
              key={category}
              onClick={() => filterProducts(category)}
              className={selectedCategory === category ? styles.button + ' ' + styles.active : styles.button}
            >
              {category}
            </div>)
          }
        </div>
      </div>
      <main className={styles.main}>
          {products.map(product => <ProductComponent key={product.id} product={product} />)}
      </main>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data, status, error } = await supabase.from('products').select('id, title, price, name, category, image')

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
