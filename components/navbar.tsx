import { config } from '../app.config'
import { LinkType } from './link'
import { LogoutButton } from './logout-button'
import { ProfileButtonWithMenu } from './profile-button-with-menu'
import { UserCard } from './user-card'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface NavbarProps {
  children: ReactNode
  links: LinkType[]
  profileDropdownLinks: LinkType[]
}
export function Navbar({ children, links, profileDropdownLinks }: NavbarProps) {
  return (
    <div className="drawer drawer-end min-h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar min-h-20 w-full">
          <div className="flex-1">
            <Link href="/">
              <img src={config.logoUrl} className="h-10" alt="Logo" />
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal flex gap-4">
              {/* Navbar menu content here */}
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.children}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 justify-end">
            <div className="hidden flex-none lg:flex">
              <ProfileButtonWithMenu links={profileDropdownLinks} />
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>

        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu flex min-h-full w-80 flex-col bg-base-200 p-4">
          {/* Sidebar content here */}

          <div className="flex-1">
            <div className="px-4 pb-4 pt-2">
              <UserCard />
            </div>

            {profileDropdownLinks?.length && (
              <>
                <ul>
                  {profileDropdownLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.children}</Link>
                    </li>
                  ))}
                </ul>

                <div className="divider" />
              </>
            )}

            <ul className="w-full">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.children}</Link>
                </li>
              ))}
            </ul>
          </div>

          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
