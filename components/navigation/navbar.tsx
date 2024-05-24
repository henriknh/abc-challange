import { authOptions } from '@/utils/auth-options'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { ReactNode } from 'react'
import { LinkType } from '../link'
import { ProfileButtonWithMenu } from '../profile-button-with-menu'
import { UserCard } from '../user-card'
import InnerNavbar from './inner-navbar'

export interface NavbarProps {
  children: ReactNode
  navLinks?: LinkType[]
  userInlineLinks?: LinkType[]
  userDropdownLinks?: LinkType[]
  userProfileLink?: string
}

export async function Navbar({
  children,
  navLinks = [],
  userInlineLinks = [],
  userDropdownLinks = [],
  userProfileLink,
}: NavbarProps) {
  const session = await getServerSession(authOptions)

  const navbarProfileButton = userDropdownLinks.length ? (
    <ProfileButtonWithMenu links={userDropdownLinks} />
  ) : userProfileLink ? (
    <Link href={userProfileLink} className="btn btn-ghost">
      <UserCard />
    </Link>
  ) : (
    <UserCard />
  )

  const navdrawerProfileButton = userProfileLink ? (
    <Link href={userProfileLink} className="btn btn-ghost w-full justify-start">
      <UserCard />
    </Link>
  ) : (
    <div className="flex h-12 items-center px-4">
      <UserCard />
    </div>
  )

  return <InnerNavbar 
  children={children}
  hasSession={!!session}
  navbarProfileButton={navbarProfileButton}
  navdrawerProfileButton={navdrawerProfileButton}
  navLinks={navLinks}
  userInlineLinks={userInlineLinks}
  userDropdownLinks={userDropdownLinks}
   />

  
}
