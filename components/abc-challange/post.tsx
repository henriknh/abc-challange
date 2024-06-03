'use server'

import { SubmitButton } from '../form/submit-button'
import Hero from '../hero'
import { MPost } from '@/models/post'
import { mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
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
      <div
        className={'prose flex h-full max-w-none flex-1 flex-col px-10 py-20 '}
      >
        <div className="flex justify-between gap-2">
          <h1 className="mb-20 text-9xl">{letter}</h1>
          <div>
            {postDate.toLocaleDateString('se', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>

        <div className="flex-1">
          {postTime > nowTime ? (
            <form action={upsertPort} className="flex flex-1 flex-col gap-4">
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
          ) : (
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex gap-2">
                <h4>Claire</h4>

                {!isHenrik && (
                  <div className="flex items-end pb-[10px]">
                    <button className="btn btn-square btn-ghost btn-xs">
                      <Icon path={mdiPencil} size={0.6} />
                    </button>
                  </div>
                )}
              </div>
              <div
                className={
                  !post?.claire || !post?.henrik ? 'select-none blur-sm' : ''
                }
              >
                {post?.claire || '.'}
              </div>
              <div className="flex gap-2">
                <h4>Henrik</h4>

                {isHenrik && (
                  <div className="flex items-end pb-[10px]">
                    <button className="btn btn-square btn-ghost btn-xs">
                      <Icon path={mdiPencil} size={0.6} />
                    </button>
                  </div>
                )}
              </div>
              <div
                className={
                  !post?.claire || !post?.henrik ? 'select-none blur-sm' : ''
                }
              >
                {post?.henrik || '.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </Hero>
  )
}
