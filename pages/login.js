import React from 'react'

import { useState } from "react";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'

import { 
    Container,
    Input,
    InputGroup,
    InputRightElement,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    Box
} from '@chakra-ui/react'

const page = {
    title : 'Login',
    desc : 'This is login page',
    canonical: 'https://eventer.gg/login'
}

export default function Login() {

    const router = useRouter()

    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)

    const [ isSubmiting, setIsSubmiting] = useState(false)

    const [showPass, setShowPass] = useState(false)
    const handleShowPass = () => setShowPass(!showPass)


    const handleSubmit = async ( e ) => {
        
        e.preventDefault()

        setIsSubmiting(true)

        await axios.post('/api/login',{
            email : email,
            password : password
        }).then( res => {

            setIsSubmiting(false)
            if(res.data.success){
                router.push('/')
            }
            else{
                alert(res.data.message)
            }

        }).catch( error => {
            console.log(error)
        })
    }

    return ( 
        <Layout page = { page } user = { null } >
            <Container>
                <Box as='form' onSubmit={ e => handleSubmit(e)} borderWidth='1px' borderRadius='lg' p='20px' display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                    <FormControl isRequired mb='10px' id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" onChange={ e => setEmail(e.target.value) }/>
                        <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl isRequired mb='10px' id="pass">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPass ? "text" : "password"} onChange={ e => setPassword(e.target.value) }/>
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowPass}>
                                    {showPass ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button type='submit' isLoading={isSubmiting} colorScheme='teal' variant='outline' mt='20px'>Login</Button>
                    <Button mt='20px' colorScheme='yellow' variant='outline' size='sm'><Link href='/register' ><a>go to Register</a></Link></Button>
                </Box>
            </Container>
        </Layout>
    )

}