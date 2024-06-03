'use server'

import { SubmitButton } from '../form/submit-button'
import Hero from '../hero'
import { MPost } from '@/models/post'
import { config } from 'app.config'
import { getCurrentUser } from 'app/api/current-user'
import { upsertPort } from 'app/api/post'
import dbConnect from 'lib/db-connect'

const getLetterIndex = (letter: string) => {
  switch (letter.toUpperCase()) {
    case 'A':
      return 0
    case 'B':
      return 1
    case 'C':
      return 2
    case 'D':
      return 3
    case 'E':
      return 4
    case 'F':
      return 5
    case 'G':
      return 6
    case 'H':
      return 7
    case 'I':
      return 8
    case 'J':
      return 9
    case 'K':
      return 10
    case 'L':
      return 11
    case 'M':
      return 12
    case 'N':
      return 13
    case 'O':
      return 14
    case 'P':
      return 15
    case 'Q':
      return 16
    case 'R':
      return 17
    case 'S':
      return 18
    case 'T':
      return 19
    case 'U':
      return 20
    case 'V':
      return 21
    case 'X':
      return 22
    case 'Y':
      return 23
    case 'Z':
      return 24
    case 'Å':
      return 25
    case 'Ä':
      return 26
    case 'Ö':
      return 27
  }
}

interface PostProps {
  letter: string
}

export default async function PostThumbnail({ letter }: PostProps) {
  await dbConnect()
  const post = await MPost.findOne({
    letter,
  })
  console.log(post)

  const postDate = new Date(config.startDate)
  const postTime = postDate.getTime()
  const postDays = Math.floor(postTime / 8.64e7)

  const nowTime = new Date().getTime()
  var nowDays = Math.floor(nowTime / 8.64e7)

  console.log(postDays, nowDays)

  const currentUser = await getCurrentUser()

  const letterIndex = getLetterIndex(letter)
  postDate.setDate(postDate.getDate() + letterIndex)

  const isHenrik = currentUser?.email === 'henrik.nilsson.harnert@gmail.com'

  const getBgColor = () => {
    if (!currentUser) {
      return ''
    }

    if (postTime <= nowTime) {
      return !(isHenrik ? post?.henrik : post?.claire)
        ? 'border border-error'
        : 'border border-transparent'
    } else if (postTime - 3 * 86400000 <= nowTime) {
      return !(isHenrik ? post?.henrik : post?.claire)
        ? 'border border-warning'
        : 'border border-transparent'
    }
    return 'border border-transparent'
  }

  return (
    <Hero excludeNavbarHeight>
      <div className={'flex h-full flex-1 flex-col gap-20 px-10 py-20 '}>
        <div className="flex basis-1/3 justify-between gap-2">
          <h1 className="text-9xl">{letter}</h1>
          <div>
            {postDate.toLocaleDateString('se', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>

        {!post?.claire || !post?.henrik || postTime > nowTime ? (
          <form action={upsertPort} className="flex flex-col gap-4">
            <input name="letter" type="text" hidden defaultValue={letter} />
            <textarea
              name="letterInfo"
              disabled={!currentUser}
              className="textarea textarea-bordered w-full"
              defaultValue={isHenrik ? post?.henrik : post?.claire}
              placeholder={`Write something about you on the letter ${letter.toUpperCase()} that ${isHenrik ? 'Claire' : 'Henrik'} doesn\'t know about`}
            ></textarea>
            <div className="flex justify-end">
              <SubmitButton disabled={!currentUser}>Save</SubmitButton>
            </div>
          </form>
        ) : post?.claire && post?.henrik ? (
          <div className="flex flex-1 flex-col justify-center">
            <h6>Claire</h6>
            <div>{post.claire}</div>
            <h6>Henrik</h6>
            <div>{post.henrik}</div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center">
            <h6>Claire</h6>
            <div className="blur-sm">{post?.claire || '.'}</div>
            <h6>Henrik</h6>
            <div className="blur-sm">{post?.henrik || '.'}</div>
          </div>
        )}
      </div>
    </Hero>
  )
}
