'use client'

import { useScroll, motion, MotionValue, useTransform } from "framer-motion"
import { useRef } from "react"
import { v4 } from "uuid"

const features = [

    {
        title: 'Security',
        desc: `Your safety and privacy are our top priorities. Eventer ensures a secure environment for all users,
         with robust privacy settings and encryption protocols in place.
          Whether you're hosting a private event or attending a public gathering, you can trust Eventer to protect your information and provide a safe experience for all.`
    },

    {
        title: 'Notifications',
        desc: `Push notifications for upcoming events based on user preferences and location.
        Reminders for events users have RSVP'd to attend.
        Notifications for new messages, event updates, or changes in attendee status.`
    },

    {
        title: 'Chat',
        desc: `Real-time chat functionality for attendees to communicate with each other.
        Group chat feature for event participants to discuss event details, logistics, and related topics.
        Private messaging for one-on-one conversations between attendees`
    },

    {
        title: 'Networking',
        desc: `Profile creation with interests, hobbies, and a brief bio.
        Attendee matching based on shared interests and preferences.
        Option to connect with other attendees before, during, and after the event.
        Icebreaker features to facilitate conversations and networking among attendees.`
    },

]

type FeatureObject = {

    title: string,
    desc: string

}

function Feature ( {feature, index, scrollYProgress} : {feature: FeatureObject, index: number, scrollYProgress: MotionValue<number>})  {

    return(

        <motion.div className="flex flex-col items-start px-20 justify-center gap-4 h-80v bg-[linear-gradient(to_bottom,#141414_0%,#1e1e1e_100%)] rounded-2xl">
            <p className="text-orange text-2xl">0{index+1}</p>
            <h4 className="text-3xl">{feature.title}</h4>
            <p className="text-xl">{feature.desc}</p>
        </motion.div>

    )

}

export default function Features() {

    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
        smooth: 1
    })

    return(
        <motion.div ref={ref} className="relative container max-w-screen-xl px-5 flex gap-8 w-full h-[calc(320vh + 7.5rem)] py-20">

            <div className="sticky top-[10%] h-80v w-[50%] bg-orange rounded-2xl flex flex-col items-start justify-center px-20">
                <p className="text-4xl">Features</p>
            </div>

            <div className="flex flex-col gap-10 w-[50%]">

                {
                    features.map( (f, index) => {

                        return(
                            <Feature feature={f} index={index} scrollYProgress={scrollYProgress} key={v4()} />
                        )

                    })
                }

            </div>

        </motion.div>
    )

}