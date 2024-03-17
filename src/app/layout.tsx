import type { Metadata } from 'next'
import { Providers } from './providers'
import { montserrat, karla } from '@/utils/fonts'
import './globals.css'


export const metadata: Metadata = {
  title: 'Eventer',
  description: 'Create and attend Events. Symlify your life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat} ${karla}`}>
        <main>
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  )
}
