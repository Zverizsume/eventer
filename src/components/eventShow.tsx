'use client'

import dayjs from "dayjs"
import { attendanceStatus, EventObject } from "@/utils/types"
import { Button, Chip, Divider, Link } from "@nextui-org/react"
import { attendEvent } from "@/actions"
import GoogleMapShow from "./showGoogleMap"
import { usePathname } from 'next/navigation'
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

import { toast, ToastContainer } from 'react-toastify';

type AttandanceData = {

    going: number,
    rejected?: number,
    pending?: number 

}

type Attandance = {

    user_id: string,
    event_id: string,
    status: string

}

type AttandancePlusData = {
    attendances: Attandance[],
    attendanceData: AttandanceData
}

export default function EventShow({ event, attandances, user } : { event : EventObject, attandances : AttandancePlusData, user: User | null}) {

    const [ isButtonLoading, setButtonLoading ] = useState(false)
    const [ myStatus, setMyStatus ] = useState<string | null>(null)
    const [ eventAtandances, setEventAttendences ] = useState(attandances)

    const pathname = usePathname()

    const latLngStringArray = event.latLng.split(', ')
    const lat = parseFloat(latLngStringArray[0])
    const lng = parseFloat(latLngStringArray[1])
    
    const marker : google.maps.LatLngLiteral = {

        lat: lat,
        lng: lng

    }

    let twitterString: string = 'https://twitter.com/intent/tweet/'

    twitterString += `?text=${event.description}`

    twitterString += `&url=${process.env.NEXT_PUBLIC_HOSTNAME_URL}${pathname}`

    twitterString += '&hashtags='

    event.categories.map( (cat, index) => {
        if(index === 0)
            twitterString += cat
        else
            twitterString += ',' + cat 
    })

    const checkMyAttendance = () => {

        if( user ) {

            const filter = eventAtandances.attendances.filter( att => att.user_id === user.id )

            if( filter.length && myStatus !== filter[0].status ) {

                setMyStatus(filter[0].status)

            }

        }

    }

    useEffect(() => {

        checkMyAttendance()

    },[eventAtandances])

    const handleEventAttend = async () => {

        if( user ) {

            setButtonLoading(true)

            const { success, message } = await attendEvent(event.id, event.type)

            if( success ) {

                toast.success( message, {
                    position: 'bottom-center'
                })

                const updatedAttendances = {...eventAtandances}
                updatedAttendances.attendances.push({
                    event_id: event.id,
                    user_id: user.id,
                    status: event.type === 'private' ? 'pending' : 'going'
                })

                switch (event.type) {
                    case 'public':
                    
                    updatedAttendances.attendanceData.going += 1

                    break;
                    case 'private':
                    
                    updatedAttendances.attendanceData.pending ? updatedAttendances.attendanceData.pending += 1 : ''

                    break;
                    case 'invite_only':
                    
                    updatedAttendances.attendanceData.going += 1

                    break;
                
                    default:
                        break;
                }

                setEventAttendences( updatedAttendances )

            }
            else
                toast.error( message, {
                    position: 'bottom-center'
                })

            checkMyAttendance()

            setButtonLoading(false)

        }

    }

    return(

        <div className="flex justify-center items-center flex-col gap-5 py-5">
            <div className="container max-w-5xl px-6 flex flex-col gap-9">
                <div className="flex flex-row justify-between flex-wrap">
                
                    <div>

                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl">{event.title}</h1>
                        <div>
                            <Link className="twitter-share-button"
                                href={twitterString}
                                isExternal
                            >
                                Tweet
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-stretch">
                        <div>
                            <p className="text-stone-400">Start date:</p>
                            <p>{dayjs(event.startDate).format('dddd, MMMM D, YYYY')}</p>
                        </div>
                        <Divider className="h-auto" orientation="vertical" />
                        <div>
                            <p className="text-stone-400">End date:</p>
                            <p>{dayjs(event.endDate).format('dddd, MMMM D, YYYY')}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3 items-stretch">
                        <div>
                            <p className="text-stone-400">Start time:</p>
                            <p>{event.startTime}</p>
                        </div>
                        
                        {
                            event.duration ?

                            <div className="flex flex-row gap-3 items-stretch">
                                <Divider className="h-auto" orientation="vertical" />
                                <div>
                                    <p className="text-stone-400">Duration:</p>
                                    <div>{event.duration}</div>
                                </div>
                            </div>
                            

                            : null
                        }
                        {

                            event.endTime ?

                                <div className="flex flex-row gap-3 items-stretch">
                                    <Divider className="h-auto" orientation="vertical" />
                                    <div>
                                        <p className="text-stone-400">Duration:</p>
                                        <div>{event.endTime}</div>
                                    </div>
                                </div>

                            : null
                        }
                    </div>

                    <div className="flex justify-start items-center flex-row gap-2">
                        <p>
                            Going: {eventAtandances.attendanceData.going}
                        </p>
                        {
                            user ? 

                                <Button
                                    onPress={handleEventAttend}
                                    color="success"
                                    isDisabled={myStatus ? true : false}
                                    isLoading={isButtonLoading}
                                >
                                    {myStatus ? myStatus : 'Attend'}
                                </Button>

                            : ''
                        }
                    </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-stone-400">Location:</p>
                            <Link isExternal href={`https://www.google.com/maps/dir/?api=1&destination=${event.latLng}`}>{event.locationString}</Link>
                        </div>
                        <div className="relative h-30v rounded-xl overflow-hidden">
                            <GoogleMapShow markers={[marker]} />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-stone-400">Description:</p>
                    <p className="text-start">
                        {event.description}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-stone-400">Categories:</p>
                    <div className="flex flex-row gap-2">
                    {
                        event.categories.map( cat => {

                            return(

                                <Chip key={cat}>{cat}</Chip>

                            )

                        })
                    }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )

}