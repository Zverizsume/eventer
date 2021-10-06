import React from 'react'

import {
    useColorMode,
    Container,
    Input,
    FormControl,
    FormHelperText,
    Textarea,
    FormLabel,
    Switch,
    Button,
    Box
} from '@chakra-ui/react'
import { useState } from 'react'
import { useToast } from "@chakra-ui/react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import axios from 'axios'
import Layout from '../components/layout'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const page = {
    title : 'Create Event',
    desc : 'This is home page',
    canonical: 'https://eventer.gg'
}

const animatedComponents = makeAnimated()

export default function CreateEvent ( { user } ) {

    const toast = useToast()
    const { colorMode, toggleColorMode } = useColorMode()

    const options = [
        { value: 'music', label: 'Music' },
        { value: 'sport', label: 'Sport' },
        { value: 'cinema', label: 'Cinema' }
    ]

    const [ formState, setFormState ] = useState({
        title : '',
        desc : '',
        startDate : moment().format('yyyy-MM-DD'),
        startTime : moment().format('HH:mm'),
        endDate : moment().format('yyyy-MM-DD'),
        endTime : moment().format('HH:mm'),
        location : '',
        type: new Array(),
        isPublic : false,
        submited : false
    })

    const [ isSubmiting, setIsSubmiting ] = useState(false)

    const handleSubmit = async ( e ) => {
        
        console.log(formState)

        e.preventDefault()

        setIsSubmiting(true)

        const typeArray = formState.type.map( a => { return a.value })

        await axios.post('/api/events',{
            userId: user.id,
            title : formState.title,
            desc : formState.desc,
            start : formState.startDate + ' ' + formState.startTime,
            end : formState.endDate + ' ' + formState.endTime,
            location : formState.location,
            type : typeArray,
            isPublic : formState.isPublic,
            attendants : new Array()
        }).then( res => {

            setIsSubmiting(false)

            if(res.data.success){
                
                setFormState({
                    title : '',
                    desc : '',
                    startDate : moment().format('yyyy-MM-DD'),
                    startTime : moment().format('HH:mm'),
                    endDate : moment().format('yyyy-MM-DD'),
                    endTime : moment().format('HH:mm'),
                    location : '',
                    type: new Array(),
                    isPublic : false,
                    submited : true
                })

                toast({
                    title: `Success creating ${ res.data.data.title } event`,
                    description: "We've created your event for you.",
                    position: 'bottom-right',
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

            }
            else{
                alert(res.data.message)
            }

        }).catch( error => {
            console.log(error)
        })
    }

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'transparent', border: colorMode === 'light' ? "1px solid #E2E8F0" : "1px solid rgba( 255, 255, 255, .16)", borderRadius: '0.375rem' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: "transparent",
            color: "black",
            ':hover': {
                backgroundColor: 'teal',
                color: 'white',
            },
          };
        },
        multiValue: (styles, { data }) => {
          return {
            ...styles,
            backgroundColor: 'transparent',
            border: colorMode === 'light' ? "1px solid #E2E8F0" : "1px solid rgba( 255, 255, 255, .16)",
            borderRadius: '0.375rem'
          };
        },
        multiValueLabel: (styles, { data }) => ({
          ...styles,
          color: colorMode === 'light' ? "1px solid black" : "1px solid white",
        }),
        multiValueRemove: (styles, { data }) => ({
          ...styles,
          color: "red",
          borderRadius: '0.375rem',
          ':hover': {
            backgroundColor: 'red',
            color: 'white',
          },
        }),
      };

      const handleSelectChange = ( e ) => {
        
        setFormState( { ...formState, type : e } )
      }

    return (
        <Layout user = { user } page = { page }>
            <Container>
                <Box as='form' onSubmit={ e => handleSubmit(e)} borderWidth='1px' borderRadius='lg' p='20px' display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                    <FormControl isRequired mb='10px' >
                        <FormLabel>Title</FormLabel>
                        <Input type="text" placeholder='Title' value={ formState.title } onChange={ e => setFormState({ ...formState, title : e.target.value }) }/>
                    </FormControl>
                    <FormControl isRequired mb='10px' >
                        <FormLabel>Description</FormLabel>
                        <Textarea value={ formState.desc } placeholder='Desc' onChange={ e => setFormState({ ...formState, desc : e.target.value }) }/>
                    </FormControl>
                    <FormControl isRequired mb='10px' >
                        <FormLabel>Start</FormLabel>
                        <Input mb='2' type='date' value={ formState.startDate } onChange={ e => setFormState({ ...formState, startDate : e.target.value }) }/>
                        <Input type='time' value={ formState.startTime } onChange={ e => setFormState({ ...formState, startTime : e.target.value }) }/>
                        <FormHelperText>Default is set to current Date and Time</FormHelperText>
                    </FormControl>
                    <FormControl isRequired mb='10px' >
                        <FormLabel>End</FormLabel>
                        <Input mb='2' type='date' value={ formState.endDate } onChange={ e => setFormState({ ...formState, endDate : e.target.value }) }/>
                        <Input type='time' value={ formState.endTime } onChange={ e => setFormState({ ...formState, endTime : e.target.value }) }/>
                        <FormHelperText>Default is set to current Date and Time</FormHelperText>
                    </FormControl>
                    <FormControl isRequired mb='10px'>
                        <FormLabel>Location</FormLabel>
                        <Input type='text' value={ formState.location } placeholder='Location' onChange={ e => setFormState({ ...formState, location : e.target.value }) } id="location" />
                    </FormControl>
                    <FormControl isRequired mb='10px'>
                        <FormLabel>Type</FormLabel>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={options}
                            styles={colourStyles}
                            value={formState.type}
                            onChange={ e => handleSelectChange(e) }
                        />
                    </FormControl>
                    <FormControl display="flex" alignItems="center" isRequired>
                        <FormLabel>Public? </FormLabel>
                        <Switch value={ formState.isPublic } onChange={ e => setFormState({ ...formState, isPublic : e.target.checked }) } id="isPublic" />
                    </FormControl>
                    <Button type='submit' isLoading={isSubmiting} colorScheme='teal' variant='outline' mt='20px'>Submit</Button>
                </Box>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const cookie = ctx.req.headers.cookie

    try {

        const user = jwt.verify(cookie.substr(5), 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc') 

        if( !user && !ctx.req ){

            Router.replace('/login')
            return

        }
        else if ( !user && ctx.req ){

            ctx.res.writeHead( 302, { Location: '/login' } )
            ctx.res.end()
            return
        }
        else {

            return { props: { user: user } }
            
        }

    } catch (error) {
        
        return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }

    }

  }