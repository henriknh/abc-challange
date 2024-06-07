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

  const currentUser = await getCurrentUser()

  const letterIndex = getLetterIndex(letter)

  const startDate = new Date(config.startDate)
  startDate.setHours(0)
  startDate.setDate(startDate.getDate() + letterIndex)
  const startTime = startDate.getTime()

  const nowTime = new Date().getTime()

  const isHenrik = currentUser?.email === 'henrik.nilsson.harnert@gmail.com'
  const postNotComplete =
    !post?.claireWord ||
    !post?.claireText ||
    !post?.henrikWord ||
    !post?.henrikText

  const isCompleted =
    currentUser &&
    post?.letter === letter &&
    (isHenrik
      ? post.henrikWord && post.henrikText
      : post.claireWord && post.claireText)

  return (
    <Hero excludeNavbarHeight>
      <div
        className={
          'prose flex h-full max-w-none flex-1 flex-col gap-10 px-10 py-10 md:py-20 '
        }
      >
        <div className="flex justify-between gap-2">
          <h1 className="m-0 text-9xl">{letter}</h1>
          <div className="flex flex-col items-end gap-2">
            <div>
              {startDate.toLocaleDateString('se', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </div>

            {/* <div
              className={
                'inline-flex h-2 w-2 rounded-full' +
                (isCompleted ? ' bg-success' : ' bg-warning')
              }
            /> */}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {startTime > nowTime ? (
            <form action={upsertPort} className="flex flex-1 flex-col gap-4">
              <input name="letter" type="text" hidden defaultValue={letter} />

              <input
                name="postWord"
                type="text"
                placeholder={`A word that starts on the letter ${letter.toUpperCase()}`}
                defaultValue={isHenrik ? post?.henrikWord : post?.claireWord}
                className="input input-bordered w-full max-w-xs"
              />

              <textarea
                name="postText"
                disabled={!currentUser}
                className="textarea textarea-bordered w-full flex-1"
                rows={4}
                defaultValue={isHenrik ? post?.henrikText : post?.claireText}
                placeholder={`Write something about you based on the word that ${isHenrik ? 'Claire' : 'Henrik'} doesn\'t know about`}
              ></textarea>
              <div className="flex justify-end">
                <SubmitButton disabled={!currentUser}>Save</SubmitButton>
              </div>
            </form>
          ) : (
            <>
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="flex gap-2">
                  <h4>Henrik</h4>

                  {isHenrik && (
                    <div className="flex items-end pb-[10px]">
                      <label
                        htmlFor="my_modal_7"
                        className="btn btn-square btn-ghost btn-xs"
                      >
                        <Icon path={mdiPencil} size={0.6} />
                      </label>
                    </div>
                  )}
                </div>

                {post?.henrikWord && post?.henrikText ? (
                  <div className="flex flex-col gap-1">
                    <div
                      className={postNotComplete ? 'select-none blur-sm' : ''}
                    >
                      {post?.henrikWord || '.'}
                    </div>
                    <div
                      className={"whitespace-pre-wrap" + (postNotComplete ? ' select-none blur-sm' : '')}
                    >
                      {post?.henrikText || '.'}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>Ssssh Don&apos;t disturb. WIP</div>
                    <div> Check back sooon :)))</div>
                  </>
                )}

                <div className="flex gap-2">
                  <h4>Claire</h4>

                  {!isHenrik && (
                    <div className="flex items-end pb-[10px]">
                      <label
                        htmlFor="my_modal_7"
                        className="btn btn-square btn-ghost btn-xs"
                      >
                        <Icon path={mdiPencil} size={0.6} />
                      </label>
                    </div>
                  )}
                </div>

                {post?.claireWord && post?.claireText ? (
                  <div className="flex flex-col gap-1">
                    <div
                      className={postNotComplete ? 'select-none blur-sm' : ''}
                    >
                      {post?.claireWord || '.'}
                    </div>
                    <div
                      className={"whitespace-pre-wrap" + (postNotComplete ? ' select-none blur-sm' : '')}
                    >
                      {post?.claireText || '.'}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>Ssssh Don&apos;t disturb. WIP</div>
                    <div> Check back sooon :)))</div>
                  </>
                )}
              </div>

              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  <h3 className="text-lg font-bold">Sneaky change! :)</h3>

                  <form
                    action={upsertPort}
                    className="flex flex-1 flex-col gap-4"
                  >
                    <input
                      name="letter"
                      type="text"
                      hidden
                      defaultValue={letter}
                    />

                    <input
                      name="postWord"
                      type="text"
                      placeholder={`A word that starts on the letter ${letter.toUpperCase()}`}
                      defaultValue={
                        isHenrik ? post?.henrikWord : post?.claireWord
                      }
                      className="input input-bordered w-full max-w-xs"
                    />

                    <textarea
                      name="postText"
                      disabled={!currentUser}
                      className="textarea textarea-bordered w-full"
                      rows={4}
                      defaultValue={
                        isHenrik ? post?.henrikText : post?.claireText
                      }
                      placeholder={`Write something about you based on the word that ${isHenrik ? 'Claire' : 'Henrik'} doesn\'t know about`}
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <label
                        className="btn btn-ghost btn-sm"
                        htmlFor="my_modal_7"
                      >
                        Close
                      </label>
                      <SubmitButton disabled={!currentUser}>Save</SubmitButton>
                    </div>
                  </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </Hero>
  )
}
