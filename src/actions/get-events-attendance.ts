'use server'

import { createClient } from "@/utils/supabase/server"

type AttandanceData = {

    event_id : string,
    status: string

}

interface GetEventsAttandanceObject {

    data: AttandanceData[] | null,
    success: boolean,
    message: string

}

export async function getEventsAttendance() : Promise<GetEventsAttandanceObject> {

    const supabase = createClient()

    const { data, error } = await supabase.from('attendance').select('event_id, status')

    // console.log('Data: ', data)

    if( error )
    {
        return({
            data: null,
            success: false,
            message: `Error getting Events Attendance: ${error.message}`
        })
    }

    return({

        data: data,
        success: true,
        message: 'Success getting Events Attendance'

    })

}