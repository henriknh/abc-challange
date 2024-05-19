import { mdiCrownCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { getCurrentUser } from 'app/api/current-user'
import Link from 'next/link'

export interface TokensProps {
  href: string
}

export async function Tokens({ href }: TokensProps) {
  const currentUser = await getCurrentUser()
  return currentUser ? <span>{currentUser.tokens} tokens</span> : <></>
}
