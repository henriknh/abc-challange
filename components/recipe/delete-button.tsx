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
  const deleteRecipeWithRecipe = deleteRecipe.bind(null, recipe)

  return (
    <div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <button
        type="button"
        className="btn btn-square btn-ghost"
        onClick={() => {
          const element = document.getElementById('my_modal_1')
          element.showModal()
        //   console.log(element.getAttribute('open'));
          
        //   element.setAttribute('open', 'true')
        //   console.log(element.getAttribute('open'));
          //   setShowModal(!showModal)
        }}
      >
        <Icon path={mdiTrashCanOutline} size={1} />
      </button>
    </div>
  )
}
