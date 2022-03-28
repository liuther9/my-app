import dynamic from 'next/dynamic'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'
import 'nprogress/nprogress.css'

const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false })

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=UA-223990055-1`}
    />
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-223990055-1', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
    <TopProgressBar />
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
