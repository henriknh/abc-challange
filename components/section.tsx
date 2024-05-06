import { ReactNode } from 'react'

export interface SectionProps {
  children: ReactNode
  isAlternative?: boolean
}

export default function Section({ children, isAlternative }: SectionProps) {
  return (
    <section className={isAlternative ? 'bg-base-200' : 'bg-base-100'}>
      <div className="container flex flex-col">{children}</div>
    </section>
  )
}
