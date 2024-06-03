import '../styles/global.css'
import { getCurrentUser } from './api/current-user'
import { LoginButton } from '@/components/session/login-button'
import { LogoutButton } from '@/components/session/logout-button'
import { UserCard } from '@/components/user-card'
import { MPost } from '@/models/post'
import { config } from 'app.config'
import dbConnect from 'lib/db-connect'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'

const tripSansFont = localFont({
  src: '../public/Trip-Sans-Font/trip-sans-variable.ttf',
  variable: '--font-trip-sans',
})

const tripSansMonoFont = localFont({
  src: '../public/Trip-Sans-Font/trip-sans-mono-regular.otf',
  variable: '--font-trip-sans-mono',
})

export const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
  'Z',
  'Å',
  'Ä',
  'Ö',
]

export const metadata: Metadata = {
  title: 'ABC challange',
}
interface RootProps {
  children: React.ReactNode
}

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: RootProps) {
  const currentUser = await getCurrentUser()
  await dbConnect()
  const isHenrik = currentUser?.email === 'henrik.nilsson.harnert@gmail.com'

  const posts = await MPost.find({})

  return (
    <html
      lang="en"
      className={`${tripSansFont.variable} ${tripSansMonoFont}`}
      data-theme="bumblebee"
    >
      <Script
        data-website-id="2be13eda-0dc7-4737-a95c-a09d9e17e35f"
        src="https://cloud.umami.is/script.js"
      />
      <body className="flex min-h-screen flex-col bg-base-100">
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full bg-base-100 sticky top-0">
              <div className="flex flex-none gap-4">
                {currentUser && (
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
                )}
              </div>
              <div className="mx-2 flex-1 px-2 flex gap-1">
                {/* <img src={config.logoUrl} className="h-10" alt="Logo" /> */}

                <span className='font-bold text-white bg-black rounded-full aspect-square flex items-center justify-center p-1'>abc</span>
                <span className='font-bold'>challange</span>
              </div>
              <div className="flex-none">
                {currentUser && (
                  <LogoutButton>
                    <UserCard />
                  </LogoutButton>
                )}
              </div>
            </div>
            {/* Page content here */}
            {children}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-3"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu flex min-h-full w-64 flex-col gap-2 bg-base-200 p-4">
              {/* Sidebar content here */}

              {letters.map((letter, index) => {
                const isCompleted =
                  currentUser &&
                  posts.some(
                    (post) =>
                      post.letter === letter &&
                      (isHenrik ? post.henrik : post.claire)
                  )
                const startDate = new Date(config.startDate)
                startDate.setDate(startDate.getDate() + index)
                const nowDate = new Date()
                return (
                  <li key={letter + index}>
                    <a
                      href={`?day=${letter}`}
                      className={'flex justify-between'}
                    >
                      <span className="flex items-center gap-2">
                        {currentUser && (
                          <span
                            className={
                              'h-2 w-2 rounded-full' +
                              (isCompleted ? ' bg-success' : ' bg-warning')
                            }
                          />
                        )}
                        <span>{letter}</span>
                      </span>

                      <span
                        className={
                          startDate < nowDate ? 'opacity-100' : 'opacity-20'
                        }
                      >
                        {startDate.toLocaleDateString('se', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </body>
    </html>
  )
}
