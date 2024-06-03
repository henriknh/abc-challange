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
        <div className="flex justify-center">
          <div className="prose text-center">
            <h1 className="text-9xl">Heeeey :)))</h1>
            <h2>Welcome to the ABC challange!</h2>
            <p>Each day we reveal something new about ourself that either starts with the letter of the days or has to do with that letter in some way, shape or form.</p>
            <p>Ready for the ABC challange?!</p>
            <LoginButton>Gooood!</LoginButton>
            <div className='pt-4 text-[6px]'>Entering the challange is a binding contact the the challange! Muhahaha!</div>
          </div>
        </div>
      </Hero>
    )
  }
  

  return <PostThumbnail letter={day} />
}
