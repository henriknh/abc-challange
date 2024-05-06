import { LinkAction } from '../components/link'
import { Tokens } from '../components/tokens'
import logo from '../public/vercel.svg'
import '../styles/global.css'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ProfileButton } from '@/components/profile-button'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

const title = 'git-started'

const links: LinkAction[] = [
  {
    href: '/prixing',
    children: 'Pricing',
  },
  {
    href: '/faw',
    children: 'FAQ',
  },
  {
    href: '/login',
    children: 'Login',
  },
]

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <SessionProvider session={session}>
        <Navbar
          title={title}
          logoUrl={logo.src}
          links={links}
          end={
            <ProfileButton
              linkUrl={() => router.push('/profile')}
              extraLabel="10 tokens"
            />
          }
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
