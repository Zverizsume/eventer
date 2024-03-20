"use client"

import { getUsersInfoByIds, sendMessage, getChatHistory } from "@/actions"
import { createClient } from "@/utils/supabase/client"
import { Chat } from "@/utils/types"
import { Accordion, AccordionItem, Button, Divider, Input, Kbd, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"
import { User } from "@supabase/supabase-js"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
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

export default function Chat({chat_history, user} : {chat_history: ChatPlus[], user: User | null}) {

    const [ chat, setChat ] = useState(chat_history)
    const [ message, setMessage ] = useState('')

    const supabase = createClient()

    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

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

    const scrollLatestMessageIntoView = () => {

            console.log('Scrolling into view')

            chatRef?.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })

    }

    useEffect(() => {

        scrollLatestMessageIntoView()

    },[chat])

    const Message = ( {chatMessage} : {chatMessage: ChatPlus} ) => {

        return(

            <div className={`flex flex-col gap-2 ${user?.id === chatMessage.sender_id ? 'justify-end items-end bg-neutral-700' : 'justify-start items-start bg-neutral-800'} text-white rounded-lg p-2 min-w-0 w-auto`}>
                <div className='flex flex-col gap-0 justify-start items-start'>
                    <p className="text-xs text-foreground-600">{chatMessage.sender.email}</p>
                    <p className="text-foreground-400 text-xs">{dayjs(chatMessage.created_at).format('D/M/YYYY h:m A')}</p>
                </div>
                <p>{chatMessage.message}</p>
            </div>

        )

    }

    const handleMessageSend = async () => {

        if(message !== '') {

            const { data, error, message : successMessage } = await sendMessage("48b96ce4-f4b6-4abf-83a8-208444d4dd99", message)

            if( error ) {
                alert(`Error: ${successMessage}`)
            } else {

                console.log('New message data: ', data)
                setMessage('')

            }

        }

    }

    const handleKeyPressed = (e : React.KeyboardEvent<HTMLInputElement>) => {

        if( e.key === 'Enter' ) {

            handleMessageSend()

        }

    }

    return(

        <div className="fixed bottom-3 right-3 z-50">
                <Accordion onExpandedChange={scrollLatestMessageIntoView}  variant="shadow">
                    <AccordionItem className="w-80" key="1" aria-label="Accordion 1" title="Chat">
                        <div className="flex flex-col gap-3">
                            <div className="h-80 overflow-y-scroll scrollbar-hide justify-start items-start flex flex-col gap-2" ref={chatRef}>
                                {
                                    chat.map( (m, index, array) => {

                                        const next = index + 1

                                        if(array.length > next)

                                            if( dayjs(m.created_at).date() !== dayjs().date() && dayjs(array[next].created_at).date() === dayjs().date())

                                                return(

                                                    <div key={uuidv4()} className={`flex flex-col ${user?.id === m.sender_id ? 'justify-end items-end' : 'justify-start items-start'} gap-2 w-full`}>
                                                        <div className="relative flex justify-center py-3 w-full">
                                                            <Divider className="w-11/12" />
                                                            <p className="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-content1 px-3 text-foreground-400">Today</p>
                                                        </div>
                                                        <Message chatMessage={m} />
                                                    </div>

                                                )

                                        return(

                                            <div key={uuidv4()} className={`relative flex w-full ${user?.id === m.sender_id ? 'justify-end items-end' : 'justify-start items-start'}`}>
                                                <div className={`absolute w-3 h-3 top-0 ${user?.id === m.sender_id ? '-right-1 bg-neutral-700' : '-left-1 bg-neutral-800'} `}></div>
                                                <Message chatMessage={m} />
                                            </div>

                                        )

                                    })
                                }
                            </div>
                            <Input 
                                onKeyDown={handleKeyPressed}
                                type="text"
                                value={message}
                                onValueChange={setMessage}
                                endContent={
                                    <Button className="focus:outline-none shadow-md shadow-content1 p-0 min-w-0 bg-transparent h-auto" type="button" onClick={handleMessageSend}>
                                        <Kbd className="text-lg px-4 shadow-none py-1" title="Send message" keys={["enter"]}></Kbd>
                                    </Button>
                                }
                                placeholder="Message"
                            />
                        </div>
                    </AccordionItem>
                </Accordion>

        </div>
    )

}