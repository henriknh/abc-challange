import Link from 'next/link'
import PricingComparisonOptionItem from './pricing-comparison-option-item'
import { ReactNode } from 'react'
import { LinkWithLogin } from '../session/link-with-login'

export interface PricingComparisonOptionProps {
  title: string
  subTitle?: ReactNode
  description?: ReactNode
  price: number
  buyLink: string
  children: ReactNode | ReactNode[]
  isPopular?: boolean
}
export default function PricingComparisonOption({
  title,
  subTitle,
  description,
  price,
  buyLink,
  children,
  isPopular,
}: PricingComparisonOptionProps) {
  return (
    <div className="card indicator min-w-[228px] flex-1 snap-center bg-base-200 shadow-xl">
      {isPopular && (
        <div className="badge indicator-item badge-primary indicator-center">
          Popular
        </div>
      )}

      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>

        <div className="flex flex-col gap-4">
          {subTitle && <div className="flex-1">{subTitle}</div>}
          {description && <div className="flex-1">{description}</div>}
          <table className='m-0'>
            <tbody>{children}</tbody>
          </table>
          <div className="pb-4 text-xl font-bold">{price}$</div>
        </div>

        <div className="card-actions">
          <LinkWithLogin href={buyLink} className="btn btn-primary">Buy {title}</LinkWithLogin>
        </div>
      </div>
    </div>
  )
}
