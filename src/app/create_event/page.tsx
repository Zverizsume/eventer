"use server"

import { getCategories, getUserData } from "@/actions";
import Calendar from "@/components/calendar";
import Navbar from "@/components/navbar";

const api_key = '65e08b0dd9937343511849zsm38e938'

interface GeoDataObject {

    name: string,
    state_name: string,
    country_name: string

}

export default async function createEvent() {

    const userData = await getUserData()
    const currentUserInfo = userData.data.user

    const { data : categoriesData, error : getCategoriesError, message : getCategoriesMessage } = await getCategories()

    if (!currentUserInfo) {

        return(

            <>
                <Navbar userData={ currentUserInfo } />
                <div>Must be logged in to view this page!</div>
            </>


        )

    }

    return (

        <div className="bg-[radial-gradient(circle_at_50%_-30%,rgb(144,17,105)_20%,rgb(0,0,0)_70%)]">
            <Navbar userData={ currentUserInfo } />
            <Calendar categories={categoriesData} />
        </div>

    )

}