import logo from '../public/vercel.svg'
import '../styles/global.css'
import { Footer, Navbar } from 'git-started-components'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

const title = 'git-started'

const links = [
  {
    label: 'Pricing',
    href: '#',
  },
  {
    label: 'FAQ',
    href: '#',
  },
  {
    label: 'Login',
    href: '#',
  },
]

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SessionProvider session={session}>
        <Navbar
          title={title}
          logoUrl={logo.src}
          links={links}
          cta={<div className="btn-xl btn-rounded btn">Get started!</div>}
        />

        <Component {...pageProps} />

        <Footer
          title={title}
          description="Build and ship apps faster"
          logoUrl={logo.src}
          links={links}
        ></Footer>
      </SessionProvider>
    </div>
  )
}
