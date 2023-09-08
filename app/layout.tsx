import '@public/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bWare App',
  description: 'Bussiness Software Web Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-grid-gradient'/>
        <main> 
          {children}
        </main>
      </body>
    </html>
  )
}
