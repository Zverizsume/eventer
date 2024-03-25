'use client'

import { createClient } from "@/utils/supabase/client"
import { Notification } from "@/utils/types";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";

export default function Notifications({notifs} : {notifs : Notification[]}) {

    const [ notifications, setNotifications ] = useState<Notification[]>(notifs)

    const supabase = createClient()

    useEffect(() => {

        

        const channel = supabase.channel('notify').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'notification'
        }, (payload) => {

            // do smtn when event happens

            setNotifications([...notifications, payload.new as Notification])

        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    },[])

    const Notification = ({n} : {n:Notification}) => {

        return (
            <div>{n.content}</div>
        )

    }

    return(

        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                        className="rounded-full bg-transparent border-1 min-w-0 p-1 h-auto"
                    >
                        {
                            notifications.length ? 
                                <div className="w-2 h-2 bg-blue-600 top-1 right-1"></div>
                            : ''
                        }
                        <Image className="invert" src={'/icons/bell.png'} alt={'bell'} width={20} height={20} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {
                        notifications.map( n => {

                            return(

                                <DropdownItem key={uuidv4()}>
                                    <Notification n={n} />
                                </DropdownItem>

                            )

                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </div>

    )

}