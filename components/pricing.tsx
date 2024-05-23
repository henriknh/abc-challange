import PricingComparison from './pricing-comparison/pricing-comparison'
import PricingComparisonOption from './pricing-comparison/pricing-comparison-option'
import PricingComparisonOptionItem from './pricing-comparison/pricing-comparison-option-item'

export default async function Pricing() {
  return (
    <PricingComparison>
      <PricingComparisonOption
        title="Starter Pack"
        description="Just a taste, perfect for quick bites!"
        price={1}
      >
        <PricingComparisonOptionItem>10 tokens</PricingComparisonOptionItem>
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
        title="Plus Pack"
        description="More meals, fewer takeouts. Cook away!"
        price={2}
        isPopular
      >
        <PricingComparisonOptionItem>25 tokens</PricingComparisonOptionItem>
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
        title="Premium Pack"
        description={
          <>
            <div>Fresh and fit, healthy</div>
            <div> cooking made easy!</div>
          </>
        }
        price={5}
      >
        <PricingComparisonOptionItem>60 tokens</PricingComparisonOptionItem>
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
        title="Unlimited Pack"
        description={
          <>
            <div>Feast mode: unlocked!</div>
            <div>Cook like a pro!</div>
          </>
        }
        price={10}
      >
        <PricingComparisonOptionItem>
          Unlimited tokens
        </PricingComparisonOptionItem>
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
  )
}
