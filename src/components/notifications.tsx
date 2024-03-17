'use client'

import { createClient } from "@/utils/supabase/client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react"

export default function Notifications() {

    const [ notifications, setNotifications ] = useState<RealtimePostgresInsertPayload<{ [key: string]: any; }>[]>([])

    const supabase = createClient()

    useEffect(() => {

        const channel = supabase.channel('notify').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'event'
        }, (payload) => {

            // do smtn when event happens

            console.log('Payload: ', payload)
            let updatedNotif = [...notifications]
            updatedNotif.push(payload)
            setNotifications(updatedNotif)

        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    },[])

    return(

        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                        variant="bordered" 
                    >
                        Notifications
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {
                        notifications.map( n => {

                            return(

                                <DropdownItem>
                                    {n.commit_timestamp}
                                </DropdownItem>

                            )

                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </div>

    )

}