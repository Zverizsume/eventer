import type { Metadata } from 'next'
import { Providers } from './providers'
import { montserrat, karla } from '@/utils/fonts'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Chat from '@/components/chat'
import { getChatHistory, getUserData } from '@/actions'
import "react-toastify/dist/ReactToastify.css";

// export const metadata: Metadata = {
//   title: 'Eventer',
//   description: 'Create and attend Events. Symlify your life.',
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { data, error, message } = await getChatHistory()
  const { data : userData, error : getUserError } = await getUserData()

  return (
    <html lang="en">
      <body className={`${montserrat} ${karla}`}>
        <main>
          <Providers>
            {children}
            {
                !error ? 
                  <Chat chat_history={data} user={userData.user} />
                : ''
            }
            <Analytics />
          </Providers>
        </main>
      </body>
    </html>
  )
}
