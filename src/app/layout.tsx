import type { Metadata } from 'next'
import { Providers } from './providers'
import { montserrat, karla } from '@/utils/fonts'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Chat from '@/components/chat'
import { getChatHistory } from '@/actions'

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

  console.log('Chat data: ', data)

  return (
    <html lang="en">
      <body className={`${montserrat} ${karla}`}>
        <main>
          <Providers>
            {children}
            {
                !error ? 
                  <Chat chat_history={data} />
                : ''
            }
            <Analytics />
          </Providers>
        </main>
      </body>
    </html>
  )
}
