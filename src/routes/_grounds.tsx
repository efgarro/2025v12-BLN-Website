import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarGrounds from "~/components/MenuBarGrounds";

export const Route = createFileRoute("/_grounds")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="core_wrapper">
      <MenuBarGrounds />
      <Outlet />
    </div>
  );
}
