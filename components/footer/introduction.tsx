import { config } from '../../app.config'
import profilePic from '../../public/henrik_nilsson_harnert.jpg'
import Link from 'next/link'

export function Introduction() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="h-12">
        <img
          src={profilePic.src}
          className="h-full rounded-full"
          alt="Henrik Nilsson Harnert"
        />
      </div>

      <div className="flex flex-col">
        <div>
          Hey 👋 My name is{' '}
          <Link href="https://henriknh.com" target="_blank" className="link">
            Henrik
          </Link>{' '}
          and I&apos;m the creator of {config.title}
        </div>
        <div>
          You can follow my development adventures on{' '}
          <Link
            href="https://twitter.com/henriknh_"
            target="_blank"
            className="link"
          >
            Twitter
          </Link>
        </div>
      </div>
    </div>
  )
}
