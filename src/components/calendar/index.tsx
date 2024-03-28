'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg } from '@fullcalendar/core/index.js'
import CreateEventModal from './createEventModal'
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { EventObject } from '@/utils/types'

export default function Calendar({ categories, myEvents } : { categories : { title: string }[], myEvents: EventObject[] }) {

    const { isOpen, onClose, onOpen } = useDisclosure()

    const [ selectedStartDate, setSelectedStartDate ] = useState('')
    const [ selectedEndDate, setSelectedEndDate ] = useState('')
    const [ events, setEvents ] = useState<any[]>([])

    const handleDateSelect = ( arg : DateSelectArg ) => {

        setSelectedStartDate(arg.startStr)
        setSelectedEndDate(arg.endStr)

        onOpen()

    }

    useEffect(() => {

        let modifiedEventsArray: any[] = [...myEvents]

        modifiedEventsArray = myEvents.map(e => {
            return(

                {
                    start: e.startDate,
                    title: e.title,
                    end: e.endDate,
                    allDay: false
                }

            )
        })

        setEvents( modifiedEventsArray )

    },[])

    return(

        <div
            className='flex justify-center items-center py-20'
        >
            <div
                className='container max-w-screen-2xl px-5'
            >

                <div className='border-t-4 border-t-orange bg-[linear-gradient(to_bottom,#141414_0%,#1e1e1e_100%)] p-5'>

                    <FullCalendar
                        headerToolbar={{
                            start: 'prev,next today',
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                        initialView='dayGridMonth'
                        firstDay={1}
                        select={ arg => handleDateSelect(arg) }
                        selectable
                        editable
                        events={events}
                        dayMaxEvents={true}
                    />

                    <CreateEventModal categories={categories} isOpen={isOpen} onOpen={onOpen} onClose={onClose} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />

                </div>

            </div>
        </div>

    )

}