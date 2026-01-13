import { createFileRoute, Outlet } from '@tanstack/react-router'
import MenuBarHabitat from '~/components/MenuBarHabitat';

export const Route = createFileRoute('/_habitat')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="core_wrapper">
      <MenuBarHabitat />
      <Outlet />
    </div>
  );
}
