import AuthGuard from '@/components/auth-guard'
import Section from '@/components/section'

export default function Tokens() {
  return (
    <AuthGuard>
      <div className="prose max-w-none ">
        <Section>tokens</Section>
      </div>
    </AuthGuard>
  )
}
