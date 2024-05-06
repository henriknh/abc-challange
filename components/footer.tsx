import profilePic from '../public/henrik_nilsson_harnert.jpg'
import { LinkAction } from './link'
import Link from 'next/link'

export interface FooterProps {
  title: string
  description: string
  logoUrl: string
  links: LinkAction[]
}
export function Footer({ title, description, logoUrl, links }: FooterProps) {
  return (
    <>
      <div className="flex-1" />
      <footer className="flex w-full flex-col items-center bg-base-200 p-10 text-base-content">
        <div className="container flex flex-col gap-10">
          <div className="footer">
            <aside>
              {logoUrl && (
                <Link href="/#">
                  <img src={logoUrl} className="h-16" alt={title} />
                </Link>
              )}
              <p>
                <Link href="/#">{title}</Link>
                <br />
                <span>{description}</span>
                <br />
                <span>
                  Copyright © {new Date().getFullYear()} - All rights reserved
                </span>
              </p>
            </aside>
            <nav>
              <h6 className="footer-title">Links</h6>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.children}</Link>
                </li>
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
            <nav>
              <h6 className="footer-title">More</h6>
              <Link
                href="https://tasteoftrail.com"
                target="_blank"
                className="link-hover link"
              >
                Taste of Trail
              </Link>
              <Link
                href="https://marketplace.visualstudio.com/items?itemName=henriknh.lfw-codes-for-bananas"
                target="_blank"
                className="link-hover link"
              >
                LFW: Codes for bananas
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.henriknh.addzelines"
                target="_blank"
                className="link-hover link"
              >
                add ze lines (google play)
              </Link>
              <Link
                href="https://henriknh.itch.io/add-ze-lines"
                target="_blank"
                className="link-hover link"
              >
                add ze lines (itch)
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="h-12">
              <img
                src={profilePic.src}
                className="h-full rounded-full"
                alt="Henrik Nilsson Harnert"
              />
            </div>

            <div className="flex flex-col">
              <div>
                Hey 👋 My name is{' '}
                <Link
                  href="https://henriknh.com"
                  target="_blank"
                  className="link"
                >
                  Henrik
                </Link>{' '}
                and I&apos;m the creator of {title}
              </div>
              <div>
                You can follow my development adventures on{' '}
                <Link
                  href="https://twitter.com/henriknh_"
                  target="_blank"
                  className="link"
                >
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
