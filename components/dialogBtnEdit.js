import {
    Input,
    FormControl,
    FormHelperText,
    Textarea,
    FormLabel,
    Switch,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import React, { useState } from "react"

export default function DialogBtn({ event, editEvent }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const [ formState, setFormState ] = useState({
        title : event.title,
        desc : event.desc,
        startDate : event.startDate,
        startTime : event.startTime,
        endDate : event.endDate,
        endTime : event.endTime,
        location : event.location,
        isPublic : event.isPublic,
        submited : false
    })

    return (
      <>
        <Button fontSize='sm' w='max' variant='solid' borderRadius='lg' colorScheme='yellow' onClick={ onOpen } leftIcon={<EditIcon />} >Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Editting Event '${event.name}'`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as='form'  borderWidth='1px' borderRadius='lg' p='20px' display='flex' flexDir='column' justifyContent='center' alignItems='center'>
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
                    <Input type='date' value={ formState.startDate } onChange={ e => setFormState({ ...formState, startDate : e.target.value }) }/>
                    <Input type='time' value={ formState.startTime } onChange={ e => setFormState({ ...formState, startTime : e.target.value }) }/>
                    <FormHelperText>Default is set to current Date and Time</FormHelperText>
                </FormControl>
                <FormControl isRequired mb='10px' >
                    <FormLabel>End</FormLabel>
                    <Input type='date' value={ formState.endDate } onChange={ e => setFormState({ ...formState, endDate : e.target.value }) }/>
                    <Input type='time' value={ formState.endTime } onChange={ e => setFormState({ ...formState, endTime : e.target.value }) }/>
                    <FormHelperText>Default is set to current Date and Time</FormHelperText>
                </FormControl>
                <FormControl isRequired mb='10px'>
                    <FormLabel>Location</FormLabel>
                    <Input type='text' value={ formState.location } placeholder='Location' onChange={ e => setFormState({ ...formState, location : e.target.value }) } id="location" />
                </FormControl>
                <FormControl display="flex" alignItems="center" isRequired>
                    <FormLabel>Public? </FormLabel>
                    <Switch value={ formState.isPublic } onChange={ e => setFormState({ ...formState, isPublic : e.target.checked }) } id="isPublic" />
                </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Discard
            </Button>
            <Button variant="ghost" onClick={() => {onClose; editEvent(event._id)}}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }