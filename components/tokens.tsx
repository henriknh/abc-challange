import { mdiCrownCircleOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { getServerSession } from 'next-auth'

export async function Tokens() {
  const session = await getServerSession()
  return session?.user ? (
    <button className="btn btn-ghost">
      <Icon path={mdiCrownCircleOutline} size={1} />
      <div>10</div>
    </button>
  ) : (
    <></>
  )
}
