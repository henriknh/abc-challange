'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './current-user'

export async function updateSystemOfUnits(isMetric: boolean) {
  const currentUser = await getCurrentUser()
  currentUser.isMetric = isMetric
  await currentUser.save()

  revalidatePath('/')
}
