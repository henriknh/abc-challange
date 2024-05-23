import Pricing from '../pricing'
import Section from '../section'
import { LoginButton } from '../session/login-button'

export default async function LandingPageBusinessModel() {
  return (
    <Section>
      <div className="prose flex max-w-none flex-col gap-10">
        <div>
          <h3 className="m-0222">Pricing</h3>

          <div>
            Buy tokens for flexible use, or choose the Unlimited Pack for
            all-you-can-use access. Pick what suits you best!
          </div>
        </div>

        <Pricing />

        <div className="flex flex-col items-center gap-4">
          <div>
            Get started for free with{' '}
            <span className="font-bold">5 free tokens</span> today. Just login
            and start collecting recipes!
          </div>

          <LoginButton>Get started for free</LoginButton>
        </div>
      </div>
    </Section>
  )
}
