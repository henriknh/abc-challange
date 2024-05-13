import Link from 'next/link'

export function LoginButton({ ...props }) {
  return (
    <Link
      className="btn btn-primary"
      href="/api/auth/signin"
      {...props}
    >
      Log in
    </Link>
  )
}
