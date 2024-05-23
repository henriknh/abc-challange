import CustomerTestimonial from "./customer-testimonial";
import avatar from '../../public/henrik_nilsson_harnert.jpg'

export default async function CustomerTestimonials () {
    return <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
    <CustomerTestimonial
      avatar={avatar}
      name="Sarah M."
      testimonial="Finally, a recipe storage solution that keeps my kitchen organized and my meals delicious!"
    />
    <CustomerTestimonial
      avatar={avatar}
      name="Mark D."
      testimonial="Love how easy it is to save and access my favorite recipes anytime, anywhere. Highly recommend!"
    />
    <CustomerTestimonial
      avatar={avatar}
      name="Emily S."
      testimonial="Game-changer for meal planning! Say goodbye to scattered recipe cards - this site has it all in one place."
    />
  </div>
}