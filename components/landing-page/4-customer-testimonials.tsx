import CustomerTestimonials from '../review/customer-testimonials'
import Section from '../section'

export default async function LandingPageCustomerTestimonials() {
  return (
    <Section>
      <div className="prose flex max-w-none flex-col">
        <h3>What others have said</h3>

        <CustomerTestimonials />
      </div>
    </Section>
  )
}
