'use client'

import dayjs from "dayjs"
import { EventObject } from "@/utils/types"
import { Button, Chip, Divider, Link } from "@nextui-org/react"
import { attendEvent } from "@/actions"
import GoogleMapShow from "./showGoogleMap"
import { usePathname } from 'next/navigation'

type AttandanceData = {

    going: number,
    rejected?: number,
    pending?: number 

}

export default function EventShow({ event, attandances } : { event : EventObject, attandances : AttandanceData}) {

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

    console.log('Twitter string: ', twitterString)

    return(

        <div className="w-screen flex justify-center items-center flex-col gap-5 py-5">
            <div className="container max-w-7xl flex flex-col gap-9">
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
                        Going: {attandances.going}
                    </p>
                    <Button
                        onPress={() => attendEvent(event.id, event.type)}
                        color="success"
                    >
                        Attend
                    </Button>
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
        </div>

    )

}