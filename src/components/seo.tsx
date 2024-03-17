import { SeoMetadata } from "@/utils/types";
import Head from "next/head";

export default function Seo( { seo } : { seo : SeoMetadata } ) {

    return(

        <Head>
            <title>
                {seo.title}
            </title>
            <meta name="description" content={seo.description} key="desc" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOSTNAME_URL}${seo.page_url}`} />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOSTNAME_URL}${seo.image_url}`} />
        </Head>

    )

}