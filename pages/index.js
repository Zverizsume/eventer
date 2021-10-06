import React from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Router from 'next/router'
import { Container } from '@chakra-ui/react'
import Layout from '../components/layout'
import jwt from 'jsonwebtoken'
import Event from '../components/event'

const page = {
  title : 'Home',
  desc : 'This is home page',
  canonical: 'https://eventer.gg'
}

export default function Home({ events, user }) {

  return (
    <Layout page = { page } user = { user } > 
      <Container mt='25px'>
          { events.map( (e, index) => {
              return (
                <Event key = { index } event = { e } userId = {user.id} myEvents = {false} />
              )
            })
          }
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {

  const cookie = ctx.req.headers.cookie
  
  try {

    const user = jwt.verify(cookie.substr(5), 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc') 
    const resp = await axios.get( 'http://localhost:3000/api/events', {
      headers:{
        cookie: cookie
      }
    })
  
    if ( resp.status === '401' && !ctx.req ){
      Router.replace('/login')
      return
    }
    else if ( resp.status === '401' && ctx.req ){
      ctx.res.writeHead( 302, { Location: '/login' } )
      ctx.res.end()
      return
    }
    else {
      const json = await resp.data.data
      return { props : { events : json, user: user } }
    }

  } catch (error) {
    console.dir(error)
    return {
      redirect: {
          destination: '/login',
          statusCode: 307
      }
    }

  }
}