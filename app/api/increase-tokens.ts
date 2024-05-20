'use server'

import { getCurrentUser } from './current-user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function increaseTokens() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  currentUser.tokens += 5
  await currentUser.save()

  revalidatePath('/')
}
