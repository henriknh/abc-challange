import { config } from '../../app.config'
import { LinkType } from '../link'
import Section from '../section'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface FooterProps {
  links: LinkType[]
  moreLinks?: LinkType[]
  bottomSlot?: ReactNode
}
export function Footer({ links, moreLinks, bottomSlot }: FooterProps) {
  return (
    <>
      <div className="flex-1" />
      <Section isAlternative>
        <footer className="flex w-full flex-col items-center text-base-content">
          <div className="flex flex-col gap-10 w-full">
            <div className="footer">
              <aside>
                {config.logoUrl && (
                  <Link href="/#">
                    <img
                      src={config.logoUrl}
                      className="h-16"
                      alt={config.title}
                    />
                  </Link>
                )}
                <div>
                  <Link href="/#">{config.title}</Link>
                  <br />
                  <span>{config.description}</span>
                  <br />
                  <span>
                    Copyright © {new Date().getFullYear()} - All rights
                    reserved
                  </span>
                </div>
              </aside>
              <nav>
                <h6 className="footer-title">Links</h6>

                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="link-hover link"
                  >
                    {link.children}
                  </Link>
                ))}
              </nav>
              <nav>
                <h6 className="footer-title">Legal</h6>

                <Link href="/tos" className="link-hover link">
                  Terms of services
                </Link>
                <Link href="/privacy-policy" className="link-hover link">
                  Privacy policy
                </Link>
              </nav>

              {moreLinks?.length > 0 && (
                <nav>
                  <h6 className="footer-title">More</h6>

                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="link-hover link"
                    >
                      {link.children}
                    </Link>
                  ))}
                </nav>
              )}
            </div>

            {bottomSlot}
          </div>
        </footer>
      </Section>
    </>
  )
}
