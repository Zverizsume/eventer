import EventCard from "./event";
import { v4 as uuidv4 } from 'uuid'
import { EventObject } from "@/utils/types";

type Attendance = {

    event_id: string,
    status: string

}

type Props = {

    events : EventObject[]
    attendances : Attendance[] | []
}

export default function EventsList({events, attendances} : Props) {

    // console.log('Attendances: ', attendances)

    return(

        <div className="container max-w-6xl">

            <div className="flex flex-col gap-8 w-full py-10">

                {

                    events.map( event => {

                        const going = attendances ? attendances.filter( att => att.event_id === event.id && att.status === 'going' ).length : 0

                        return(

                            <EventCard 
                                key={uuidv4()}
                                event={event}
                                going={going}
                            />

                        )

                    })

                }

            </div>

        </div>

    )

}