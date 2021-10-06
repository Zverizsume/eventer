import React, { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function FullCalendar( props ) {
    
    const router = useRouter()

    const [ events, setEvents ] = useState( props.events )

    const eventClickHandler = ( e ) => {

        const eventId = e.event._def.publicId
        router.push(`/event/${eventId}`)

    }

    const eventDropHandler = ( e ) => {

        const eventId = e.event._def.publicId

        console.log(e.event)

    }

    return (
        <Calendar 
            headerToolbar = {{
                start: 'today prev,next',
                center: 'title',
                end: 'dayGridMonth timeGridWeek timeGridDay'
            }}
            firstDay= {1}
            editable = { true }
            eventColor = '#26c6da'
            initialEvents = {
                events.map( event => { return { title: event.title, start: event.start, end: event.end, id: event._id, allDay: true } } )
            }
            plugins = { [ timeGridPlugin, dayGridPlugin, interactionPlugin ] }
            initialView = "dayGridMonth"
            eventClick = { e => eventClickHandler( e ) } 
            eventDrop = { e => eventDropHandler( e ) }
        />
    );
}