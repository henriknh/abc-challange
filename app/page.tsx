'use client'

import Hero from '../components/hero'
import LetsCookInput from '../components/lets-cook-input'
import Section from '../components/section'
import browserStorage from '../utils/browser-storage'
import Recipe from '@/components/recipe/recipe'
import { RECIPE_EXAMPLE_CHIMICHURRI } from '@/utils/example-recipes'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Hero excludeNavbarHeight>
        <div className="flex flex-col items-center gap-10 px-10">
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
        </div>
      </Hero>

      <Section isAlternative>
        <div className="prose max-w-none">
          {/* <h2>Example recipe</h2> */}
          {/* <h3>Simple yet elegant with easy overview and feaures to make your life easier</h3> */}
          <h3>Features that let you focus on the cooking</h3>
          <ul>
            <li>
              Switch measurement system and persist setting on your profile.
            </li>
            <li>Ingredients and steps are always in view side-by-side.</li>
            <li>Mark steps as completed as you go.</li>
            <li>Clean minimalistic design.</li>
          </ul>

          <div className="rounded-xl border bg-base-100 p-10">
            <Recipe recipe={RECIPE_EXAMPLE_CHIMICHURRI as any} />
          </div>
        </div>
      </Section>
      <Section>
        <div className="prose max-w-none">
          <h3>Creating recipes is as easy as 1-2-3</h3>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="card card-bordered card-compact flex-1">
                <div className="card-body">
                  <div className="text-xl">1.</div>
                  <div>Copy URL of a recipe</div>
                </div>
              </div>
              <div className="card card-bordered card-compact flex-1">
                <div className="card-body">
                  <div className="text-xl">2.</div>
                  <div>
                    <div className="inline-flex flex-wrap items-center gap-2">
                      <div className="text-nowrap">Paste URL and press</div>
                      <button className="btn btn-outline btn-sm relative">
                        <Icon path={mdiChefHat} size={0.8} /> Let&apos;s cook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-bordered card-compact flex-1">
                <div className="card-body">
                  <div className="text-xl">3.</div>
                  <div>Actually let&apos;s get cooking!</div>
                </div>
              </div>
            </div>

            <div className="flex aspect-video items-center justify-center bg-base-200">
              VIDEO
            </div>
          </div>
        </div>
      </Section>

      <Section>https://flowbite.com/blocks/marketing/pricing/</Section>
    </>
  )
}
