'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './current-user'
import { redirect } from 'next/navigation'
import { SystemOfUnits } from '@/models/user'

export async function updateSystemOfUnits(systemOfUnits: SystemOfUnits) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  currentUser.systemOfUnits = systemOfUnits
  await currentUser.save()

  revalidatePath('/')
}
