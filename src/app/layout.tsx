import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import HeaderComponent from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MirArt',
  description: 'MirArt - Mirador de artículos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark dark:text-white min-h-screen app-background '>
        <HeaderComponent />
        {children}
      </body>
    </html>
  )
}
