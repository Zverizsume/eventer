import { getEvents, getEventsAttendance, getUserData } from "@/actions"
import EventsList from "@/components/eventsList"
import LoadingEvent from "@/components/loading/loadingEvent"
import Navbar from "@/components/navbar"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
    metadataBase: new URL('https://eventer-six.vercel.app'),
    alternates: {
      canonical: '/events'
    },
    title: 'Events / Eventer',
    description: `Do you crave unforgettable experiences, thrilling adventures, or simply connecting with like-minded individuals? Look no further, because Eventer has got you covered!
    Whether you're an event organizer or an enthusiastic attendee, our app offers a seamless platform to create, discover, and attend a diverse range of events.`,
    openGraph: {
      images: ['/bg_illustrations/card_bg_1.png']
    }
}

type Filter = {

    field: string
    values : any[]

}

export default async function ShowEventsPage() {

    const filter: Filter[] = [
        {
            field: 'limit',
            values: ['10']
        },
        {
            field: 'order',
            values: ['l']
        }
    ]

    const { events, error, message : getEventsMessage } = await getEvents(filter)
    const { data : eventsAttendanceData, message : getEventsAttendancesMessage, success } = await getEventsAttendance()

    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    return (
        <div className="min-h-screen">
            <Navbar userData={currentUserInfo} />
            <div className="flex justify-center items-center">
                <Suspense fallback={<LoadingEvent />} >
                    <EventsList events={events} attendances={eventsAttendanceData ? eventsAttendanceData : []} />
                </Suspense>
            </div>
        </div>

    )

}