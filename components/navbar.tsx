'use client'

import { config } from '../app.config'
import { LinkType } from './link'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import Link from 'next/link'
import { ReactElement, useMemo, useState } from 'react'

export interface NavbarProps {
  sticky?: boolean
  links: LinkType[]
  end?: ReactElement
  cta?: ReactElement
}
export function Navbar({ sticky, links, end, cta }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false)

  const logo = useMemo(() => {
    return (
      <Link href="/">
        <img src={config.logoUrl} className="h-10" alt="Logo" />
      </Link>
    )
  }, [])

  return (
    <>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div
        className={
          (sticky ? 'sticky' : '') + ' flex h-24 w-full items-center px-10 py-4'
        }
      >
        <div className="flex-1">{logo}</div>

        <div className="hidden flex-none place-self-center self-center justify-self-center lg:block">
          <ul className="menu menu-horizontal">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.children}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 justify-end gap-4">
          <div className="flex flex-none">
            <div className="hidden flex-none lg:block">{end}</div>
            {cta}
          </div>

          <div className="block lg:hidden">
            <button
              className="btn btn-square"
              onClick={() => setShowMenu(!showMenu)}
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
            </button>
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-10 flex bg-black/50">
          <div className="flex-1" onClick={() => setShowMenu(false)}></div>
          <div className="min-h-full w-full max-w-96 bg-base-200 px-10 py-10">
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                {logo}
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => setShowMenu(false)}
                >
                  <Icon path={mdiClose} size={1} />
                </button>
              </div>

              <ul className="menu">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.children}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {end && (
              <>
                <div className="divider"></div>

                <div className="flex flex-col">{end}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
