import { MRecipe } from '@/models/recipe'
import { getCurrentUser } from 'app/api/current-user'
import mongoose from 'mongoose'

export async function ProfileStats() {
  const currentUser = await getCurrentUser()

  const recipes = await MRecipe.countDocuments({
    user: new mongoose.Types.ObjectId(currentUser.id),
  }).exec()

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Recipes</div>
        <div className="stat-value">{recipes}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Tokens</div>
        <div className="stat-value">{currentUser.tokens}</div>
        {/* TODO2 */}
      </div>
    </div>
  )
}
