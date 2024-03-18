'use server'

import { createClient } from "@/utils/supabase/server"
import { Notification } from "@/utils/types"

interface NotificationObject {

    data: Notification[],
    error: boolean,
    message: string

}

export async function getNotifications(): Promise<NotificationObject> {

    const supabase = createClient()
    const { data, error } = await supabase.from('notification').select()

    if( error ){

        return({
            data: [],
            error: true,
            message: error.message
        })

    }

    return ({

        data: data,
        error: false,
        message: 'Success fetching notifications'

    })

}