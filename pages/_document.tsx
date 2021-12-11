import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/Klee_One/KleeOne-Regular.ttf"
            as="font"
            crossOrigin=""
            type="font/ttf"
          />
          <link
            rel="preload"
            href="/fonts/Klee_One/KleeOne-SemiBold.ttf"
            as="font"
            crossOrigin=""
            type="font/ttf"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument