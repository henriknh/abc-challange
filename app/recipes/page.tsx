import AuthGuard from '../../components/auth-guard'

export default function Recipes() {
  return (
    <AuthGuard>
      <div className="container prose flex max-w-none flex-col gap-10 py-10">
        <div className="flex justify-between">
          <h1>Welcome chef!</h1>
        </div>

        <div>recipes</div>
      </div>
    </AuthGuard>
  )
}
