'use client'

import {
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Chip,
    Button,
    Image
} from "@nextui-org/react"

import { v4 as uuidv4 } from 'uuid'

import { EventObject, EventTypeColors } from '@/utils/types'
import { useTheme } from "next-themes"
import dayjs from "dayjs"
import { useEffect, useRef } from "react"
import Countdown from "./countdown"
import { useRouter } from "next/navigation"


// const eventTypeColors : EventTypeColors = {

//     public: 'bg-gradient-to-r from-green-700 opacity-80',
//     private: 'bg-gradient-to-r from-red-700 opacity-80',
//     invite_only: 'bg-gradient-to-r from-yellow-400 opacity-80'

// }

// const iconColors = {

//     public: 'green',
//     private: 'red',
//     invite_only: 'yellow'

// }

// const textColors = {

//     public: 'text-green-700',
//     private: 'text-red-600',
//     invite_only: 'text-yellow-300'

// }

// const iconsClassNames = 'invert rounded-none data-[loaded=true]:opacity-60 w-4 max-w-none'

export default function EventCard( {event, going} : { event : EventObject, going: number } ) {

    const cardRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    let startDateArray = dayjs(event.startDate).format('D MMM, YY').split(' ')
    let endDateArray = dayjs(event.endDate).format('D MMM, YY').split(' ')

    // const theme = useTheme()

    // const finished = dayjs(event.startDate).diff(dayjs()) <= 0

    if(startDateArray[2] === endDateArray[2] ) {
        startDateArray.pop()
    }

    if(startDateArray[1] === endDateArray[1] ) {
        startDateArray.pop()
    }

    if(startDateArray[0] === endDateArray[0] ) {
        startDateArray.pop()
    }

    const dateString = startDateArray.length > 0 ? startDateArray.join(' ') + " - " + endDateArray.join(' ') : endDateArray.join(' ')

    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1)

    const handleCardPress = () => {

        // console.log("redirecting")

        router.push(`./events/${event.id}`)

    }

    useEffect(() => {

        let ref = cardRef

        if( ref && ref.current )
        {
            ref.current.addEventListener('click', handleCardPress, false)
        }

        return () => {
            if( ref && ref.current )
            {
                ref.current.removeEventListener('click', handleCardPress, false)
            }
        }

    },[cardRef])

    return(

        <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {
                event.coverImageUrl ?
                    <img src={event.coverImageUrl} alt={'bg_cover'} className="absolute object-cover h-[100%] w-[100%]"/>
                : ''
            }
            <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-60"></div>
            <Card className="min-h-60 w-full bg-gradient-card p-5 hover:bg-[#AE4301] hover:bg-opacity-50" as={Button} ref={cardRef}>
                <CardHeader>
                    <div className="flex flex-col justify-center items-start gap-1">
                        {/* <Image src={'/icons/date.png'} className={iconsClassNames} /> */}
                        <p className="opacity-50">{dateString.trim()}</p>
                        <h2 className="text-2xl">{event.title}</h2>
                        <div className="flex flex-row justify-start items-center gap-1">
                            <Image width={15} src={'/icons/location.png'} className="data-[loaded=true]:opacity-50 invert" />
                            <p className="opacity-50">{event.locationString}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>

                </CardBody>
                <CardFooter>
                    <div className="flex flex-row gap-5 items-end justify-between w-full">
                        <div className="flex flex-row gap-4">
                            <div className="flex flex-col justify-start items-start">
                                <p>{going}</p>
                                <p className="opacity-50">ATTENDING</p>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <Countdown startDateString={event.startDate} startTimeString={event.startTime} />
                                <p className="opacity-50">COUNTDOWN</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                            {
                                event.categories.map( cat => {

                                    return(
                                        <Chip key={uuidv4()} size="sm" className="bg-transparent border-1 border-gray-400">
                                            {cat}
                                        </Chip>
                                    )

                                })
                            }
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>

    )

    // return(

    //     <Card className="w-full h-auto px-0"  >
    //         {
    //             finished ?

    //                 <div className='absolute w-full h-full top-0 left-0 z-2 bg-gray-800 opacity-40'></div>

    //             : null
    //         }
    //         <CardHeader className="flex flex-col gap-4 w-100">
    //         <div className={`absolute top-0 left-0 w-full h-2 ${eventTypeColors[event.type]}`}></div>
    //         <div className="flex justify-between items-center w-full pt-2">
    //             <Link href={`/events/${event.id}`} className="text-lg flex justify-start items-center gap-2" color="foreground" showAnchorIcon anchorIcon={<IconCirclesRelation size={15} stroke={2}/>} isBlock>{event.title}</Link>
    //             <div className="flex flex-row justify-center items-center gap-4">
    //                 <div className="flex flex-row items-center justify-center gap-1">
    //                     <IconUsers color={iconColors[event.type]} size={20}/>
    //                     <p className={textColors[event.type]}>{going}</p>
    //                 </div>
    //                 <Image className={ theme.theme === 'dark' ? 'invert' : '' } src={`/icons/${event.type}.png`} width={'30'} />
    //             </div>
    //         </div>
    //         </CardHeader>
    //         <Divider/>
    //         <CardBody>
    //             <div className="flex flex-col gap-4">
    //                 <div className={'flex justify-start items-center flex-row gap-3'}>
    //                     <div className="flex flex-row justify-start items-center gap-3">
    //                         <Image src={'/icons/date.png'} className={iconsClassNames} />
    //                         <p>{dayjs(event.startDate).format('D-MMM-YY')}</p>
    //                     </div>
    //                     <div className="flex flex-row justify-start items-center gap-3">
    //                         <Image src={'/icons/time.png'} className={iconsClassNames} />
    //                         <p>{`${event.startTime}`}</p>
    //                     </div>
    //                 </div>
    //                 <div className="flex flex-row  justify-start items-center gap-3">
    //                     <Image src={'/icons/desc.png'} className={iconsClassNames} />
    //                     <p className="flex-grow">{ 
    //                             showWholeDesc || event.description.length <= 200 ? 
                                
    //                                 event.description
                                
    //                             : `${event.description.substring(0,200)}...`
                            
    //                         }
    //                         {
    //                             event.description.length > 200 ?

    //                             <Button size={'sm'} className={'p-0'} onPress={() => setShowWholeDesc(!showWholeDesc)}>{ showWholeDesc ? 'Less' : 'More'}</Button>

    //                             : null
    //                         }
    //                     </p>
    //                 </div>
    //                 <div className="flex flex-row justify-start items-center gap-3">
    //                     <Image src={'/icons/countdown.png'} className={iconsClassNames} />
    //                     <Countdown startDateString={event.startDate} startTimeString={event.startTime} />
    //                 </div>
    //                 <div className="flex flex-row justify-start items-center gap-3">
    //                     <Image src={'/icons/location.png'} className={iconsClassNames} />
    //                     <p>{event.locationString}</p>
    //                 </div>
    //             </div>
    //         </CardBody>
    //         <Divider/>
    //         <CardFooter>
    //             <div className="flex gap-3 flex-row">
    //                 {
    //                     event.categories.map( cat => {

    //                         return(

    //                             <Chip key={uuidv4()} color="default" variant="bordered">
    //                                 {cat}
    //                             </Chip>

    //                         )

    //                     })
    //                 }
    //             </div>
    //         </CardFooter>
    //     </Card>

    // )

}