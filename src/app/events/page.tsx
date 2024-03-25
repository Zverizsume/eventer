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

export default async function ShowEventsPage() {

    const { events, error, message : getEventsMessage } = await getEvents()
    const { data : eventsAttendanceData, message : getEventsAttendancesMessage, success } = await getEventsAttendance()

    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-30%,rgb(144,17,105)_20%,rgb(0,0,0)_70%)]">
            <img src={'/bg_lines.svg'} alt={'bg_lines'} className="absolute z-1 top-0 left-0 w-100v h-100v object-cover" />
            <Navbar userData={currentUserInfo} />
            <div className="flex justify-center items-center">
                <Suspense fallback={<LoadingEvent />} >
                    <EventsList events={events} attendances={eventsAttendanceData ? eventsAttendanceData : []} />
                </Suspense>
            </div>
        </div>

    )

}