import { StaticImageData } from 'next/image'
import { useId } from 'react'

export interface CustomerTestimonialsProps {
  avatar: StaticImageData
  name: string
  testimonial: string
}
export default function CustomerTestimonial({
  avatar,
  name,
  testimonial,
}: CustomerTestimonialsProps) {
  const id = useId()
  return (
    <div className="card card-bordered flex flex-1 flex-col">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div>
            <div className="not-prose avatar">
              <div className="w-12 rounded-full">
                <img src={avatar.src} alt={"Customer testimonial vatar picture of " + name} />
              </div>
            </div>
          </div>

          <h4 className="card-title2 m-0">{name}</h4>
        </div>

        <div>
          {testimonial}
        </div>
      </div>
    </div>
  )
}
