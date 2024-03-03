import { Helmet } from 'react-helmet-async'
// import { useEffect } from 'react'

export interface MetaTagTypes {
   description?: string
   keywords?: string
   title?: string
   imgSrc?: string
   url?: string
}

// declare global {
//    interface Window {
//       dataLayer: any[]
//       gtag: (...args: any[]) => void
//    }
// }

const MetaTag = (props: MetaTagTypes) => {
   // props로 content 내용을 불러올 예정임
   return (
      <Helmet>
         {/*<title>{props.title}</title>*/}

         {/*<meta name="description" content={props.description} />*/}
         {/*/!*<meta name="keywords" content={props.keywords} />*!/*/}

         {/*<meta property="og:type" content="website" />*/}
         {/*<meta property="og:title" content={props.title} />*/}
         {/*<meta property="og:site_name" content={props.title} />*/}
         {/*<meta property="og:description" content={props.description} />*/}
         {/*<meta property="og:image" content="https://photo-spot.info/favicon.png" />*/}
         {/*<meta property="og:url" content={props.url} />*/}

      </Helmet>
   )
}

export default MetaTag