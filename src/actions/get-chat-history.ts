'use server'

import { createClient } from "@/utils/supabase/server"
import { Chat } from "@/utils/types"

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

interface ChatHistoryObject {

    data: ChatPlus[],
    error: boolean,
    message: string

}

export async function getChatHistory(): Promise<ChatHistoryObject> {

    const supabase = createClient()

    const { data : userData, error : getUserError } = await supabase.auth.getUser()

    if( userData && userData.user ) {

        const { data : chatData, error : getChatError } = await supabase.from('chat').select(`
            *,
            sender:public_chat_sender_id_fkey(email, full_name, username),
            receiver:public_chat_receiver_id_fkey(email, full_name, username)
        `)

        // console.log('Data: ', chatData)

        if( getChatError ){

            // console.log('Error : ', getChatError)

            return({
                data: [],
                error: true,
                message: getChatError.message
            })

        }

        return ({

            data: chatData,
            error: false,
            message: 'Success fetching chat history'

        })

    }
    else {

        return({
            data: [],
            error: true,
            message: 'No user logged in'
        })

    }

}