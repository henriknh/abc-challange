import LandingPageProblemAndSolution from '@/components/landing-page/1-problem-and-solution'
import LandingPageProductExample from '@/components/landing-page/2-product-example'
import LandingPageTextTutorialAndVideoDemo from '@/components/landing-page/3-text-tutorial-and-video-demo'
import LandingPageCustomerTestimonials from '@/components/landing-page/4-customer-testimonials'
import LandingPageBusinessModel from '@/components/landing-page/5-business-model'

export default async function Home() {
  return (
    <>
      <LandingPageProblemAndSolution />
      <LandingPageProductExample />
      <LandingPageTextTutorialAndVideoDemo />
      {/* <LandingPageCustomerTestimonials /> */}
      <LandingPageBusinessModel />
    </>
  )
}
