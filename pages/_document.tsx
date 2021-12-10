import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link
            rel="stylesheet"
            href="/fonts/Klee_One/KleeOne-Regular.ttf"
            as="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="/fonts/Klee_One/KleeOne-SemiBold.ttf"
            as="font/ttf"
            crossOrigin="anonymous"
          /> */}
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