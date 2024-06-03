import { getCurrentUser } from './api/current-user'
import { letters } from './layout'
import PostThumbnail from '@/components/abc-challange/post'
import Hero from '@/components/hero'
import { LoginButton } from '@/components/session/login-button'
import { config } from 'app.config'

export default async function Home({ searchParams }) {
  const dayIndex = Math.floor(
    (new Date().getTime() - new Date(config.startDate).getTime()) /
      (24 * 60 * 60 * 1000)
  )

  const day = searchParams.day || letters[dayIndex] || 'A'
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <Hero excludeNavbarHeight>
        <div className="prose flex max-w-none flex-1 flex-col items-center justify-around px-4 text-center">
            <div className="flex-1" />
          <h1 className="m-0 text-7xl md:text-9xl">Heeey :)))</h1>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 max-w-[550px]">
            <h2 className="m-0">Welcome to the ABC challange!</h2>
            <div>
              Each day we reveal something new about ourself through a letter. It can be a word that that starts
              with the letter of the day. Or something that has to do with that letter in some
              way, shape or form.
            </div>
            <div>Are you ready for the challange?!</div>
            <div className="flex flex-col items-center">
              <LoginButton>
                Let&apos;s go! Vamos! 我們走吧! Nu kör vi!
              </LoginButton>
              <div className="pt-4 text-[6px]">
                Entering the challange is a binding contract to the challange!
                😈
              </div>
            </div>
          </div>
          <div className="flex-1" />
        </div>
      </Hero>
    )
  }

  return <PostThumbnail letter={day} />
}
