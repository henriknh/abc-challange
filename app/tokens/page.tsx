import AuthGuard from '@/components/auth-guard'
import Pricing from '@/components/pricing'
import Section from '@/components/section'
import { increaseTokens } from 'app/api/increase-tokens'

export default function Tokens() {
  return (
    <AuthGuard>
      <div className="prose max-w-none ">
        <Section>
          <h1>Tokens</h1>

          <div className="flex flex-col gap-10">
            <Pricing />

            <div className="flex flex-col items-center">
              <form action={increaseTokens}>
                <button type="submit" className="btn btn-primary btn-lg">
                  Gimme sweet sweet free tokens :)))
                </button>
              </form>
            </div>
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
