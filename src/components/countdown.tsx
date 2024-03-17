import { Skeleton } from "@nextui-org/react"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export default function Countdown({startDateString, startTimeString} : { startDateString: string, startTimeString: string}) {

    const [ counter, setCounter ] = useState(<Skeleton className="flex w-40 h-6 rounded-lg"></Skeleton>)

    const startDate = dayjs(`${startDateString} ${startTimeString}`)

    const createInterval = () => {

        const x = setInterval(() => {

            const now = dayjs()
            const diff = startDate.diff(now)

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCounter(
                <div className="flex flex-row gap-2 justify-start items-center">
                    <p>{days}d</p>
                    <p>{hours}h</p>
                    <p>{minutes}m</p>
                    <p>{seconds}s</p>
                </div>
            )

            if( diff < 0 ) {

                clearInterval(x)
                setCounter(
                    <p>
                        Event has finished.
                    </p>
                )

            }
                

        },1000)

        return x

    }

    useEffect(() => {

        const x = createInterval()

        return () => clearInterval(x)

    },[])

    return counter

}