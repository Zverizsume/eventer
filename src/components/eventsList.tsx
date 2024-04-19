'use client'

import EventCard from "./event";
import { v4 as uuidv4 } from 'uuid'
import { EventObject } from "@/utils/types";
import FilterSideBar from "./filterSideBar";
import { useEffect, useState } from "react";
import { Chip, Input } from "@nextui-org/react";
import { getEvents } from "@/actions";
import FilterTopBar from "./filterTopBar";

type Attendance = {

    event_id: string,
    status: string

}

type Props = {

    events : EventObject[]
    attendances : Attendance[] | []
}

type Filter = {

    field: string,
    values: any[]

}

export default function EventsList({events, attendances} : Props) {

    const [ eventsToShow, setEventsToShow ] = useState(events)
    const [ activeFilters, setActiveFilters ] = useState<Filter[]>(
        [
            {
                field: 'order',
                values: ['l']
            },
            {
                field: 'limit',
                values: ['10']
            },
        ]
    )

    const getFilteredEvents = async () => {

        const { error, events: filteredEvents, message } = await getEvents(activeFilters)

        if( !error )

            setEventsToShow(filteredEvents)

    }

    useEffect(() => {


        getFilteredEvents()


    },[activeFilters])

    return(

        <div className="container max-w-screen-lg px-5">

            <div className="flex flex-col">

                <div className="fixed left-[40px] top-[65px] pt-10 max-2xl:hidden 2xl:block ">
                    <FilterSideBar setActiveFilters={setActiveFilters} />
                </div>

                <div className="flex flex-col gap-4 w-full py-10">

                    <FilterTopBar setActiveFilters={setActiveFilters} activeFilters={activeFilters} />

                    <div className="flex flex-col gap-6 w-full">

                    {

                        eventsToShow.length ?

                            eventsToShow.map( event => {

                                const going = attendances ? attendances.filter( att => att.event_id === event.id && att.status === 'going' ).length : 0

                                return(

                                    <EventCard 
                                        key={uuidv4()}
                                        event={event}
                                        going={going}
                                    />

                                )

                            })

                        :

                        
                            activeFilters.length > 2 ?

                                <div className="h-[70vh] flex flex-col justify-center items-center">
                                    <p className="text-3xl">No events match your filters</p>
                                    <p className="text-foreground-600 text-lg">Please try something else</p>
                                </div>

                            :

                                <div className="h-[70vh] flex flex-col justify-center items-center">
                                    <p className="text-3xl">No events to show</p>
                                    <p className="text-foreground-600 text-lg">Be the 1st to add a new Event!</p>
                                </div>

                    }

                    </div>

                </div>

            </div>

        </div>

    )

}