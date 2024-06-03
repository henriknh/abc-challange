'use server'

import { MPost } from '@/models/post'
import dbConnect from 'lib/db-connect'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentUser } from './current-user'

export async function upsertPort(formData: FormData) {
  await dbConnect()

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/')
  }

  const letter = formData.get('letter') as string | null
  const postWord = formData.get('postWord') as string | null
  const postText = formData.get('postText') as string | null
  const isHenrik = currentUser?.email === 'henrik.nilsson.harnert@gmail.com'

  const newData = isHenrik
    ? {
        letter,
        henrikWord: postWord?.length ? postWord : null,
        henrikText: postText?.length ? postText : null,
      }
    : {
        letter,
        claireWord: postWord?.length ? postWord : null,
        claireText: postText?.length ? postText : null,
      }

  await MPost.findOneAndUpdate({ letter }, newData, { upsert: true })

  revalidatePath('/')

  // redirect(`/`)
}
