'use server'

import { createClient } from "@/utils/supabase/server"

type AttandanceData = {

    going: number,
    rejected?: number,
    pending?: number 

}

interface GetEventAttandanceObject {

    data: AttandanceData | null,
    success: boolean,
    message: string

}
// : Promise<GetEventAttandanceObject>
export async function getEventAttendance( eventId : string ): Promise<GetEventAttandanceObject> {

    const supabase = createClient()
    const { data : userData, error : userError } = await supabase.auth.getUser()

    if( userError ){

        return({
            data: null,
            success: false,
            message: 'You must be logged in.'
        })

    }

    const { data : attandances, error : getAattendancesError } = await supabase.from('attendance').select().eq('event_id', eventId)

    // console.log('Attandance data: ', attandances )

    if( getAattendancesError ) {

        return({

            data: null,
            success: false,
            message: `Error while getting attandances: ${getAattendancesError.message}`

        })

    }

    let attendanceData : AttandanceData = {

        going: 0,
        pending: 0,
        rejected: 0

    }

    if(attandances)

        attandances.forEach( att => {
            
            switch (att.status) {
                case 'going':
                    
                    attendanceData.going++
                    break;
                case 'pending':

                    attendanceData.pending? attendanceData.pending++ : null
                    break

                case 'rejected':

                    attendanceData.rejected? attendanceData.rejected++ : null
                    break

                default:
                    break;
            }

        });

    return({

        data: attendanceData,
        success: true,
        message: 'Successfuly retrieved attandances'

    })

}