import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/grounds/ranch')({
  component: Ranch,
})

function Ranch() {
  return <div>Hello "/grounds/ranch"!</div>
}
