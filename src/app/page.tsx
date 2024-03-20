import { getUserData } from "@/actions";
import Services from "@/components/landing/services";

import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home / Eventer',
  description: `Do you crave unforgettable experiences, thrilling adventures, or simply connecting with like-minded individuals? Look no further, because Eventer has got you covered!
  Whether you're an event organizer or an enthusiastic attendee, our app offers a seamless platform to create, discover, and attend a diverse range of events.`,
  openGraph: {
    images: ['']
  }
}

export default async function Home() {

  const userData = await getUserData()
  const currentUserInfo = userData.data.user
  
  return (
    <>
      <div className="bg-[radial-gradient(circle_at_50%_-30%,rgb(144,17,105)_20%,rgb(0,0,0)_70%)] pb-20">
        <Navbar userData = { currentUserInfo } />
        <div className="flex flex-col justify-center items-center gap-20">
          <section
            className="flex flex-col gap-3 justify-center items-center w-full h-40v "
          >
            <div className="container max-w-screen-lg px-5 text-start">
              <h1 className="text-6xl">
                Welcome to Eventer
              </h1>
              <h2 className="text-lg">
                Your Ultimate Event Planning and Attendance App
              </h2>
            </div>
          </section>
        
          <section>
            <div className="container max-w-screen-lg px-5 text-start">
              <p>
                {`Do you crave unforgettable experiences, thrilling adventures, or simply connecting with like-minded individuals?
                  Look no further, because Eventer has got you covered!`}
              </p>
              <p>{`Whether you're an event organizer or an enthusiastic attendee, our app offers a seamless platform to create, discover, and attend a diverse range of events.`}</p>
            </div>
          </section>

          <Services />

        </div>
      </div>
    </>
  )
}
