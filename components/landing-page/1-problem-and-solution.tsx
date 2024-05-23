import Hero from '../hero'

export default async function LandingPageProblemAndSolution() {
  return (
    <Hero excludeNavbarHeight>
      <div className="flex flex-col items-center gap-10 px-10">
        <div className="prose flex max-w-none flex-col items-center">
          <h1>Your cookbook simplified</h1>
          <p className="my-2">
            Tired of lengthy recipes and just want a simple list of ingredients
            and steps to cook?
          </p>
          <p className="my-2">
            Then <span className="font-bold">as easy as pie</span> is for you.
            Save all your recipes in one place with one consistent look.
          </p>
          <p className="my-2">
            Easy to browse, easy to read,{' '}
            <span className="font-bold">as easy as pie!</span>
          </p>
        </div>
      </div>
    </Hero>
  )
}
