import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { Container } from '@chakra-ui/react'
import Layout from '../components/layout'
import jwt from 'jsonwebtoken'
import Event from '../components/event'

import dynamic from 'next/dynamic'

const FullCalendar = dynamic(() => import('../components/fullCalendar'), {
    ssr: false
});

import { getEventsByUserId } from '../dbFuncs/getEventsByUser'

const page = {
  title : 'My Calendar',
  desc : 'This is my calendar page',
  canonical: 'https://eventer.gg/myCalendar'
}

export default function MyCalendar({ events, user }) {

  const [ eventsArray, setEventsArray ] = useState(events)

  //console.log(events)

//   const handleRemove = async ( eventId ) => {
        
//     await axios.delete(`/api/events/${eventId}`)
//     .then( res => {
//         if(res.data.success){
          
//           let newEventsArray = [ ...eventsArray ]
//           newEventsArray = newEventsArray.filter( ev => ev._id != eventId )
//           console.log(newEventsArray)
//           setEventsArray(newEventsArray)

//         }
//     }).catch( err => {
//         console.log(err)
//     })

//   }

  return (
    <Layout page = { page } user = { user } > 
      <Container maxW='6xl' mt='25px'>
          <FullCalendar events = { events } />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {

    const cookie = ctx.req.headers.cookie
  
    try {

      const user = jwt.verify(cookie.substr(5), 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc') 

      const events = await getEventsByUserId(user.id)
    
      if( !events &&  !ctx.req ) {
        Router.replace('/login')
        return
      }
      else if( events && !ctx.req ){
        ctx.res.writeHead( 302, { Location: '/login' } )
        ctx.res.end()
        return
      }
      else {
        return { props : { events : events, user: user } }
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