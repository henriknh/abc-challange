'use client'

import AuthGuard from '../../components/auth-guard'
import LetsCook from '../../components/lets-cook'
import Recipe from '../../components/recipe/recipe'
import Section from '../../components/section'
import { onCook } from '../api/cook'
import { useFormState } from 'react-dom'

const recipe = {
  title: 'Slow Cooked Shredded Beef Ragu Pasta',
  total_cooking_time: 170,
  portions: 6,
  description:
    'A budget cut of beef, simple pantry ingredients, a bit of patience and pappardelle pasta come together to create the king of all pastas, Slow Cooked Shredded Beef Ragu Pasta.',
  ingredients: [
    {
      name: 'Chuck beef or other slow cooking beef cut',
      unit: {
        metric_unit: {
          value: 1.2,
          unit: 'kg',
        },
        imperial_unit: {
          value: 2.5,
          unit: 'lb',
        },
      },
    },
    {
      name: 'Salt',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'tbsp',
        },
        imperial_unit: {
          value: 1,
          unit: 'tbsp',
        },
      },
    },
    {
      name: 'Black pepper',
    },
    {
      name: 'Olive oil',
      unit: {
        metric_unit: {
          value: 3,
          unit: 'tbsp',
        },
        imperial_unit: {
          value: 3,
          unit: 'tbsp',
        },
      },
    },
    {
      name: 'Garlic, minced',
      unit: {
        metric_unit: {
          value: 3,
          unit: 'cloves',
        },
        imperial_unit: {
          value: 3,
          unit: 'cloves',
        },
      },
    },
    {
      name: 'Onion, diced',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'cup',
        },
        imperial_unit: {
          value: 1,
          unit: 'cup',
        },
      },
    },
    {
      name: 'Carrots, diced',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'cup',
        },
        imperial_unit: {
          value: 1,
          unit: 'cup',
        },
      },
    },
    {
      name: 'Celery, diced',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'cup',
        },
        imperial_unit: {
          value: 1,
          unit: 'cup',
        },
      },
    },
    {
      name: 'Crushed canned tomatoes',
      unit: {
        metric_unit: {
          value: 800,
          unit: 'g',
        },
        imperial_unit: {
          value: 28,
          unit: 'oz',
        },
      },
    },
    {
      name: 'Tomato paste',
      unit: {
        metric_unit: {
          value: 3,
          unit: 'tbsp',
        },
        imperial_unit: {
          value: 3,
          unit: 'tbsp',
        },
      },
    },
    {
      name: 'Beef bouillon cubes, crumbled',
      unit: {
        metric_unit: {
          value: 2,
          unit: 'cubes',
        },
        imperial_unit: {
          value: 2,
          unit: 'cubes',
        },
      },
    },
    {
      name: 'Red wine, full bodied (like merlot, cabernet sauvignon), or sub with beef broth/stock',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'cup',
        },
        imperial_unit: {
          value: 250,
          unit: 'ml',
        },
      },
    },
    {
      name: 'Water',
      unit: {
        metric_unit: {
          value: 1.5,
          unit: 'cups',
        },
        imperial_unit: {
          value: 375,
          unit: 'ml',
        },
      },
    },
    {
      name: 'Dried thyme or fresh thyme',
      unit: {
        metric_unit: {
          value: 3,
          unit: 'sprigs',
        },
      },
    },
    {
      name: 'Dried bay leaves',
      unit: {
        metric_unit: {
          value: 3,
          unit: 'leaves',
        },
      },
    },
    {
      name: 'Pappardelle pasta or pasta of choice',
      unit: {
        metric_unit: {
          value: 500,
          unit: 'g',
        },
        imperial_unit: {
          value: 1,
          unit: 'lb',
        },
      },
    },
    {
      name: 'Freshly grated parmesan cheese or parmigiano reggiano',
    },
    {
      name: 'Fresh parsley, finely chopped',
      unit: {
        metric_unit: {
          value: 1,
          unit: 'handful',
        },
      },
    },
  ],
  steps: [
    {
      decription:
        'Pat beef dry and sprinkle with salt and pepper, then sear each piece aggressively on all sides until very browned.',
      time: 15,
    },
    {
      decription:
        'Saute garlic, onion, carrots, and celery for a few minutes, then add remaining Ragu ingredients and simmer gently.',
      time: 10,
    },
    {
      decription:
        'Cover and let it cook for 2 hours or until beef is tender enough to shred.',
      time: 120,
    },
    {
      decription:
        'Remove beef, shred it, return to pot, simmer until sauce thickens.',
      time: 30,
    },
    {
      decription:
        'Cook pasta in boiling water, then toss with Ragu sauce and serve with grated cheese and parsley.',
      time: 15,
    },
  ],
}

export default function CreateRecipe() {
  const [recipe, formAction] = useFormState(onCook)

  console.log(recipe)

  return (
    <AuthGuard>
      <div className="prose max-w-none pb-10">
        <Section>
          <h1>Create new recipe</h1>

          <div className="flex flex-col gap-10">
            <LetsCook onAction={formAction} />

            {recipe ? (
              <div className="flex flex-col gap-10">
                <div className="rounded-xl border p-10">
                  <Recipe recipe={recipe} />
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary" disabled={!recipe}>
                    Add to my collection
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                <h2>Welcome to the recipe generator!</h2>
                <p>To get started simply do it! TODO :)</p>
              </div>
            )}
          </div>
        </Section>
      </div>
    </AuthGuard>
  )
}
