import { createFileRoute, Outlet } from '@tanstack/react-router'
import MenuBarEatDo from '~/components/MenuBarEatDo';

export const Route = createFileRoute('/_eatdo')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="core_wrapper">
      <MenuBarEatDo/>
      <Outlet />
    </div>
  );
}
