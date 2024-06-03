import { Navbar } from '@/components/navigation/navbar'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import '../styles/global.css'

const tripSansFont = localFont({
  src: '../public/Trip-Sans-Font/trip-sans-variable.ttf',
  variable: '--font-trip-sans',
})

const tripSansMonoFont = localFont({
  src: '../public/Trip-Sans-Font/trip-sans-mono-regular.otf',
  variable: '--font-trip-sans-mono',
})

export const metadata: Metadata = {
  title: 'ABC challange',
}
interface RootProps {
  children: React.ReactNode
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: RootProps) {

  return (
    <html
      lang="en"
      className={`${tripSansFont.variable} ${tripSansMonoFont}`}
      data-theme='light'
    >
      <Script
        data-website-id="2be13eda-0dc7-4737-a95c-a09d9e17e35f"
        src="https://cloud.umami.is/script.js"
      />
      <body className="flex min-h-screen flex-col bg-base-100">
        <Navbar>{children}</Navbar>
      </body>
    </html>
  )
}
