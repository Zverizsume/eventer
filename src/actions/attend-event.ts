'use server'

import { createClient } from "@/utils/supabase/server"
import { attendanceStatus, eventTypes } from "@/utils/types"
import { revalidatePath } from "next/cache"

interface AttendEventReturnObject {

    success: boolean,
    message?: string 

}

interface AttendanceObject {

    user_id: string,
    event_id: string,
    status: string

}

export async function attendEvent( eventId : string, eventType : string ): Promise<AttendEventReturnObject> {

    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if( error )
        return({
            success: false,
            message: 'Must be logged in.'
        })

    const newAttendance : AttendanceObject = {

        event_id: eventId,
        user_id: data.user.id,
        status: eventType === eventTypes.public ? attendanceStatus.going : attendanceStatus.pending

    }

    const { data : attendanceData , error : attendanceError } = await supabase.from('attendance').insert(newAttendance).select()

    if( attendanceError )
    {
        return({

            success: false,
            message: `Error while attending event:, ${attendanceError.message}`
    
        })
    }

    return({

        success: true,
        message: 'U have successfuly attended the Event.'

    })

}