import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/create-customer')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/create-customer"!</div>
}
