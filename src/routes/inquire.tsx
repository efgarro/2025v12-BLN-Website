import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inquire')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inquire"!</div>
}
