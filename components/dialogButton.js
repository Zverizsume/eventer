import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
  } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useDisclosure } from "@chakra-ui/hooks"
import React from "react"

export default function DialogBtn({ event, removeEvent, }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button fontSize='sm' w='max' variant='solid' borderRadius='lg' colorScheme='red' onClick={ onOpen } leftIcon={<DeleteIcon />} >Remove</Button>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent>
            <AlertDialogHeader>Remove Event?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {`Are you sure you want to remove event '${event.title}'?`}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={ onClose }>
                No
              </Button>
              <Button colorScheme="red" ml={3} onClick={ () => {onClose; removeEvent(event._id)} }>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }