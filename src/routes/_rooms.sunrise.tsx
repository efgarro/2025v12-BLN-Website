import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_rooms/sunrise')({
  component: SunriseRoom,
})

function SunriseRoom() {
  return <div>Hello "/rooms/sunrise"!</div>
}
