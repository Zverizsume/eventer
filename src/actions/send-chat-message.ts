'use server'

import { createClient } from "@/utils/supabase/server"
import { Chat } from "@/utils/types"

interface ChatMessageObject {

    data: Chat[],
    error: boolean,
    message: string

}

export async function sendMessage( receiver : string, message : string ): Promise<ChatMessageObject> {

    const supabase = createClient()

    const { data : userData, error : getUserError } = await supabase.auth.getUser()

    if( userData && userData.user ) {

        let new_message : Chat = {

            sender_id: userData.user.id,
            receiver_id: receiver,
            message: message

        }

        const { data : chatInsertData, error : getChatInsertError } = await supabase.from('chat').insert(new_message).select()

        if( getChatInsertError ){

            // console.log('Error : ', getChatError)

            return({
                data: [],
                error: true,
                message: getChatInsertError.message
            })

        }

        return ({

            data: chatInsertData,
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