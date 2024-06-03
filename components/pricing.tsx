import PricingComparison from './pricing-comparison/pricing-comparison'
import PricingComparisonOption from './pricing-comparison/pricing-comparison-option'
import PricingComparisonOptionItem from './pricing-comparison/pricing-comparison-option-item'

export default async function Pricing() {
  return (
    <div className="flex flex-col gap-4">
      <PricingComparison>
        <PricingComparisonOption
          title="Starter"
          subTitle={
            <div className="flex flex-col items-center gap-2">
              <div>5 tokens</div>
              <div className="badge badge-outline">No extra tokens</div>
            </div>
          }
          description="Just a taste, perfect for quick bites!"
          price={1}
          buyLink="https://buy.stripe.com/test_3cs2aBbkHejqat2000"
        >
          <PricingComparisonOptionItem isIncluded>
            Filter recipes
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Switch unit systems
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Dark mode
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isExcluded>
            Nutrients table
          </PricingComparisonOptionItem>
        </PricingComparisonOption>
        <PricingComparisonOption
          title="Plus"
          subTitle={
            <div className="flex flex-col items-center gap-2">
              <div>10 tokens</div>
              <div className="badge badge-primary">+ 2 extra tokens</div>
            </div>
          }
          description="More meals, fewer takeouts. Cook away!"
          price={2}
          isPopular
          buyLink="https://buy.stripe.com/test_fZe3eF1K7fnuat2eUV"
        >
          <PricingComparisonOptionItem isIncluded>
            Filter recipes
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Switch unit systems
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Dark mode
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isExcluded>
            Nutrients table
          </PricingComparisonOptionItem>
        </PricingComparisonOption>
        <PricingComparisonOption
          title="Premium"
          subTitle={
            <div className="flex flex-col items-center gap-2">
              <div>25 tokens</div>
              <div className="badge badge-primary">+ 10 extra tokens</div>
            </div>
          }
          description={
            <>
              <div>Fresh and fit, healthy</div>
              <div> cooking made easy!</div>
            </>
          }
          price={5}
          buyLink="https://buy.stripe.com/test_8wM5mNagD0sAgRqaEG"
        >
          <PricingComparisonOptionItem isIncluded>
            Filter recipes
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Switch unit systems
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Dark mode
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Nutrients table
          </PricingComparisonOptionItem>
        </PricingComparisonOption>
        <PricingComparisonOption
          title="Unlimited"
          subTitle={
            <div className="flex flex-col items-center gap-2">
              <div>Unlimited tokens</div>
              <div className="h-5" />
            </div>
          }
          // description={
          //     <>
          //       <div>Feast mode: unlocked!</div>
          //       <div>Cook like a pro!</div>
          //     </>
          //   }
          description={
            <>
              <div>Unlimited (cooking) power!</div>
              {/* <div>Cooking power</div> */}
            </>
          }
          price={10}
          buyLink="https://buy.stripe.com/test_6oE6qR9czdfm7gQ003"
        >
          <PricingComparisonOptionItem isIncluded>
            Filter recipes
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Switch unit systems
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Dark mode
          </PricingComparisonOptionItem>
          <PricingComparisonOptionItem isIncluded>
            Nutrients table
          </PricingComparisonOptionItem>
        </PricingComparisonOption>
      </PricingComparison>

      <div className='text-sm text-center'>
        Daily limit applies to Unlimited package of 15 recipes per day.
      </div>
    </div>
  )
}
