import { mdiChefHat } from '@mdi/js'
import Icon from '@mdi/react'

export default async function TextTutorial() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="card card-bordered card-compact flex-1 bg-base-100">
        <div className="card-body">
          <div className="text-xl">1.</div>
          <div>Copy web address of a recipe</div>
        </div>
      </div>
      <div className="card card-bordered card-compact flex-1 bg-base-100">
        <div className="card-body">
          <div className="text-xl">2.</div>
          <div>
            <div className="inline-flex flex-wrap items-center gap-2">
              <div className="text-nowrap">Paste and press</div>
              <button className="btn btn-outline btn-sm relative">
                <Icon path={mdiChefHat} size={0.8} /> Let&apos;s cook
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-bordered card-compact flex-1 bg-base-100">
        <div className="card-body">
          <div className="text-xl">3.</div>
          <div>Actually let&apos;s get cooking!</div>
        </div>
      </div>
    </div>
  )
}
