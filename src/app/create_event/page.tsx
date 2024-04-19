import { getCategories, getCalendarEvents, getUserData } from "@/actions";
import Calendar from "@/components/calendar";
import Navbar from "@/components/navbar";
import { Metadata } from "next";

const api_key = '65e08b0dd9937343511849zsm38e938'

interface GeoDataObject {

    name: string,
    state_name: string,
    country_name: string

}

export const metadata: Metadata = {
    metadataBase: new URL('https://eventer-six.vercel.app'),
    alternates: {
      canonical: '/create_event'
    },
    title: 'Create Event / Eventer',
    description: `Do you crave unforgettable experiences, thrilling adventures, or simply connecting with like-minded individuals? Look no further, because Eventer has got you covered!
    Whether you're an event organizer or an enthusiastic attendee, our app offers a seamless platform to create, discover, and attend a diverse range of events.`,
    openGraph: {
      images: ['/bg_illustrations/card_bg_1.png']
    }
}

export default async function createEvent() {

    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    const { data : categoriesData, error : getCategoriesError, message : getCategoriesMessage } = await getCategories()
    const { events } = await getCalendarEvents()

    if (!currentUserInfo) {

        return(

            <>
                <Navbar userData={ currentUserInfo } />
                <div>Must be logged in to view this page!</div>
            </>


        )

    }

    return (

        <div className="">
            <Navbar userData={ currentUserInfo } />
            <Calendar categories={categoriesData === null ? [] : categoriesData} myEvents={events} />
        </div>

    )

}