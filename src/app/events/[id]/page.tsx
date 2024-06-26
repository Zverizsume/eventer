'use server'

import { getEvent, getEventAttendance, getUserData } from "@/actions"
import EventShow from "@/components/eventShow"
import Navbar from "@/components/navbar"

interface EventShowPageProps {

    params: {

        id: string

    }

}

export default async function EventShowPage({params} : EventShowPageProps) {

    const { id } = params

    const { data, error, message } = await getEvent(id)
    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    if(!data || error)
    {
        return(

            <>
                <Navbar userData={ currentUserInfo } />
                <div>
                    Error while getting data : {message}
                </div>
            </>

        )
    }
    else
    {

        const { data : attandanceData, message : getEventAttendanceMessage, success } = await getEventAttendance(data.id)
    
        if( success && attandanceData )

            return(
                <div className="min-h-screen">
                    <Navbar userData={ currentUserInfo } />
                    <EventShow event={ data } attandances={ attandanceData } user={currentUserInfo} />
                </div>
            )
        
        else

            return(

                <>
                    <Navbar userData={ currentUserInfo } />
                    <div>
                        Error while getting data : {getEventAttendanceMessage}
                    </div>
                </>

            )
    }

}