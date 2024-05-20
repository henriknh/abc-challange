'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './current-user'
import { redirect } from 'next/navigation'

export async function updateSystemOfUnits(isMetric: boolean) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  currentUser.isMetric = isMetric
  await currentUser.save()

  revalidatePath('/')
}
