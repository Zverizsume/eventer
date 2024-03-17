'use client'

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from "@nextui-org/react";
import { logout } from "@/actions";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import LoginModal from "./loginModal";

const links = [

    {
        title: 'My events',
        key: 'myevents',
        href: '/my_events',
    },
    {
        title: 'Activity',
        key: 'activity',
        href: '/activity',
    },
    {
        title: 'Profile',
        key: 'profile',
        href: '/profile',
    },

]

export default function LoginButton({ userData } : { userData : User | null }) {

    const [ buttonLoading, setButtonLoading ] = useState(false)

    const handleLogout = () => {

        setButtonLoading(true)
        logout()

    }

    if( userData )
    {
        return (

            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <Avatar 
                        showFallback
                        isBordered
                        radius="full"
                        className={'w-auto h-9 m-0 p-0 min-w-9'}
                        as={Button}
                        src={userData.user_metadata?.avatar_url}
                        name={userData.user_metadata?.full_name}
                        isLoading={buttonLoading}
                        spinner={
                            <svg
                                className="animate-spin h-5 w-5 text-current absolute top-2 left-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            <circle
                              className="opacity-30"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-90"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              fill="currentColor"
                            />
                          </svg>
                        }
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    {
                        links.map( link => (<DropdownItem as={Link} key={link.key} href={link.href}>{link.title}</DropdownItem>))
                    }
                    <DropdownItem key="logout" className="text-danger" color="danger" onClick={handleLogout} >
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        )
    }

    return(

        <LoginModal />

    )

}