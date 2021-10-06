import {
    Input,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    Textarea,
    FormLabel,
    Switch,
    Button,
    Box,
    useColorMode,
  } from "@chakra-ui/react"
import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { Container } from '@chakra-ui/react'
import Layout from '../../components/layout'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useToast } from "@chakra-ui/react"

const animatedComponents = makeAnimated()

export default function Event({ eventE, user }) {

  const options = [
    { value: 'music', label: 'Music' },
    { value: 'sport', label: 'Sport' },
    { value: 'cinema', label: 'Cinema' }
  ] 

  const { colorMode, toggleColorMode } = useColorMode()

  const toast = useToast()

  const [ event, setEvent ] = useState(eventE)
  
  let selectedOptions = event.type.map( e => {
    return { value: e, label: e.charAt(0).toUpperCase() + e.slice(1) }
  })

  const [ formState, setFormState ] = useState({
      title : event.title,
      desc : event.desc,
      startDate : moment(event.start).format('yyyy-MM-DD'),
      startTime : moment(event.start).format('HH:mm'),
      endDate : moment(event.end).format('yyyy-MM-DD'),
      endTime : moment(event.end).format('HH:mm'),
      location : event.location,
      type : selectedOptions,
      isPublic : event.isPublic,
      submited : false
  })

  const [ validState, setValidState ] = useState({
    title : {
        valid: true,
        invalidMessage: ''
    },
    desc : {
        valid: true,
        invalidMessage: ''
    },
    startAt : {
        valid: true,
        invalidMessage: ''
    },
    endAt : {
        valid: true,
        invalidMessage: ''
    },
    location : {
        valid: true,
        invalidMessage: ''
    },
  })

  const page = {
    title : 'Event / ' + event.title,
    desc : 'This is event page',
    canonical: 'https://eventer.gg' + `/event/${event._id}`
  }

  const formValidator = async ( ) => {

    const validStateTemp = {
        title: {
            valid : formState.title != '',
            invalidMessage : formState.title != '' ? '' : 'Field must not be empty!'
        },
        desc: {
            valid : formState.desc != '',
            invalidMessage : formState.desc != '' ? '' : 'Field must not be empty!'
        },
        startAt : {
            valid: formState.startDate !== '' && formState.startTime !== '',
            invalidMessage: 'Invalid Date/Time : Fields must not be empty!'
        },
        endAt : {
            valid: formState.endDate !== '' && formState.endTime !== '' && !moment(formState.startDate + ' ' + formState.startTime).isAfter(moment(formState.endDate + ' ' + formState.endTime)),
            invalidMessage: formState.startDate === '' || formState.startTime === '' ? 'Invalid Date/Time : Fields must not be empty!' :'Invalid Date/Time : Are you dumb!?'
        },
        location : {
            valid: formState.location != '',
            invalidMessage: formState.location != '' ? '' : 'Field must not be empty!'
        }
    }

    setValidState(
        validStateTemp
    )

    for (const field in validStateTemp) {
        if( !validState[field].valid ) return false
    }

    return true
  }

  const handleEventUpdate = async ( e, res ) => {

    e.preventDefault()

    if(!res){
        console.log( "Form Validation Error! " )
    }
    else {
        const id = eventE._id

        const typeArray = formState.type.map( a => { return a.value })

        await axios.put(`/api/events/${id}`,{
            title : formState.title,
            desc : formState.desc,
            start : formState.startDate + ' ' + formState.startTime,
            end : formState.endDate + ' ' + formState.endTime,
            location : formState.location,
            type : typeArray,
            isPublic : formState.isPublic
        })
        .then( res => {
            if(res.data.success){
              
              setEvent(res.data.data)
    
              toast({
                title: `Success updating ${ res.data.data.title } event`,
                description: "We've updated your event for you.",
                position: 'bottom-right',
                status: "success",
                duration: 9000,
                isClosable: true,
              })

            }
            else{

                toast({
                    title: `Error updating ${ eventE.title } event`,
                    description: res.data.message,
                    position: 'bottom-right',
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  })
            }
        }).catch( err => {
            console.log(err)
        })
    }
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
    <Layout page = { page } user = { user } > 
      <Container mt='25px'>
            <Box as='form' borderWidth='1px' borderRadius='lg' p='20px' display='flex' flexDir='column' justifyContent='center' alignItems='center'>
                <FormControl isInvalid = { !validState.title.valid } isRequired mb='10px' >
                    <FormLabel>Title</FormLabel>
                    <Input type="text" placeholder='Title' value={ formState.title } onChange={ e => setFormState({ ...formState, title : e.target.value }) }/>
                    <FormErrorMessage>{ validState.title.invalidMessage }</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = { !validState.desc.valid } isRequired mb='10px' >
                    <FormLabel>Description</FormLabel>
                    <Textarea value={ formState.desc } placeholder='Desc' onChange={ e => setFormState({ ...formState, desc : e.target.value }) }/>
                    <FormErrorMessage>{ validState.desc.invalidMessage }</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = { !validState.startAt.valid } isRequired mb='10px' >
                    <FormLabel>Start</FormLabel>
                    <Input type='date' value={ formState.startDate } onChange={ e => setFormState({ ...formState, startDate : e.target.value }) }/>
                    <Input type='time' value={ formState.startTime } onChange={ e => setFormState({ ...formState, startTime : e.target.value }) }/>
                    <FormHelperText>Default is set to current Date and Time</FormHelperText>
                    <FormErrorMessage>{ validState.startAt.invalidMessage }</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = { !validState.endAt.valid } isRequired mb='10px' >
                    <FormLabel>End</FormLabel>
                    <Input type='date' value={ formState.endDate } onChange={ e => setFormState({ ...formState, endDate : e.target.value }) }/>
                    <Input type='time' value={ formState.endTime } onChange={ e => setFormState({ ...formState, endTime : e.target.value }) }/>
                    <FormHelperText>Default is set to current Date and Time</FormHelperText>
                    <FormErrorMessage>{ validState.endAt.invalidMessage }</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid = { !validState.location.valid } isRequired mb='10px'>
                    <FormLabel>Location</FormLabel>
                    <Input type='text' value={ formState.location } placeholder='Location' onChange={ e => setFormState({ ...formState, location : e.target.value }) } id="location" />
                    <FormErrorMessage>{ validState.location.invalidMessage }</FormErrorMessage>
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
                    <Switch isChecked={ formState.isPublic } onChange={ e => setFormState({ ...formState, isPublic : e.target.checked }) } id="isPublic" />
                </FormControl>
                <Button type='submit' onClick={ (e) => formValidator().then( ( res ) => handleEventUpdate(e, res)) } w='max' colorScheme='teal' borderRadius='lg' variant='outline'>Apply changes</Button>
            </Box>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {

    const cookie = ctx.req.headers.cookie
    const eventId = ctx.query.id
  console.log(eventId)
    try {

      const user = jwt.verify(cookie.substr(5), 'aeeac1db-b898-4f93-9fc4-51b4ee770dfc') 

      const resp = await axios.get(`http://localhost:3000/api/events/${eventId}`)
    
      if( resp.data.success === false &&  !ctx.req ) {
        Router.replace('/login')
        return
      }
      else if( resp.data.success === false && !ctx.req ){
        ctx.res.writeHead( 302, { Location: '/login' } )
        ctx.res.end()
        return
      }
      else {
        return { props : { eventE : resp.data.data, user: user } }
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