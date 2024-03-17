'use server'

import { getEvents, getEventsAttendance, getUserData } from "@/actions"
import EventsList from "@/components/eventsList"
import Navbar from "@/components/navbar"

export default async function ShowEventsPage() {

    const { events, error, message : getEventsMessage } = await getEvents()
    const { data : eventsAttendanceData, message : getEventsAttendancesMessage, success } = await getEventsAttendance()

    if( !success )
    {
        console.log('Error getting Attendances: ', getEventsAttendancesMessage)
    }

    console.log('Data att: ', eventsAttendanceData)

    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-30%,rgb(144,17,105)_20%,rgb(0,0,0)_70%)]">
            <Navbar userData={currentUserInfo} />
            <div className="flex justify-center items-center">
                <EventsList events={events} attendances={eventsAttendanceData ? eventsAttendanceData : []} />
            </div>
        </div>

    )

}