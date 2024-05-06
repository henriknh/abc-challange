import Section, { SectionProps } from './section'
import { ReactNode } from 'react'

export interface HeroProps extends SectionProps {
  children: ReactNode
  excludeNavbarHeight?: boolean
}

export default function Hero({
  children,
  isAlternative,
  excludeNavbarHeight,
}: HeroProps) {
  return (
    <Section isAlternative={isAlternative}>
      <div
        className={
          (excludeNavbarHeight
            ? 'min-h-[calc(100vh_-_96px)]'
            : 'min-h-screen') + ' flex flex-col justify-center'
        }
      >
        {children}
      </div>
    </Section>
  )
}
