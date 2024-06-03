import { SubmitButton } from '../form/submit-button'
import { MPost } from '@/models/post'
import { MUser } from '@/models/user'
import { config } from 'app.config'
import { getCurrentUser } from 'app/api/current-user'
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

  const currentUser = await getCurrentUser()

  const letterIndex = getLetterIndex(letter)
  const postDate = new Date(config.startDate)
  postDate.setDate(postDate.getDate() + letterIndex)
  const postTime = postDate.getTime()
  const nowDate = new Date()
  const nowTime = nowDate.getTime()

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
    <div
      className={
        'prose card relative col-span-4 max-w-none bg-base-100 shadow-xl ' +
        getBgColor()
      }
    >
      <div className="card-body">
        <div className="flex justify-between gap-2">
          <h1>{letter}</h1>
          <div className="py-1 opacity-50">
            {postDate.toLocaleDateString('se')}
          </div>
        </div>

        {!post?.claire || !post?.henrik || postTime > nowTime ? (
          <form className="flex flex-col gap-4">
            <input type="text" hidden value={letter} />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder={`Write something about you on the letter ${letter.toUpperCase()} that ${isHenrik ? 'Claire' : 'Henrik'} doesn\'t know about`}
            ></textarea>
            <div className="flex justify-end">
              <SubmitButton>Save</SubmitButton>
            </div>
          </form>
        ) : post?.claire && post?.henrik ? (
          <div>
            <h6>Claire</h6>
            <div>{post.claire}</div>
            <h6>Henrik</h6>
            <div>{post.henrik}</div>
          </div>
        ) : (
          <div>
            <h6>Claire</h6>
            <div className="blur-sm">{post?.claire || '.'}</div>
            <h6>Henrik</h6>
            <div className="blur-sm">{post?.henrik || '.'}</div>
          </div>
        )}
      </div>
    </div>
  )
}
