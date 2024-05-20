import AuthGuard from '@/components/auth-guard'
import Section from '@/components/section'
import { increaseTokens } from 'app/api/increase-tokens'

export default function Tokens() {
  return (
    <AuthGuard>
      <div className="prose max-w-none ">
        <Section>
          <div className="flex flex-col items-center">
            <form action={increaseTokens}>
              <button type="submit" className="btn btn-primary btn-lg">
                Gimme sweet sweet tokens :)))
              </button>
            </form>
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
