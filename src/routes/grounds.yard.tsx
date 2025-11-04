import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/grounds/yard')({
  component: Yard,
})

function Yard() {
  return <div>Hello "/grounds/yard"!</div>
}
