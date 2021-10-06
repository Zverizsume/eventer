import React from 'react'
import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import { Flex, IconButton, useColorMode, Container, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Image from 'next/image'

export const siteTitle = 'Eventer'
export const siteUrl = 'https://eventer.gg'
export const author = 'Bole'

export default function Layout({ children, page, user }) {

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    
    <div>

      <Head>

          <title>{siteTitle + ' / ' + page.title}</title>

          <link rel="icon" href="/favicon.ico" />
          <link rel="canonical" href={page.canonical} />
          
          {/* og meta tags */}
          <meta property="og:type" content={'website'}></meta>
          <meta name="title" property="og:title" content={page.title}></meta>
          <meta name="image" property="og:image" content={'https://f2k.gg/images/f2k_logo.png'}></meta>
          <meta name="description" property="og:description" content={page.desc}></meta>
          <meta name="author" content={author}></meta>
          
          <meta name="og:title" content={page.title} />
          <meta name="og:image" content={'https://f2k.gg/images/f2k_logo.png'} />
          <meta name="og:url" content={siteUrl} />
          <meta name="og:type" content={'website'} />
          <meta name="og:description" content={page.desc} />

          {/* twitter meta tags */}

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content={author} />
          <meta name="twitter:title" content={page.title} />
          <meta name="twitter:description" content={page.desc} />
          <meta name="twitter:image" content={'https://f2k.gg/images/f2k_logo.png'} />

      </Head>

      {
        page.title !== 'Login' && page.title !== 'Register' ? <Navbar user = { user } /> : <Container maxW='8xl'><Flex h='16' alignItems='center'><Image src = 'https://image.flaticon.com/icons/png/512/839/839636.png' alt = 'Logo_image' width = '40px' height = '40px' priority></Image><IconButton ml='auto' boxShadow='md' mr='3' onClick={toggleColorMode} isRound size='sm' icon={ colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }/></Flex></Container>
      }

      <main >
        <Flex 
          pt = '30px'
          pb = '30px'
          direction='column'
          alignItems='center'
          justifyContent='center'
          minH='calc(100vh - 9rem)'
          bg={ useColorModeValue( 'gray.50', 'gray.800' ) }
        >
          {children}
        </Flex>
      </main>

      <Footer />

    </div>
  )
}