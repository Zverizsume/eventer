'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { DateSelectArg } from '@fullcalendar/core/index.js'
import CreateEventModal from './createEventModal'
import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import dayjs from 'dayjs'

export default function Calendar({ categories } : { categories : { title: string }[] }) {

    const { isOpen, onClose, onOpen } = useDisclosure()

    const [ selectedStartDate, setSelectedStartDate ] = useState('')
    const [ selectedEndDate, setSelectedEndDate ] = useState('')

    const handleDateSelect = ( arg : DateSelectArg ) => {

        setSelectedStartDate(arg.startStr)
        setSelectedEndDate(arg.endStr)

        onOpen()

    }

    return(

        <div
            className='flex justify-center items-center py-unit-20'
        >
            <div
                className='container max-w-screen-lg px-5'
            >

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
                />

                <CreateEventModal categories={categories} isOpen={isOpen} onOpen={onOpen} onClose={onClose} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />

            </div>
        </div>

    )

}