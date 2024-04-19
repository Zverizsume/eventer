'use server'

import { createClient } from "@/utils/supabase/server"
import { EventObject } from "@/utils/types"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface EventsData {

    events : EventObject[],
    error: boolean,
    message: string

}

const createFrequencyRuleField = ( ev : EventObject ) => {

    const tz = dayjs.tz.guess()
    const dtstart = dayjs(ev.startDate).set('hour', parseInt(ev.startTime.substring(0,2))).set('minute', parseInt(ev.startTime.substring(3))).tz(tz).format('YYYY-MM-DDTHH:mm:ss')

    switch( ev.frequency ) {

        case 'no_repeat' :
            return {
                freq: 'daily',
                dtstart: dtstart,
                until: dtstart
            }
        case 'weekly' :
            return {
                freq: 'weekly',
                byweekday: [dayjs(ev.startDate).format('dd')],
                dtstart: dtstart
            }
        case 'weekly_other' :
            return {
                freq: 'weekly',
                interval: 2,
                byweekday: [dayjs(ev.startDate).format('dd')],
                dtstart: dtstart
            }
        case 'monthly' :
            return {
                freq: 'monthly',
                byweekday: [dayjs(ev.startDate).format('dd')],
                bysetpos: 1,
                dtstart: dtstart
            }
        case 'annually' :
            return {
                freq: 'yearly',
                dtstart: dtstart
            }
        case 'week_days' :
            return {
                freq: 'weekly',
                byweekday: ['mo', 'tu', 'we', 'th', 'fr'],
                dtstart: dtstart
            }
        default:
            break
    }

}

export async function getCalendarEvents() : Promise<EventsData> {

    const supabase = createClient()

    let query = supabase.from('event').select()

    const { data, error } = await query

    if( error ) {

        console.log('Error: ', error.message)

        return {

            events: [],
            error: true,
            message: error.message

        }

    }

    else if(data) {

        let eventsWithRecurrence = data.map( ev => {

                return(
                    {
                        ...ev,
                        rrule: createFrequencyRuleField(ev)
                    }
                )
        })

        return {

            events: eventsWithRecurrence,
            error: false,
            message: 'Success getting events.'

        }

    }

    else {

        return {

            events: [],
            error: false,
            message: 'Success getting events.'

        }

    }



    

}