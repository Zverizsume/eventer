import { getUserData } from "@/actions";
import Features from "@/components/landing/features";
import Services from "@/components/landing/services";

import Navbar from "@/components/navbar";
import { Image } from "@nextui-org/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://eventer-six.vercel.app'),
  alternates: {
    canonical: '/'
  },
  title: 'Home / Eventer',
  description: `Do you crave unforgettable experiences, thrilling adventures, or simply connecting with like-minded individuals? Look no further, because Eventer has got you covered!
  Whether you're an event organizer or an enthusiastic attendee, our app offers a seamless platform to create, discover, and attend a diverse range of events.`,
  openGraph: {
    images: ['/bg_illustrations/card_bg_1.png']
  }
}

export default async function Home() {

  const userData = await getUserData()
  const currentUserInfo = userData.data.user
  
  return (
    <>
      <div className=" pb-20">
        <Navbar userData = { currentUserInfo } />
        <div className="flex flex-col justify-center items-center gap-20">
          <section
            className="relative flex flex-col gap-3 justify-center items-center w-full h-80v "
          >
            <div style={{ backgroundImage: 'url(/static_noise.gif)' }} className="absolute w-full h-full top-0 left-0 overflow-hidden opacity-10"></div>
            <div className="absolute w-full h-full bg-gradient-to-b from-slate-50 to-black opacity-30"></div>
            <div className="relative container max-w-screen-lg z-1 px-5 text-start">
              <h1 className="text-6xl">
                Welcome to Eventer
              </h1>
              <h2 className="text-lg">
                Your Ultimate Event Planning and Attendance App
              </h2>
            </div>
          </section>
        
          <section>
            <div className="container max-w-screen-lg px-5 text-center">
              <p className="text-4xl text-foreground-400">
                Do you crave <span className="text-foreground">unforgettable experiences</span>, <span className="text-foreground">thrilling adventures</span>, or simply <span className="text-foreground">connecting with like-minded individuals</span>?
                  Look no further, because Eventer has got you covered! Whether you're an <span className="text-foreground">event organizer</span> or an <span className="text-foreground">enthusiastic attendee</span>, our app offers a <span className="text-foreground">seamless platform</span> to <span className="text-orange">create</span>, <span className="text-orange">discover</span>, and <span className="text-orange">attend</span> a diverse range of events.
              </p>
              </div>
          </section>

          <Services />

          <Features />

        </div>
      </div>
    </>
  )
}
