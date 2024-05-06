'use client'

import Hero from '../components/hero'
import LetsCook from '../components/lets-cook'
import Section from '../components/section'
import browserStorage from '../utils/browser-storage'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Hero excludeNavbarHeight>
        <div className="flex flex-col items-center gap-10">
          <div className="prose flex max-w-none flex-col items-center">
            <h1>Your cookbook simplified</h1>
            <p className="my-2">
              Are you tiered of lengthy recipes and just want to get a list of
              the ingredients and the steps to cook?
            </p>
            <p className="my-2">
              Then <strong>as easy as pie</strong> is for you. Save all your
              recipes in one place with one consistent look.
            </p>
            <h4>Easy to browse, easy to read, as easy as pie!</h4>
          </div>

          <div className="w-full max-w-[600px]">
            <LetsCook
              onAction={() => {
                browserStorage.setItem('triggerSearch', 'true')
                router.push('/create-recipe')
              }}
            />
          </div>
        </div>
      </Hero>

      <Section isAlternative>
        <a
          href="/api/extract-html"
          download="generated_pdf.pdf"
          className="downloadBtn"
        >
          Download PDF
        </a>
        <h1>Generated PDF</h1>
        <p>As you can see you can scroll without issues and select text.</p>
      </Section>
      <Section isAlternative>Test2</Section>
      <Section>Test3</Section>

      <div className="container">
        <h1>git-started</h1>
      </div>
    </>
  )
}
