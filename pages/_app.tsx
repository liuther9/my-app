import '../styles/globals.css'
import 'nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Layout from '../components/Layout/Layout'

const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false })

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <TopProgressBar />
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
