import Section from '../section'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'

export default async function LandingPageTutorialAndVideoDemo() {
  return (
    <Section>
      <div className="prose max-w-none">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="m-0">Creating recipes is as easy as <span className='text-nowrap'>1-2-3</span></h3>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="card card-bordered card-compact flex-1">
                  <div className="card-body">
                    <div className="text-xl">1.</div>
                    <div>Copy web address of a recipe</div>
                  </div>
                </div>
                <div className="card card-bordered card-compact flex-1">
                  <div className="card-body">
                    <div className="text-xl">2.</div>
                    <div>
                      <div className="inline-flex flex-wrap items-center gap-2">
                        <div className="text-nowrap">Paste and press</div>
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
            </div>
          </div>

          <div className="flex aspect-video items-center justify-center bg-base-200">
            VIDEO
          </div>
        </div>
      </div>
    </Section>
  )
}
