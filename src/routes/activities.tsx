import { createFileRoute, Outlet } from '@tanstack/react-router'
import MenuBarActivities from '~/components/MenuBarActivities';

export const Route = createFileRoute('/activities')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <div className="core_wrapper">
        <MenuBarActivities />
        <Outlet />
      </div>
    );
}
