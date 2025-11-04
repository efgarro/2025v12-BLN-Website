import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarGrounds from "~/components/MenuBarGrounds";

export const Route = createFileRoute("/grounds")({
  component: Grounds,
});

function Grounds() {
  return (
    <div className="core_wrapper">
      <MenuBarGrounds />
      <Outlet/>
    </div>
  );
}
