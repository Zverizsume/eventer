'use server'

import { createClient } from "@/utils/supabase/server"
import { EventObject } from "@/utils/types"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface EventsData {

    events : EventObject[],
    error: boolean,
    message: string

}

type Filter = {

    field: string,
    values: any[]

}

export async function getEvents( filter : Filter[] ) : Promise<EventsData> {

    const supabase = createClient()

    let query = supabase.from('event').select()

    filter.map( f => {

        if( f.field === 'order' )
            query = query.order('created_at', { ascending: f.values[0] === 'o' ? true : false })

        else if( f.field === 'limit' )
            query = query.limit(parseInt(f.values[0]))

        else if( f.field === 'search' )
            query = query.ilike('title', `%${f.values[0]}%`)

        else if( f.field === 'category' )
            query = query.contains('categories', f.values)

        else 
            query = query.in(f.field, f.values)

    })

    // console.log('Query:', query)

    const { data, error } = await query

    if( error ) {

        console.log('Error: ', error.message)

        return {

            events: [],
            error: true,
            message: error.message

        }

    }

    else if(data) {

        return {

            events: data,
            error: false,
            message: 'Success getting events.'

        }

    }

    else {

        return {

            events: [],
            error: false,
            message: 'Success getting events.'

        }

    }



    

}