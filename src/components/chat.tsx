"use client"

import { getUsersInfoByIds, sendMessage, getChatHistory } from "@/actions"
import { createClient } from "@/utils/supabase/client"
import { Chat } from "@/utils/types"
import { Accordion, AccordionItem, Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

type ChatPlus = {

    id?: string,
    sender_id: string,
    receiver_id: string,
    message: string,
    created_at?: string,
    sender: {
        email: string
        username: string,
        full_name: string
    },
    receiver: {
        email: string
        username: string,
        full_name: string
    }

}

export default function Chat({chat_history} : {chat_history: ChatPlus[]}) {

    const [ chat, setChat ] = useState(chat_history)
    const [ message, setMessage ] = useState('')

    const supabase = createClient()

    // const getUsersInfo = async () => {

    //     const unique = [...chat.map( c => c.receiver_id ), ...chat.map( c => c.sender_id )].filter( (value, index, array) => array.indexOf(value) === index )

    //     console.log('Unique: ', unique)

    //     const data = await getUsersInfoByIds(unique)

    //     console.log('Data: ', data)

    // }

    useEffect(() => {

        // getUsersInfo()

        const channel = supabase.channel('chat_notify').on('postgres_changes',{
            event: 'INSERT',
            schema: 'public',
            table: 'chat'
        }, async (payload) => {

            const { data, error } = await getChatHistory()

            setChat(data)

        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    },[])

    const Message = ( {chatMessage} : {chatMessage: ChatPlus} ) => {

        return(

            <div className='flex flex-col gap-2 justify-start items-start text-white bg-neutral-800 rounded-lg p-2 min-w-0 w-auto'>
                <div className='flex flex-col gap-0 justify-start items-start'>
                    <p className="text-xs text-foreground-600">{chatMessage.sender.email}</p>
                    <p className="text-foreground-400 text-xs">{dayjs(chatMessage.created_at).format('D/M/YYYY h:m A')}</p>
                </div>
                <p>{chatMessage.message}</p>
            </div>

        )

    }

    const handleMessageSend = async () => {

        const { data, error, message : successMessage } = await sendMessage("48b96ce4-f4b6-4abf-83a8-208444d4dd99", message)

        if( error ) {
            alert(`Error: ${successMessage}`)
        } else {

            console.log('New message data: ', data)
            setMessage('')

        }

    }

    return(

        <div className="fixed bottom-3 right-3">
                <Accordion variant="shadow">
                    <AccordionItem className="w-80" key="1" aria-label="Accordion 1" title="Chat">
                        <div className="flex flex-col gap-3">
                            <div className="h-80 overflow-y-scroll flex flex-col gap-2">
                                {
                                    chat.map( m => {

                                        return(

                                            <Message key={uuidv4()} chatMessage={m} />

                                        )

                                    })
                                }
                            </div>
                            <Input 
                                type="text"
                                value={message}
                                onValueChange={setMessage}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={handleMessageSend}>
                                        send
                                    </button>
                                }
                                placeholder="Message"
                            />
                        </div>
                    </AccordionItem>
                </Accordion>
            {/* <Popover className="bg-transparent" color="default" placement="top-end" showArrow={true}>
                <PopoverTrigger>
                    <Button 
                        variant="bordered"
                        color="warning"
                    >
                        Chat
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-2">
                        {
                            chat.map( m => {

                                return(

                                    <Message key={uuidv4()} chatMessage={m} />

                                )

                            })
                        }
                        <Input 
                            type="text"
                            value={message}
                            onValueChange={setMessage}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={handleMessageSend}>
                                    send
                                </button>
                            }
                            placeholder="Message"
                        />
                    </div>
                </PopoverContent>
            </Popover> */}
        </div>
    )

}