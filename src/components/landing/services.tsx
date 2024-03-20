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

    {
        title: 'Categories galore',
        desc: "Whether you're into arts and culture, sports and fitness, technology, or food and drink, Eventer offers a plethora of categories to explore. From niche interests to mainstream activities, we've got you covered."
    },

    {
        title: 'Google map',
        desc: "Whether you're exploring a new city or discovering hidden gems in your neighborhood, our interactive map feature provides detailed directions to every event location."
    },

    {
        title: 'Stay connected',
        desc: "Stay up-to-date with the latest event trends, announcements, and updates through our intuitive notification system. Never miss out on an opportunity to explore new horizons and expand your network."
    },

    {
        title: 'Safe and Secure',
        desc: "Your safety and privacy are our top priorities. Eventer ensures a secure environment for all users, with robust privacy settings and encryption protocols in place. Whether you're hosting a private event or attending a public gathering, you can trust Eventer to protect your information and provide a safe experience for all.."
    },

]

function Service ( {title, desc, index} : {title: string, desc: string, index: number} ) {

    const odd = index % 2 > 0

    return(
        <div className={`border-1 p-5 border-neutral-700 rounded-xl flex`}>

            <div className={`flex flex-col gap-2`}>

                <h5 className='text-lg'>{title}</h5>

                <p className="max-w-xl text-stone-400 text-sm">
                    {desc}
                </p>

            </div>

        </div>)

}



export default function Services( ) {

    return (

        <div className="container max-w-screen-lg px-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">

            {
                services.map( (s,index) => {

                    return(

                        <Service index={index} key={s.title.toLowerCase().trim()} title={s.title} desc={s.desc} />

                    )

                })
            }

        </div>

    )

}