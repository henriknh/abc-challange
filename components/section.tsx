import { ReactNode } from 'react'

export interface SectionProps {
  children: ReactNode
  isAlternative?: boolean
  noPadding?: boolean
}

export default function Section({ children, isAlternative, noPadding }: SectionProps) {
  return (
    <section className={isAlternative ? 'bg-base-200' : 'bg-base-100'}>
      <div className={"container flex flex-col md:py-20 py-10" + (noPadding ? ' !p-0' : '')}>{children}</div>
    </section>
  )
}
