import { createFileRoute, Outlet } from "@tanstack/react-router";
import MenuBarViewRooms from "~/components/MenuBarRooms";

export const Route = createFileRoute("/_rooms")({
  head: () => ({
    meta: [
      {
        title: "Rooms with a View",
      },
      {
        name: "description",
        content:
          "It includes a description and a photo gallery of the two rooms available for lodging",
      },
    ],
  }),
  component: PathlessLayoutRooms,
});

function PathlessLayoutRooms() {
  return (
    <div className="core_wrapper">
      <MenuBarViewRooms />
      <Outlet />
    </div>
  );
}
