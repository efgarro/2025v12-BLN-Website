import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarHabitat from "~/components/MenuBarHabitat";

export const Route = createFileRoute("/_habitat")({
  head: () => ({
    meta: [
      {
        title: "Scarlet Macaw Habitat Project",
      },
      {
        name: "description",
        content:
          "It includes a description of the Scarlet Macaw Habitat Project sponsored by BijaLapa Natural",
      },
    ],
  }),
  component: PathlessLayoutHabitat,
});

function PathlessLayoutHabitat() {
  return (
    <div className="core_wrapper">
      <MenuBarHabitat />
      <Outlet />
    </div>
  );
}
