import React from 'react'

import {
  Container,
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';

const Links = [
    { title: 'Events', href : '/' },
    { title: 'My Events', href : '/myEvents' },
    { title: 'My Calendar', href : '/myCalendar' },
    { title: 'Create Event', href : '/createEvent' }
];

const NavLink = ({ children }) => (

        <Link
            href = {children.href}
        >
            <Button
                color = { useColorModeValue( 'gray.500', 'whiteAlpha.500' ) }
                boxShadow = { useColorModeValue( 'md', 'sm' ) }
                _hover = {{
                    bg: useColorModeValue( 'gray.300', 'whiteAlpha.300' )
                }}
            >
                { children.title }
            </Button>
        </Link>
);

export default function Navbar({ user }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const router = useRouter()

    const logout = async () => {
        await axios.post('/api/logout').then( res => {
            router.push('/login')
        })
    }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <Container maxW='8xl'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'} pl='12' pr='12'>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
                <Image 
                    src = 'https://image.flaticon.com/icons/png/512/839/839636.png'
                    alt = 'Logo_image'
                    width = '40px'
                    height = '40px'
                    priority
                />
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link, index) => (
                <NavLink key={index}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <IconButton boxShadow='md' mr='3' onClick={toggleColorMode} isRound size='sm' icon={ colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }/>
            <Menu>
                <MenuButton>
                    <Avatar boxShadow='md' name={ user ? user.name : '' } />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => router.push(`/profile`)}  >
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => router.push('/myEvents')} >
                        My events
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logout}>
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
