import React from 'react'

import { useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from "../components/layout";
import { 
    Radio, 
    RadioGroup,
    Stack,
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
    title : 'Register',
    desc : 'This is register page',
    canonical: 'https://eventer.gg/register'
}

export default function Register() {

    const router = useRouter()

    const [ email, setEmail ] = useState(null)
    const [ fullName, setfullName ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ gender, setGender ] = useState('male')

    const [ isSubmiting, setIsSubmiting] = useState(false)

    const [ showPass, setShowPass ] = useState(false)
    const handleShowPass = () => setShowPass(!showPass)

    //console.log(gender)

    const handleSubmit = async ( e ) => {
        
        e.preventDefault()

        setIsSubmiting(true)

        await axios.post('/api/register',{
            email : email,
            fullName : fullName,
            password : password,
            gender : gender
        }).then( res => {
            setIsSubmiting(false)
            router.push('/login')
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
                <FormControl isRequired mb='10px' id="fullName">
                    <FormLabel>Full name</FormLabel>
                    <Input type="text" onChange={ e => setfullName(e.target.value) }/>
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
                <FormControl mb='10px' id="gender">
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup onChange={ setGender } value={ gender }>
                        <Stack>
                            <Radio size="md" value='male' name="male" colorScheme="green">
                                Male
                            </Radio>
                            <Radio size="md" value='female' name="female" colorScheme="green">
                                Female
                            </Radio>
                            <Radio size="md" value='other' name="other" colorScheme="green">
                                Other
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <Button type='submit' isLoading={isSubmiting} colorScheme='teal' variant='outline' mt='20px'>Register</Button>
                <Button mt='20px' colorScheme='yellow' variant='outline' size='sm'><Link href='/login' >go to Login</Link></Button>
            </Box>
        </Container>
        </Layout>
    )

}