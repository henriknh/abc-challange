import { ReactNode } from 'react'

export interface PricingComparisonProps {
  children: ReactNode[]
}
export default function PricingComparison({ children }: PricingComparisonProps) {
  return (
    <div className="-mx-8 -my-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 py-8">
      {children}
    </div>
  )
}
