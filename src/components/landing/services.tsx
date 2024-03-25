'use client'

import { Image } from "@nextui-org/react"
import { useScroll, motion, MotionValue, useTransform } from "framer-motion"
import { useRef } from "react"
import { v4 } from "uuid"

const services = [

    {
        title: 'Create events',
        desc: "Planning an event has never been easier with Eventer's intuitive interface. Whether it's a public gathering, a private soirée, or an exclusive invite-only affair, our platform empowers you to bring your vision to life. Simply set the date, location, and details, and let Eventer handle the rest."
    },

    {
        title: 'Discover events',
        desc: "Explore a world of possibilities with Eventer's extensive event catalog. From arts and culture to sports and fitness, our integrated calendar allows you to browse events by category, date, and location. With Eventer, discovering your next adventure is just a click away."
    },

    {
        title: 'Attend events',
        desc: "Immerse yourself in unforgettable experiences by attending events that pique your interest. Whether you're exploring a new hobby, networking with industry professionals, or simply enjoying a night out with friends, Eventer connects you with like-minded individuals who share your passion."
    },

    // {
    //     title: 'Categories galore',
    //     desc: "Whether you're into arts and culture, sports and fitness, technology, or food and drink, Eventer offers a plethora of categories to explore. From niche interests to mainstream activities, we've got you covered."
    // },

    {
        title: 'Stay connected',
        desc: "Stay up-to-date with the latest event trends, announcements, and updates through our intuitive notification system. Never miss out on an opportunity to explore new horizons and expand your network."
    },

    // {
    //     title: 'Safe and Secure',
    //     desc: "Your safety and privacy are our top priorities. Eventer ensures a secure environment for all users, with robust privacy settings and encryption protocols in place. Whether you're hosting a private event or attending a public gathering, you can trust Eventer to protect your information and provide a safe experience for all.."
    // },

]

function Service ( {title, desc, index, scrollYProgress} : {title: string, desc: string, index: number, scrollYProgress: MotionValue<number>} ) {

    const y1 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '0%', '0%', '0%', '0%'])
    const y2 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '50%', '0%', '0%', '0%'])
    const y3 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '50%', '50%', '0%', '0%'])

    const o1 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '100%', '100%', '100%', '100%'])
    const o2 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '50%', '100%', '100%', '100%'])
    const o3 = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1], ['50%', '50%', '50%', '100%', '100%'])

    return(
        <motion.div style={ index === 1 ? {y:y1, opacity:o1 } : index === 2 ? {y:y2, opacity:o2} : index === 3 ? {y:y3, opacity:o3} : {}} className={`sticky top-0 h-100v border-l-4 p-8 border-orange ${index===3? 'bg-orange' : ''} flex items-center `}>

            <img src={index === 1 ? '/icons/discover.png' : index === 2 ? '/icons/attend.png' : index === 3 ? '/icons/connect.png' : '/icons/create.png'} className="absolute top-4 right-4 invert" height={'30px'} width={'30px'} />

            <div className={`flex flex-col gap-5`}>

                <h5 className='text-5xl'>{title}</h5>

                <p className="max-w-xl text-stone-300 text-md">
                    {desc}
                </p>

            </div>

        </motion.div>)

}



export default function Services( ) {

    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
        smooth: 1
    })

    return (

        <motion.div  className="border-b-4 border-orange relative px-0 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-0 h-[calc(400vh)] w-full">

            <motion.div ref={ref} >
                <Service scrollYProgress={scrollYProgress} index={0} title={services[0].title} desc={services[0].desc} />
            </motion.div>
            {
                services.map( (s,index) => {

                    if( index != 0 )

                    return(

                        <Service scrollYProgress={scrollYProgress} index={index} key={v4()} title={s.title} desc={s.desc} />

                    )

                })
            }

        </motion.div>

    )

}