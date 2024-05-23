import Section from '../section'
import TextTutorial from '../tutorial/text-tutorial'
import VideoDemo from '../tutorial/video-demo'
import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'

export default async function LandingPageTextTutorialAndVideoDemo() {
  return (
    <Section>
      <div className="prose max-w-none">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="m-0">
              Creating recipes is as easy as{' '}
              <span className="text-nowrap">1-2-3</span>
            </h3>

            <TextTutorial />
          </div>

          <VideoDemo />
        </div>
      </div>
    </Section>
  )
}
