import React from 'react'

import { useState } from 'react';
import { Box, Button, Stack, Badge, Text, Divider, HStack, Tag, TagLabel, TagRightIcon, Flex } from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import Countdown from 'react-countdown';
import { useToast } from '@chakra-ui/toast';
import { EditIcon } from '@chakra-ui/icons'
import DialogBtnDelete from './dialogButton';
import DialogBtnEdit from './dialogBtnEdit';
import { useRouter } from 'next/router';
import { RiBasketballFill as sport, RiMovie2Line as cinema } from 'react-icons/ri'
import { GiMusicalNotes as music } from 'react-icons/gi'

const DateBadge = ( { children } ) => (
    <Badge
        w='45px'
        h='45px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize='xl'
        textTransform='lowercase'
        variant="subtle"
        colorScheme="teal"
        borderRadius='full'
        ml='5px'
        mr='5px'
        boxShadow='xs'
    >
        { children }
    </Badge>
)

export default function Event ( { event, userId, handleRemove, myEvents } ) {   

    const toast = useToast()
    const router = useRouter()

    const [ attendants, setAttendants ] = useState( event.attendants || new Array() )

    const startAt = moment(Date.parse(event.start))
    const startAtDate = startAt.format('DD MMM')
    const startAtTime = startAt.format('HH:mm')

    const endAt = moment(Date.parse(event.end))
    const endAtDate = endAt.format('DD MMM')
    const endAtTime = endAt.format('HH:mm')

    const handleAttend = async ( ) => {
        
        await axios.put(`/api/events/${event._id}`, {
            flag: 'addAttendant',
            userId: userId
        }).then( res => {
            if(res.data.success){
                let newArray = [ ...attendants ]
                newArray.push( userId )
                //console.log( newArray )
                setAttendants( newArray )

                toast({
                    title: `Success attending ${ event.title } event`,
                    description: "We've created your event for you.",
                    position: 'bottom-right',
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            }
        }).catch( err => {
            console.log(err)
        })

    }

    const handleMiss = async ( ) => {
        
        await axios.put(`/api/events/${event._id}`, {
            flag: 'removeAttendant',
            userId: userId
        }).then( res => {
            if(res.data.success){
                let newAttendants = [ ...attendants ]
                newAttendants = newAttendants.filter( att => att != userId )
                //console.log( newAttendants )
                setAttendants( newAttendants )

                toast({
                    title: `Success missing ${ event.title } event`,
                    description: "We've created your event for you.",
                    position: 'bottom-right',
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            }
        }).catch( err => {
            console.log(err)
        })

    }

    const CompletionistStart = () => <span>Event has started!</span>
    const CompletionistEnd = () => <span>Event has finished!</span>

    //console.log(endDate.diff(startAt, 'd'))

    const dateRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {

          return moment().isAfter(startAt) ? <Box mb='15px'><CompletionistEnd /></Box> : <Box mb='15px'><CompletionistStart /></Box>

        } else {

            return  <Box mb='15px' display='flex' justifyContent='center' alignItems='center' flexDir='column'>
                        {   moment().isAfter(startAt) ? <Text> Event is ongoing </Text> : <Text> Event is about to start in </Text> }
                        <Box mt='10px' display='flex' justifyContent='center' alignItems='center' flexDir='row'>
                            
                            {  days !== 0 ? <><DateBadge>{days + 'd'}</DateBadge><Text colorScheme='teal'>  :  </Text></> : null }
                            {  hours !== 0 ? <><DateBadge>{hours + 'h'}</DateBadge><Text colorScheme='teal'>  :  </Text></> : null }
                            {  minutes !== 0 ? <><DateBadge>{minutes + 'm'}</DateBadge><Text colorScheme='teal'>  :  </Text></> : null }
                            <DateBadge>{seconds + 's'}</DateBadge>
                        </Box>
                    </Box>
        }
    }
    console.log( event )
    return (
        <Box boxShadow='base' mb='25px' display='flex' justifyContent='center' flexDir='column' borderWidth='1px' borderRadius='lg' p='20px' width='100%'>
            <Box display='flex' alignItems='center' flexDir='row'>
                <Box as='h2' fontSize='30px' fontWeight='600'>{event.title}</Box>
                <Box display='flex' alignItems='center' ml='auto'>{endAt.diff(startAt, 'd') !== 0 ? startAtDate + ' - ' + endAtDate : startAtDate}</Box>
            </Box>
            <Box mt='15px' mb='15px'>
                <Box>
                    <Text align='center'>
                        {event.desc}
                    </Text>
                </Box>
                <Divider h='0px !important' w='90%' mt='15px' mb='15px' ml='auto' mr='auto' opacity='.25' />
                <Box>
                    <Text align='center'>
                        {event.location}
                    </Text>
                </Box>
                <Divider h='0px !important' w='90%' mt='15px' mb='15px' ml='auto' mr='auto' opacity='.25' />
                <Box ml='5%'>
                    <Text>
                        {attendants.length + " Going"}
                    </Text>
                </Box>
            </Box>
            <Box>
                {
                    moment().isAfter(startAt) ?
                    <Countdown
                        date = { endAt.valueOf() }
                        renderer = { dateRenderer } 
                    />
                    :
                    <Countdown
                        date = { startAt.valueOf() }
                        renderer = { dateRenderer } 
                    />
                }
            </Box>
            <Flex direction='row'>
                {
                    myEvents ?  <Stack direction='row'>
                                    <DialogBtnDelete event = { event } removeEvent = { handleRemove } />
                                    <Button fontSize='sm' w='max' variant='solid' borderRadius='lg' colorScheme='yellow' onClick={ () => router.push(`/event/${event._id}`) } leftIcon={<EditIcon />} >Edit</Button>
                                </Stack>
                    :
                    !attendants.includes( userId ) ? <Button w='max' onClick={ handleAttend }>Attend</Button> : <Button w='max' onClick={ handleMiss }>Miss</Button>
                }
                {
                    <HStack ml='auto' spacing={3}>
                        {event.type.map((et, index) => (
                            <Tag size='sm' key={index} variant="outline" colorScheme="teal">
                                <TagLabel>{et}</TagLabel>
                                <TagRightIcon as={ et === 'sport' ? sport : et === 'cinema' ? cinema : music } />
                            </Tag>
                        ))}
                    </HStack>
                }
            </Flex>
        </Box>
    )

}