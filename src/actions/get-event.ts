'use server'

import { createClient } from "@/utils/supabase/server"
import type { EventObject } from "@/utils/types"

interface GetEventObject {

    data: EventObject | null,
    error: boolean,
    message: string

}

export async function getEvent(id : string): Promise<GetEventObject> {

    const supabase = createClient()
    const { data , error } = await supabase.from('event').select().eq('id', id).limit(1).single()

    if( error ){

        return({
            data: data,
            error: true,
            message: error.message
        })

    }

    return ({

        data: data,
        error: false,
        message: 'Success fetching categories'

    })

}