'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from './current-user'
import { redirect } from 'next/navigation'

export async function toggleTheme() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/api/auth/signin')
  }

  currentUser.isDarkMode = !currentUser.isDarkMode 
  await currentUser.save()

  revalidatePath('/')
}
