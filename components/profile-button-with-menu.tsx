import { LinkType } from './link'
import { LogoutButton } from './logout-button'
import { ProfileButton, ProfileButtonProps } from './profile-button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export interface ProfileButtonWithMenuProps extends ProfileButtonProps {
  linkUrl?: string
  links: LinkType[]
}

export function ProfileButtonWithMenu({
  linkUrl,
  links = [],
}: ProfileButtonWithMenuProps) {
  const { data: session } = useSession()

  return (
    <div className="dropdown dropdown-end">
      <ProfileButton />

      {session?.user && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.children}</Link>
            </li>
          ))}

          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  )
}
