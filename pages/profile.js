import React from 'react'

import { Container, Box } from "@chakra-ui/react";
import Layout from "../components/layout"
import jwt from 'jsonwebtoken'

const page = {
    title : 'User Profile',
    desc : 'This is home page',
    canonical: 'https://eventer.gg'
}

export default function User ( { user } ) {
    return (
        <Layout user = { user } page = { page }>
            <Container>
                <Box mt='20px'>
                    {user.name}
                </Box>
                <Box mt='20px'>
                    {user.email}
                </Box>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const cookie = ctx.req.headers.cookie
    const user = jwt.verify(cookie.substr(5), 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc') 
  
    if( user ){

        return { props: { user: user } }
    }

    return {
        redirect: {
            destination: '/login',
            statusCode: 307
        }
    }

}