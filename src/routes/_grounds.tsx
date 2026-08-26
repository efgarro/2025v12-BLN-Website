import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarGrounds from "~/components/MenuBarGrounds";

export const Route = createFileRoute("/_grounds")({
  head: () => ({
    meta: [
      {
        title: "The Grounds at BijaLapa Natural",
      },
      {
        name: "description",
        content:
          "It includes information on the yard, the ranch area and the sustainable organic practices adopted from day one",
      },
    ],
  }),
  component: PathlessLayoutGrounds,
});

function PathlessLayoutGrounds() {
  return (
    <div className="core_wrapper">
      <MenuBarGrounds />
      <Outlet />
    </div>
  );
}
