import { Footer } from '../components/footer'
import { LinkAction } from '../components/link'
import { Navbar } from '../components/navbar'
import { ProfileButton } from '../components/profile-button'
import logo from '../public/vercel.svg'
import '../styles/global.css'

const title = 'git-started'

const links: LinkAction[] = [
  {
    href: '/recipes',
    children: 'Recipes',
  },
  {
    href: '/create-recipe',
    children: 'Create recepie',
  },
  {
    href: '/login',
    children: 'Login',
  },
]

interface RootProps {
  children: React.ReactNode
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: RootProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-base-100">
        <Navbar
          title={title}
          logoUrl={logo.src}
          links={links}
          cta={<ProfileButton linkUrl="/profile" extraLabel="10 tokens" />}
        ></Navbar>

        {children}

        <Footer
          title={title}
          description="Your cookbook made simple"
          logoUrl={logo.src}
          links={links}
        />
      </body>
    </html>
  )
}
