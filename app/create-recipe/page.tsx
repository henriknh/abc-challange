import Section from '../../components/section'
import AuthGuard from '@/components/auth-guard'
import LetsCook from '@/components/lets-cook'
import TextTutorial from '@/components/tutorial/text-tutorial'
import VideoDemo from '@/components/tutorial/video-demo'

export const maxDuration = 60

export default async function CreateRecipe() {
  return (
    <AuthGuard>
      <div className="prose max-w-none">
        <Section>
          <h1>Create recipe</h1>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                Provide a recipe web address, to create easy-to-follow cooking
                instructions that simplify the original recipe.
              </div>

              <TextTutorial />

              <LetsCook />
            </div>

            <VideoDemo />
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
