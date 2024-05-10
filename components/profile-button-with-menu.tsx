import { authOptions } from '@/utils/auth-options'
import { LinkType } from './link'
import { LogoutButton } from './logout-button'
import { UserCard, UserCardProps } from './user-card'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

export interface ProfileButtonWithMenuProps extends UserCardProps {
  links: LinkType[]
}

export async function ProfileButtonWithMenu({
  links = [],
}: ProfileButtonWithMenuProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <Link href="/api/auth/signin" className="btn btn-primary">
        Sign in
      </Link>
    )
  }

  return (
    <div className="dropdown dropdown-end">
      <div role="button" tabIndex={0} className="btn btn-ghost">
        <UserCard />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.children}</Link>
          </li>
        ))}

        <div className="divider" />

        <li>
          <LogoutButton />
        </li>
      </ul>
      {/* {session?.user && (
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
      )} */}
    </div>
  )
}
