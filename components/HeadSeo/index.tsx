import Head from "next/head"
import siteMetadata from "./siteMetaData"

type Props = {
	title?: any,
	description?: any,
	canonicalUrl?: any,
	ogType?: any,
	ogImageUrl?: any,
    children: any,
}

const HeadSeo:React.FC<Props> = ({
    title,
    description,
    canonicalUrl,
    ogType,
    children,
	ogImageUrl,
}) => {

    return (
        <Head>
            //basic metadata
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
            //twitter metadata
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={siteMetadata.twitterHandle} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            //canonical link
            <link rel="canonical" href={canonicalUrl} />
            //open graph metadata
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content={siteMetadata.companyName} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:url" content={canonicalUrl} />
            {children}
        </Head>
    )
}

export default HeadSeo