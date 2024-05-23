import Recipe from '../recipe/recipe'
import Section from '../section'
import { RECIPE_EXAMPLE_CHIMICHURRI } from '@/utils/example-recipes'

export default async function LandingPageProductExample() {
  return (
    <Section isAlternative>
      <div className="prose max-w-none">
        {false && (
          <>
            <h2>Example recipe</h2>
            <h3>
              Simple yet elegant with easy overview and feaures to make your
              life easier
            </h3>
          </>
        )}

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="m-0">Features that let you focus on the cooking</h3>
            <ul className="mb-0">
              <li>
                Switch measurement system and persist setting on your profile.
              </li>
              <li>Ingredients and steps are always in view side-by-side.</li>
              <li>Mark steps as completed as you go.</li>
              <li>Clean minimalistic design.</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-base-100 p-10">
            <Recipe recipe={RECIPE_EXAMPLE_CHIMICHURRI as any} />
          </div>
        </div>
      </div>
    </Section>
  )
}
