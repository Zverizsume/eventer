'use server'

import { createClient } from "@/utils/supabase/server"
import { EventObject } from "@/utils/types"

interface EventsData {

    events : EventObject[],
    error: boolean,
    message: string

}

export async function getEvents() : Promise<EventsData> {

    const supabase = createClient()
        
        const { data, error } = await supabase.from('event').select()

        if( !error && data )

            return {

                events: data,
                error: false,
                message: 'Success getting events.'

            }

        else

            return {

                events: [],
                error: true,
                message: error.message

            }

    

}