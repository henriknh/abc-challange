import { letters } from './layout'
import PostThumbnail from '@/components/abc-challange/post'
import { config } from 'app.config'

export default async function Home({ searchParams }) {
  const dayIndex = Math.floor(
    (new Date().getTime() - new Date(config.startDate).getTime()) /
      (24 * 60 * 60 * 1000)
  )
  const day = searchParams.day || letters[dayIndex]

  return <PostThumbnail letter={day} />
}
