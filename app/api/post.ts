'use server'

import { getCurrentUser } from './current-user'
import { IPost, MPost } from '@/models/post'
import dbConnect from 'lib/db-connect'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upsertPort(formData: FormData) {
  await dbConnect()

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/')
  }

  const letter = formData.get('letter') as string | null
  const letterInfo = formData.get('letterInfo') as string | null

  console.log(letter, letterInfo)

  const isHenrik = currentUser?.email === 'henrik.nilsson.harnert@gmail.com'

  const newData = isHenrik
    ? {
        letter,
        henrik: letterInfo.length ? letterInfo : null,
      }
    : {
        letter,
        claire: letterInfo.length ? letterInfo : null,
      }

  await MPost.findOneAndUpdate({ letter }, newData, { upsert: true })

  revalidatePath('/')

  // redirect(`/`)
}
