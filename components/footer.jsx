import React from 'react'
import { Box, Container, Flex, Text, useColorModeValue } from '@chakra-ui/react'

export default function Footer () {
    return (
        <Box
            pt = '20px'
            pb = '20px'
            bg = { useColorModeValue( 'gray.100', 'gray.900' ) }
            h = '20'
        >
            <Container maxW='8xl' >
                <Flex direction='column' justify='center' align='center'>
                    <Box>
                        <Text>Footer</Text>
                    </Box>
                    <Box>
                        <Text 
                            color={ useColorModeValue( 'gray.400', 'whiteAlpha.300' ) }
                        >© All Rights Reserved, {new Date().getFullYear()}</Text>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}