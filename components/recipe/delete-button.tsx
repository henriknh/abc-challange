'use client'

import { IRecipe } from '@/models/recipe'
import { mdiTrashCanOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { deleteRecipe } from 'app/api/delete-recipe'
import { useState } from 'react'

export interface RecipeDeleteButtonProps {
  recipe: IRecipe
}

export default function RecipeDeleteButton({
  recipe,
}: RecipeDeleteButtonProps) {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      <button
        type="button"
        className="btn btn-square btn-ghost"
        onClick={() =>
          (document.getElementById('my_modal_1') as HTMLFormElement).showModal()
        }
      >
        <Icon path={mdiTrashCanOutline} size={1} />
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete {recipe.title}</h3>
          <p className="py-4">
            Are you sure you want to permanently delete this recipe?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost">Close</button>
            </form>
            <button
              className="btn btn-error"
              disabled={loading}
              onClick={() => {
                setLoading(true)
                deleteRecipe(recipe).catch(() => setLoading(false))
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
