import React from 'react'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { CookiesProvider } from "react-cookie"

import NProgress from 'nprogress'
import { Router } from 'next/dist/client/router'

import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css' 
import '@fullcalendar/timegrid/main.css' 

NProgress.configure( { showSpinner : false } )

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

Router.events.on('routeChangeError', () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }) {

  return (

      <CookiesProvider>
        <ChakraProvider>
          <ColorModeScript initialColorMode='light'/>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>

  )
}

export default MyApp
