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
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <button
        type="button"
        className="btn btn-square btn-ghost"
        onClick={() => setShowModal(!showModal)}
      >
        <Icon path={mdiTrashCanOutline} size={1} />
      </button>

      <dialog
        id="my_modal_1"
        className={'modal' + (showModal ? ' modal-open' : '')}
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Delete {recipe.title}</h3>
          <p className="py-4">
            Are you sure you want to permanently delete this recipe?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
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
          <button onClick={() => setShowModal(false)}>close</button>
        </form>
      </dialog>
    </div>
  )
}
