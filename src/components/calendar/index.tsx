'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg, EventContentArg } from '@fullcalendar/core/index.js'
import CreateEventModal from './createEventModal'
import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { EventObject } from '@/utils/types'

const HOST_NAME = process.env.NEXT_PUBLIC_HOSTNAME_URL

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
                    ...e,
                    start: e.startDate,
                    end: e.endDate,
                    allDay: false,
                    url:`${HOST_NAME}/events/${e.id}`
                }

            )
        })

        console.log('Events: ', modifiedEventsArray)

        setEvents( modifiedEventsArray )

    },[])

    const renderEventContent = ( eventInfo : EventContentArg ) => {

        return(
            <div className='flex flex-row gap-2 justify-center items-center overflow-hidden'>
                <div className='fc-daygrid-event-dot'></div>
                <p className={ !eventInfo.isFuture ? 'line-through' : ''}>{eventInfo.timeText}</p>
                <p className={ !eventInfo.isFuture ? 'line-through' : ''}>{eventInfo.event.title}</p>
            </div>
        )

    }

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
                        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin ]}
                        initialView='dayGridMonth'
                        firstDay={1}
                        select={ arg => handleDateSelect(arg) }
                        selectable
                        editable
                        events={events}
                        dayMaxEvents={true}
                        eventContent={renderEventContent}
                    />

                    <CreateEventModal categories={categories} isOpen={isOpen} onOpen={onOpen} onClose={onClose} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />

                </div>

            </div>
        </div>

    )

}