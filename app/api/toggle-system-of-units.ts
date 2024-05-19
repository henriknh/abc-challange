'use server'

import { getCurrentUser } from './current-user'
import { IRecipe, MRecipe } from '@/models/recipe'
import { authOptions } from '@/utils/auth-options'
import dbConnect from 'lib/db-connect'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export async function toggleSystemOfUnits() {
  const currentUser = await getCurrentUser()
  currentUser.isMetric = !currentUser.isMetric
  await currentUser.save()

  redirect('/profile')
}
